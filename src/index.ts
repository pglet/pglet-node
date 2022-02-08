import fs from 'fs';
import path from 'path';
import os from 'os';
import cp from 'child_process';
import compareVersions from 'compare-versions';
import request from 'request';
import { StringDecoder } from 'string_decoder';
const decoder = new StringDecoder('utf8');
import Page from './Page';
import Text from './Text';
import Textbox from './Textbox';
import Stack from './Stack';
import Button from './Button';
import Dropdown from './Dropdown';
import Progress from './Progress';
import Spinner from './Spinner';
import Checkbox from './Checkbox';
import Slider from './Slider';
import SpinButton from './SpinButton';
import Toggle from './Toggle';
import Dialog from './Dialog';
import Panel from './Panel';
import Point from './Point';
import Searchbox from './Searchbox';
import VerticalBarchart from './VerticalBarchart';
import DatePicker from './DatePicker';
import Barchart from './Barchart';
import Piechart from './Piechart';
import Callout from './Callout';
import Icon from './Icon';
import { Event } from './Event';
import { Linechart, LineData } from './Linechart';
import { Option, ChoiceGroup } from './ChoiceGroup'
import { Message, MessageButton } from './Message';
import { Toolbar, ToolbarItem} from './Toolbar';
import { Nav, NavItem } from './Nav';
import { Column, Columns, Items, Grid } from './Grid';
import { Tabs, Tab } from './Tabs';
import { Control}  from './Control';
import { Connection } from './Connection';


const PGLET_VERSION: string = "0.5.6";

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
    pargs.push("--all-events");
    pargs.push("--local");
    
    //console.log("pgletExe", pgletExe)

    var res = cp.spawnSync(pgletExe, pargs, { encoding : 'utf8' });
    console.log("result: ", res);
    var result = res.stdout.trim();
    let re = /(?<connId>[^\s]+)\s(?<pageUrl>[^\s]+)/;
    let match = re.exec(result);

    var conn = new Connection(match.groups.connId);

    return new Page({connection: conn, url: match.groups.pageUrl})
}

let app = async (...args: any) => {
    
    await _install();
    //console.log("pgletExe", pgletExe)
    var fn = null;
    if (args.length > 0 && typeof args[args.length - 1] === 'function') {
        fn = args[args.length - 1];
    } else {
        throw "The last argument must be a function.";
    }

    const pargs = buildArgs("app", args);
    pargs.push("--all-events");

    var child = cp.spawn(pgletExe, pargs);

    let url: string;
    let page: Page;
    child.stdout.on('data', (data) => {

        //console.log("spawn result: ", decoder.write(Buffer.from(data)));
        if (!url) {
            url = decoder.write(Buffer.from(data)).trim();
            return;
        }
        else {
            page = new Page({connection: new Connection(decoder.write(Buffer.from(data)).trim()), url: url});
            fn(page);
        }
    })



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

    if (opts && opts.local) {
        pargs.push("--local");
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

    if (opts && opts.permissions) {
        pargs.push("--permissions");
        pargs.push(opts.permissions);
    }    

    // if (opts && opts.allEvents) {
    //     pargs.push("--all-events");
    //     pargs.push(opts.token);
    // }

    // if (os.type() !== "Windows_NT") {
    //     // enforce Unix Domain Sockets for non-Windows platforms
    //     pargs.push("--uds");
    // }

    return pargs;
}
export {
    app, page, Page, Text, Textbox, Stack, Button, Dropdown, Progress, Spinner, Checkbox, Control, Tabs, Tab, Column, Columns, NavItem, Items, Grid, Nav, Slider, SpinButton, Toggle, Toolbar, ToolbarItem, Message, MessageButton, Option, ChoiceGroup, Dialog, Panel, Barchart, Point, VerticalBarchart, DatePicker, LineData, Linechart, Piechart, Callout, Searchbox, Icon, Event
}
