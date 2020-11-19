const os = require('os');
const path = require('path');
const cp = require('child_process');
const net = require('net');

var pgletExe = null;

function install() {
    console.log("Installing Pglet");

    var pgletDir = path.join(os.homedir(), ".pglet");
    var pgletBin = path.join(pgletDir, "bin");
    pgletExe = path.join(pgletBin, os.type() === "Windows_NT" ? "pglet.exe" : "pglet");
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
        this._commandClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}` : `${os.tmpdir()}/${connId}`, () => {
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

        this._eventPromise = null;
        this._eventClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}.events` : `${os.tmpdir()}/${connId}.events`, () => {
            console.log("Connected to event pipe.");
        });
    }

    get id() {
        return this.connId;
    }

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

    waitEvents() {
        // todo
        return new Event('button1', 'click', null);
    }
}

module.exports.page = (...args) => {

    const pargs = buildArgs("page", args);

    console.log(pargs);
    //console.log(pgletExe);

    var res = cp.spawnSync(pgletExe, pargs, { encoding : 'utf8' });
    console.log('stdout:' + res.stdout);

    return new Connection("conn1");
}

module.exports.app = (...args) => {

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
            fn(new Connection(data));
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

    if (opts && opts.public) {
        pargs.push("--public");
    }

    if (opts && opts.private) {
        pargs.push("--private");
    }

    if (opts && opts.server) {
        pargs.push("--server");
    }

    if (opts && opts.server) {
        pargs.push("--server");
    }

    if (os.type() !== "Windows_NT") {
        // enforce Unix Domain Sockets for non-Windows platforms
        pargs.push("--uds");
    }

    return pargs;
}

// run on init
install();