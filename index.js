var cp = require('child_process');

function install() {
    console.log("Installing Pglet");
}

class Connection {
    constructor(connId) {
        this.connId = connId;
    }

    get id() {
        return this.connId;
    }
}

module.exports.page = (...args) => {

    const pargs = buildArgs("page", args);

    console.log(pargs);

    // var ls = cp.spawnSync('cmd', ['/C', 'dir'], { encoding : 'utf8' });
    // console.log('ls: ' , ls);
    // console.log('stdout here: \n' + ls.stdout);

    return new Connection("conn1");
}

module.exports.app = (...args) => {

    //console.log(typeof callback);

    // last argument must be a function
    var fn = null;
    if (args.length > 0 && typeof args[args.length - 1] === 'function') {
        fn = args[args.length - 1];
    } else {
        throw "The last argument must be a function.";
    }

    const pargs = buildArgs("app", args);

    console.log(pargs);

    fn(new Connection("conn2"));
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

    return pargs;
}

// run on init
install();