import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
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
import { ReconnectingWebSocket } from './protocol/ReconnectingWebSocket'
import { Log } from './Utils';
import { connect } from 'http2';

const PGLET_VERSION: string = "0.7.0";
const HOSTED_SERVICE_URL = "https://app.pglet.io";
const DEFAULT_SERVER_PORT = "8550";
const ZERO_SESSION = "0";
const isDeno = typeof window !== 'undefined' && ("Deno" in window);

var pgletExe: string = null;
var _installPromise: Promise<void> = null;

async function _install(): Promise<void> {
    // prevent concurrent calls firing install more than once
    if (!_installPromise) {
        _installPromise = _doInstall();
      }
      return _installPromise;
}

async function _doInstall(): Promise<void> {
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

type clientOpts = {
    pageName?: string,
    web?: boolean,
    serverUrl?: string,
    noWindow?: boolean,
    sessionHandler?: (page: Page) => Promise<void>,
    isApp?: boolean
}

async function connectPage(name?: string, opts?: clientOpts): Promise<Page> {
    let userOpts = {
        pageName: "*",
        web: false,
        serverUrl: `http://localhost:${process.env.DEFAULT_SERVER_PORT ?? DEFAULT_SERVER_PORT}/`,
        isApp: false,        
        ...opts
    }
    if (name) { userOpts.pageName = name };
    let conn = await connectInternal(userOpts);
    return new Page({pageName: conn.pageName, connection: conn, url: conn.pageUrl, sessionID: ZERO_SESSION})
}
async function serveApp(sessionHandler: (page: Page) => Promise<void>, opts?: clientOpts): Promise<void> {
    let userOpts = {
        sessionHandler: null,
        pageName: "*",
        web: false,
        serverUrl: `http://localhost:${process.env.DEFAULT_SERVER_PORT ?? DEFAULT_SERVER_PORT}`,
        isApp: true,
        ...opts
    }
    if (sessionHandler && typeof sessionHandler === 'function') {
        userOpts.sessionHandler = sessionHandler;
    } else {
        throw "The last argument must be a function.";
    }

    await connectInternal(userOpts);
}

let connectInternal = async (args: clientOpts): Promise<Connection> => {
    
    await _install();

    var fn = args.sessionHandler;

    if (!args.web) {
        cp.spawnSync(pgletExe, ["server", "--background"], { encoding : 'utf8' });
    }
    else {
        args.serverUrl = HOSTED_SERVICE_URL;
    }
    
    const rws = new ReconnectingWebSocket(getWebSocketUrl(args.serverUrl)); 
    var conn = new Connection(rws);
    
    conn.onEvent = (payload) => {
        //console.log("payload from conn.onEvent: ", payload);
        if (payload.sessionID in conn.sessions) {
            let page = conn.sessions[payload.sessionID];
            //console.log(Log.underscore, "page: ", page);
            let e = new PgletEvent(payload.eventTarget, payload.eventName, payload.eventData);
            page._onEvent(e);
        }
    }
    
    if (args.isApp) {
        conn.onSessionCreated = async (payload) => {
            console.log("session created: ", payload);
            // instantiate page
            let page = new Page({ pageName: conn.pageName, url: conn.pageUrl, connection: conn, sessionID: payload.sessionID });
            //conn.addSession(payload.sessionID, page);
            conn.sessions[payload.sessionID] =  page;
            console.log(Log.underscore, "conn.sessions: ", conn.sessions);
            await fn(page);
        }
    }

    let registerHostClientPayload = {
        HostClientID: null,
        PageName: args.pageName,
        IsApp: args.isApp,
        AuthToken: null,
        Permissions: null
    }
    let resp = await conn.send('registerHostClient', registerHostClientPayload);
    let respPayload = JSON.parse(resp).payload;
    conn.pageName = respPayload.pageName;
    conn.pageUrl = args.serverUrl + '/' + respPayload.pageName;

    console.log(Log.underscore, "resp: ", respPayload);
    if (!args.noWindow) { 
        openBrowser(conn.pageUrl); 
    }
    return conn;
}

// let appInternal = async (args: clientOpts) => {
    
//     await _install();

//     var fn = null;
//     if (args.sessionHandler && typeof args.sessionHandler === 'function') {
//         fn = args.sessionHandler;
//     } else {
//         throw "The last argument must be a function.";
//     }

//     var child = cp.spawn(pgletExe, ["server", "--background"]);

//     let url: string;
//     let page: Page;
//     const rws = new ReconnectingWebSocket(getWebSocketUrl(args.serverUrl));
//     var conn = new Connection(rws);

//     let registerHostClientPayload = {
//         HostClientID: null,
//         PageName: args.pageName,
//         IsApp: true,
//         AuthToken: null,
//         Permissions: null
//     }

//     let resp = await conn.send('registerHostClient', registerHostClientPayload);
//     let respPayload = JSON.parse(resp).payload;

//     child.stdout.on('data', (data) => {
//         if (!url) {
//             url = decoder.write(Buffer.from(data)).trim();
//             return;
//         }
//         else {
//             page = new Page({connection: new Connection(rws), url: url});
//             fn(page);
//         }
//     })

// }

function getWebSocketUrl(url: string) {
    let returnUrl = new URL(url);
    returnUrl.protocol = returnUrl.protocol === "https:" ? "wss" : "ws";
    returnUrl.pathname = "ws";
    return returnUrl.href;
}

function openBrowser(url: string) {
    let osType = os.type();
    if (osType === "Windows_NT") {
        cp.exec(`start ${url}`);
    }
    else if (osType == "Darwin") {
        cp.exec(`open ${url}`);
    }
    else {
        cp.exec(`xdg-open ${url}`)
    }
}

export {
    serveApp, connectPage, Page, Text, Textbox, Stack, Button, Dropdown, Progress, Spinner, Checkbox, Control, Tabs, Tab, Column, Columns, NavItem, Items, Grid, Nav, Slider, SpinButton, Toggle, Toolbar, ToolbarItem, Message, MessageButton, Option, ChoiceGroup, Dialog, Panel, Barchart, Point, VerticalBarchart, DatePicker, LineData, Linechart, Piechart, Callout, Searchbox, Icon, PgletEvent
}
