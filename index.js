const os = require('os');
const path = require('path');
const cp = require('child_process');
const net = require('net');
const fs = require("fs");
const request = require('request');
const compareVersions = require('compare-versions');
const { error } = require('console');

const PGLET_VERSION = "0.1.5";

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
    var pgletDir = path.join(os.homedir(), ".pglet");
    var pgletBin = path.join(pgletDir, "bin");
    pgletExe = path.join(pgletBin, os.type() === "Windows_NT" ? "pglet.exe" : "pglet");

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
        console.log(`Installing Pglet v${ver}...`)

        var target = null;
        const platform = os.type();
        if (platform == "Windows_NT") {
            target = "windows-amd64.exe";
        } else if (platform == "Linux") {
            target = "linux-amd64";
        } else if (platform == "Darwin") {
            target = "darwin-amd64";
        } else {
            throw `Unsupported platform: {platform}`
        }

        // download file
        const pgletUrl = `https://github.com/pglet/pglet/releases/download/v${ver}/pglet-${target}`;
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

        console.log(`New connection: ${connId}`);

        // open connections for command and event pipes
        this._commandResolve = null;
        this._commandReject = null;
        this._commandClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}` : `${os.tmpdir()}/CoreFxPipe_${connId}`, () => {
            console.log("Connected to command pipe.");
        });

        this._commandClient.on('data', (data) => {
            const result = data.toString().trim();
            
            var flag = result;
            var value = null;
            const idx = result.indexOf(" ");
            if (idx != -1) {
                flag = result.substring(0, idx);
                value = result.substring(idx + 1);
            }

            var fn = (flag === "error") ? this._commandReject : this._commandResolve;
            this._commandResolve = null;
            this._commandReject = null;

            if (fn) {
                fn(value);
            }
        });

        this._eventResolve = null;
        this._eventClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}.events` : `${os.tmpdir()}/CoreFxPipe_${connId}.events`, () => {
            console.log("Connected to event pipe.");
        });

        this._eventClient.on('data', (data) => {
            const result = data.toString().trim();

            let re = /(?<target>[^\s]+)\s(?<name>[^\s]+)(\s(?<data>.+))*/;
            let match = re.exec(result);

            const value = new Event(match.groups.target, match.groups.name, match.groups.data);

            var fn = this._eventResolve;
            this._eventResolve = null;

            if (fn) {
                fn(value);
            }
        });        
    }

    get id() {
        return this.connId;
    }

    // send command to a pipe and receive results
    send(command) {

        // register for result
        const result = new Promise((resolve, reject) => {
            this._commandResolve = resolve;
            this._commandReject = reject;
        });

        // send command
        this._commandClient.write(command);

        return result;
    }

    // wait event pipe for new event
    waitEvent() {
        // register for result
        return new Promise((resolve, reject) => {
            this._eventResolve = resolve;
        });
    }
}

module.exports.page = async (...args) => {
    await _install();
    const pargs = buildArgs("page", args);

    console.log(pargs);
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

    console.log(pargs);

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
        console.log('Exit code:', exitCode);
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

    if (opts && opts.private) {
        pargs.push("--private");
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

    if (os.type() !== "Windows_NT") {
        // enforce Unix Domain Sockets for non-Windows platforms
        pargs.push("--uds");
    }

    return pargs;
}