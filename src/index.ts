import fs from 'fs';
import path from 'path';
import os from 'os';
import cp from 'child_process';
import compareVersions from 'compare-versions';
import request from 'request';
import { StringDecoder } from 'string_decoder';
const decoder = new StringDecoder('utf8');
import Page from './Page';
import Text from './controls/Text';
import Textbox from './controls/Textbox';
import Stack from './controls/Stack';
import Button from './controls/Button';
import Dropdown from './controls/Dropdown';
import Progress from './controls/Progress';
import Spinner from './controls/Spinner';
import Checkbox from './controls/Checkbox';
import Slider from './controls/Slider';
import SpinButton from './controls/SpinButton';
import Toggle from './controls/Toggle';
import Dialog from './controls/Dialog';
import Panel from './controls/Panel';
import Point from './controls/Point';
import Searchbox from './controls/Searchbox';
import VerticalBarchart from './controls/VerticalBarchart';
import DatePicker from './controls/DatePicker';
import Barchart from './controls/Barchart';
import Piechart from './controls/Piechart';
import Callout from './controls/Callout';
import Icon from './controls/Icon';
import { Event as PgletEvent } from './Event';
import { Linechart, LineData } from './controls/Linechart';
import { Option, ChoiceGroup } from './controls/ChoiceGroup'
import { Message, MessageButton } from './controls/Message';
import { Toolbar, ToolbarItem} from './controls/Toolbar';
import { Nav, NavItem } from './controls/Nav';
import { Column, Columns, Items, Grid } from './controls/Grid';
import { Tabs, Tab } from './controls/Tabs';
import { Control}  from './Control';
import { Connection } from './Connection';
import NodeWebSocket from 'ws';
import ReconnectingWebsocket, { Event, Options } from 'reconnecting-websocket';

const PGLET_VERSION: string = "0.5.6";
const HOSTED_SERVICE_URL = "https://app.pglet.io";
const DEFAULT_SERVER_PORT = "8550";
const isDeno = typeof window !== 'undefined' && ("Deno" in window);

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

    const pargs = buildArgs("server", args);
    //pargs.push("--all-events");
    pargs.push("--background");
    
    //console.log("pgletExe", pgletExe)

    var res = cp.spawnSync(pgletExe, pargs, { encoding : 'utf8' });
    let serverUrl
    if (!pargs.url) {
        if (!pargs.local) {
            serverUrl = HOSTED_SERVICE_URL;
        }
        else {
            serverUrl = `http://localhost:${process.env.DEFAULT_SERVER_PORT ?? DEFAULT_SERVER_PORT}`
        }
    }

    const options: Options = {
        WebSocket: isDeno ? WebSocket : NodeWebSocket,
        connectionTimeout: 200,
        maxRetries: 10
    };
    
    const rws = new ReconnectingWebsocket("ws://localhost:8550/ws", [], options);
    
    rws.onopen = (evt: Event) => {
        console.log(`Connected to ${rws.url}`);
    }
    
    rws.onclose = (evt: Event) => {
        console.log("Disconnected");
    }
    
    rws.onmessage = (evt: MessageEvent) => {
        console.log(evt.data);
    }
    
    var conn = new Connection(rws);

    return new Page({connection: conn, url: "conn.pageUrl"})
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
            page = new Page({connection: new Connection(Rws), url: url});
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
    app, page, Page, Text, Textbox, Stack, Button, Dropdown, Progress, Spinner, Checkbox, Control, Tabs, Tab, Column, Columns, NavItem, Items, Grid, Nav, Slider, SpinButton, Toggle, Toolbar, ToolbarItem, Message, MessageButton, Option, ChoiceGroup, Dialog, Panel, Barchart, Point, VerticalBarchart, DatePicker, LineData, Linechart, Piechart, Callout, Searchbox, Icon, PgletEvent
}
