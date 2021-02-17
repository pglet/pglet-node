const os = require('os');
const path = require('path');
const cp = require('child_process');
const net = require('net');
const fs = require("fs");
const request = require('request');
const compareVersions = require('compare-versions');
const { error } = require('console');

const PGLET_VERSION = "0.2.2";

var pgletExe = null;
var _installPromise = null;

async function _install() {
    // prevent concurrent calls firing install more than once
    if (!_installPromise) {
        _installPromise = _doInstall();
      }
      return _installPromise;
}

async function _doInstall() {
    pgletExe = os.type() === "Windows_NT" ? "pglet.exe" : "pglet";

    // check if pglet exists in PATH (for development)
    let pgletInPath = null;
    process.env.PATH.split(path.delimiter).forEach(p => {
        let fp = path.join(p, pgletExe);
        if (fs.existsSync(fp)) {
            pgletInPath = fp;
        }
    });

    if (pgletInPath != null) {
        pgletExe = pgletInPath;
        //console.log("pglet found in PATH:", pgletExe);
        return;
    }

    var pgletDir = path.join(os.homedir(), ".pglet");
    var pgletBin = path.join(pgletDir, "bin");
    pgletExe = path.join(pgletBin, pgletExe);

    if (!fs.existsSync(pgletBin)) {
        await fs.promises.mkdir(pgletBin, { recursive: true });
    }

    var ver = PGLET_VERSION;
    var installedVer = null;

    if (fs.existsSync(pgletExe)) {
        var res = cp.spawnSync(pgletExe, ["--version"], { encoding : 'utf8' });
        installedVer = res.stdout.trim();
    }

    if (!installedVer || compareVersions(installedVer, ver) < 0) {
        //console.log(`Installing Pglet v${ver}...`)

        var platform = null;
        var arch = "amd64";
        var ext = ""

        const p = os.type();
        if (p == "Windows_NT") {
            platform = "windows";
            ext = ".exe"
        } else if (p == "Linux") {
            platform = "linux";
        } else if (p == "Darwin") {
            platform = "darwin";
        } else {
            throw `Unsupported platform: {p}`
        }

        // download file
        const pgletUrl = `https://github.com/pglet/pglet/releases/download/v${ver}/pglet-${ver}-${platform}-${arch}${ext}`;
        await download(pgletUrl, pgletExe);

        if (platform != "Windows_NT") {
            fs.chmodSync(pgletExe, 0755);
        }
    }
}

async function download(url, filePath) {
    await new Promise((resolve, reject) => {
        let file = fs.createWriteStream(filePath);
        file.on('close', () => {
            resolve();
        });

        let stream = request({ uri: url })
        .pipe(file)
        .on('error', (error) => {
            reject(error);
        })
    })
    .catch(error => {
        console.log(`Error downloading ${url}: ${error}`);
    });
}

class Event {
    constructor(target, name, data) {
        this._target = target;
        this._name = name;
        this._data = data;
    }

    get target() {
        return this._target;
    }

    get name() {
        return this._name;
    }

    get data() {
        return this._data;
    }
}

class Connection {

    constructor(connId) {
        this.connId = connId;

        //console.log(`New connection: ${connId}`);

        if (os.type() === "Windows_NT") {
            // open connections for command and event pipes
            this._commandResolve = null;
            this._commandReject = null;
            this._commandClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}` : `${os.tmpdir()}/CoreFxPipe_${connId}`, () => {
                //console.log("Connected to command pipe.");
                this._commandClient.setNoDelay(true);
            });

            this._commandClient.on('data', (data) => {
                // parse result
                const result = this.parseResult(data);

                let fn = this._commandResolve;
                let value = result.value;
                if (result.error) {
                    let fn = this._commandReject;
                    let value = result.error;
                }

                this._commandResolve = null;
                this._commandReject = null;

                if (fn) {
                    fn(value);
                }
            });

            this._eventResolve = null;
            this._eventClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}.events` : `${os.tmpdir()}/CoreFxPipe_${connId}.events`, () => {
                //console.log("Connected to event pipe.");
            });

            this._eventClient.on('data', (data) => {
                const result = this.parseEvent(data);

                var fn = this._eventResolve;
                this._eventResolve = null;

                if (fn) {
                    fn(result);
                }
            });
        }
    }

    get id() {
        return this.connId;
    }

    // send command to a pipe and receive results
    send(command) {
        let waitResult = !command.match(/\w+/g)[0].endsWith('f');

        if (os.type() === "Windows_NT") {
            // Windows
            return this._sendWindows(command, waitResult);
        } else {
            // Linux/macOS - use FIFO
            return this._sendLinux(command, waitResult);
        }
    }

    _sendWindows(command, waitResult) {
        if (waitResult) {

            // command with result
            return new Promise((resolve, reject) => {
                this._commandResolve = resolve;
                this._commandReject = reject;

                // send command
                this._commandClient.write(command + '\n');                
            });

        } else {

            // fire-and-forget command
            return new Promise((resolve, reject) => {
                this._commandClient.write(command + '\n', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    }

    _sendLinux(command, waitResult) {
        return new Promise((resolve, reject) => {
                
            fs.writeFile(this.connId, command + '\n', (err) => {
                if (err) {
                    reject(err);
                } else {
                    if (waitResult) {
                        fs.readFile(this.connId, (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                // parse result
                                const result = this.parseResult(data);
                
                                if (result.error) {
                                    reject(result.error);
                                } else {
                                    resolve(result.value);
                                }
                            }
                        })
                    } else {
                        resolve();
                    }
                }
            });
            
        });
    }    

    // wait event pipe for new event
    waitEvent() {
        // register for result
        return new Promise((resolve, reject) => {
            if (os.type() === "Windows_NT") {
                this._eventResolve = resolve;
            } else {
                fs.open(`${this.connId}.events`, 'r+', (err, fd) => {
                    if (err) {
                        reject(err);
                    } else {
                        var stream = fs.createReadStream(null, {
                            fd
                        });
                        stream.on('data', (data) => {
                            stream.close()
                            resolve(this.parseEvent(data));
                        });                     
                    }
                });                
            }
        });
    }

    parseResult(data) {
        const result = data.toString().trim();
            
        var flag = result;
        var value = null;
        const idx = result.indexOf(" ");
        if (idx != -1) {
            flag = result.substring(0, idx);
            value = result.substring(idx + 1);
        }

        return {
            value: (flag !== "error") ? value : null,
            error: (flag === "error") ? value : null
        }      
    }

    parseEvent(data) {
        const result = data.toString().trim();

        let re = /(?<target>[^\s]+)\s(?<name>[^\s]+)(\s(?<data>.+))*/;
        let match = re.exec(result);

        return new Event(match.groups.target, match.groups.name, match.groups.data);
    }
}

module.exports.page = async (...args) => {
    await _install();
    const pargs = buildArgs("page", args);

    //console.log(pargs);
    //console.log(pgletExe);

    var res = cp.spawnSync(pgletExe, pargs, { encoding : 'utf8' });
    var result = res.stdout.trim();

    let re = /(?<connId>[^\s]+)\s(?<pageUrl>[^\s]+)/;
    let match = re.exec(result);

    var conn = new Connection(match.groups.connId);
    conn.pageUrl = match.groups.pageUrl;

    return conn;
}

module.exports.app = async (...args) => {
    await _install();
    // last argument must be a function
    var fn = null;
    if (args.length > 0 && typeof args[args.length - 1] === 'function') {
        fn = args[args.length - 1];
    } else {
        throw "The last argument must be a function.";
    }

    const pargs = buildArgs("app", args);

    //console.log(pargs);

    var pageUrl = null;

    var child = cp.spawn(pgletExe, pargs);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', line => {

        data = line.trim();
        
        if (!pageUrl) {
            pageUrl = data;
        } else {
            var conn = new Connection(data);
            conn.pageUrl = pageUrl;
            fn(conn);
        }
    });  
    child.on('close', exitCode => {
        //console.log('Exit code:', exitCode);
    });
}

function buildArgs(action, args) {

    var pageName = null;
    var opts = null;

    var idx = 0;
    while (idx < args.length) {
        if (typeof args[idx] === 'string') {
            pageName = args[idx];
        } else if (typeof args[idx] === 'object') {
            opts = args[idx];
        }
        idx++;
    }

    if (opts && opts.name) {
        pageName = opts.name;
    }

    var pargs = [];
    pargs.push(action);

    if (pageName) {
        pargs.push(pageName);
    }

    if (opts && opts.web) {
        pargs.push("--web");
    }
    
    if (opts && opts.noWindow) {
        pargs.push("--no-window");
    }

    if (opts && opts.server) {
        pargs.push("--server");
        pargs.push(opts.server);
    }

    if (opts && opts.token) {
        pargs.push("--token");
        pargs.push(opts.token);
    }

    // if (os.type() !== "Windows_NT") {
    //     // enforce Unix Domain Sockets for non-Windows platforms
    //     pargs.push("--uds");
    // }

    return pargs;
}