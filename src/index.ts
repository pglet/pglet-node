import fs from 'fs';
import path from 'path';
import os from 'os';
import cp from 'child_process';
import compareVersions from 'compare-versions';
import request from 'request';
import Text from './Text';
import Textbox from './Textbox';
import Stack from './Stack';
import Button from './Button';
import Dropdown from './Dropdown';
import Progress from './Progress';
import Checkbox from './Checkbox';
import { Tabs, Tab } from './Tabs';
import { Control}  from './Control';
import { Connection } from './Connection';


const PGLET_VERSION: string = "0.1.12";

var pgletExe: string = null;
var _installPromise: any = null;

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
    var installedVer: string = null;

    if (fs.existsSync(pgletExe)) {
        var res = cp.spawnSync(pgletExe, ["--version"], { encoding : 'utf8' });
        installedVer = res.stdout.trim();
    }

    if (!installedVer || compareVersions(installedVer, ver) < 0) {
        //console.log(`Installing Pglet v${ver}...`)

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
        const pgletUrl = `https://github.com/pglet/pglet/releases/download/v${ver}/pglet-${ver}-${target}`;
        await download(pgletUrl, pgletExe);

        if (platform != "Windows_NT") {
            fs.chmodSync(pgletExe, 0o755);
        }
    }
}

async function download(url: string, filePath: string) {
    await new Promise<void>((resolve, reject) => {
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

let page = async (...args: any) => {
    await _install();
    const pargs = buildArgs("page", args);

    //console.log(pargs);
    //console.log(pgletExe);

    var res = cp.spawnSync(pgletExe, pargs, { encoding : 'utf8' });
    var result = res.stdout.trim();

    let re = /(?<connId>[^\s]+)\s(?<pageUrl>[^\s]+)/;
    let match = re.exec(result);

    var conn = new Connection(match.groups.connId);
    //conn.pageUrl = match.groups.pageUrl;

    return conn;
}

function buildArgs(action: string, args: any) {

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
export {
    page, Text, Textbox, Stack, Button, Dropdown, Progress, Checkbox, Control, Tabs, Tab
}
