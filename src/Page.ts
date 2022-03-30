import { ControlProperties, Control } from './Control'
import { Alignment } from './controls/Alignment';
import { Connection } from './Connection';
import { Event as PgletEvent} from './Event';
import { ControlEvent } from './ControlEvent';
import { Action } from './protocol/Actions';
import { Command } from './protocol/Command';
import { Log } from './Utils';


interface PageProperties extends ControlProperties {
    connection?: Connection,
    pageName?: string,
    sessionID?: string,
    url?: string,
    title?: string,
    verticalFill?: boolean,
    horizontalAlign?: string,
    verticalAlign?: string,
    width?: string,
    gap?: string
}

class Page extends Control {
    private _controls: Control[] = [];
    private _index: Map<string, Control> = new Map();
    private _conn: Connection;
    private _pageName: string;
    private _sessionID: string;
    private _url: string;

    constructor(pageProps: PageProperties) {
        super(pageProps);
        this.uid = "page";
        if (pageProps.horizontalAlign && !(pageProps.horizontalAlign in Alignment)) {
            throw "horizontalAlign must be of Alignment type"
        }
        if (pageProps.verticalAlign && !(pageProps.verticalAlign in Alignment)) {
            throw "verticalAlign must be of Alignment type"
        }
        if (pageProps.connection) {
            this._conn = pageProps.connection;
        }
        if (pageProps.url) {
            this._url = pageProps.url;
        }
        if (pageProps.pageName) {
            this._pageName = pageProps.pageName;
        }
        if (pageProps.sessionID) {
            this._sessionID = pageProps.sessionID;
        }
        this._conn.onEvent = this._onEvent.bind(this);
        //this.onSessionCreated = this._conn.onSessionCreated.bind(this);
        
    }

    getControlName() {
        return "page";
    }

    getControl(id: string): Control {
        return this._index.get(id);
    }

    waitEvent(): Promise<string | PgletEvent> {
        return this._conn.waitEvent();
    }

    update(controls?: Control[]) {
        if (!controls) {
            return this._update([this]);
        }
        else {
            return this._update(controls);
        }
    }

    private async _update(controls?: Control[]): Promise<string[]> {
        let addedControls: Control[]  = [];
        let commandList: Command[] = [];
        if (!controls) {
            return;
        }
        controls.forEach(ctrl => {
            ctrl.populateUpdateCommands(this._index, addedControls, commandList);
        });
        console.log(Log.bg.blue, "commandList: ", commandList);
        console.log(Log.bg.blue, "addedControls: ", addedControls);
        commandList.forEach(cmd => console.log(Log.bg.blue, "commands: ", cmd.commands));
        
        //console.log("control map: ", ...this._index.entries());
        if (commandList.length == 0) {
            return;
        }
        //let ids = "";
        let ids: string[] = [];
        for (const cmd of commandList) {
            let pageCmdRequestPayload = {
                pageName: this._pageName,
                sessionID: this._sessionID,
                command: cmd
            }
            //console.log("cmd: ", cmd);
            let resp = await this._conn.send('pageCommandFromHost', pageCmdRequestPayload);
            let respPayload = JSON.parse(resp).payload;
            console.log(Log.bg.blue, "resp: ", resp); 
            //console.log("resp: ", resp);
            ids.push(respPayload.result);
            //ids += await this._conn.send('pageCommandFromHost', cmd);
            //ids += " ";
        }
        // commandList.forEach(async cmd => {
        //     // TODO rewrite populateUpdateCommands
        //     let pageCmdRequestPayload = {
        //         pageName: this._pageName,
        //         sessionID: "0",
        //         command: cmd
        //     }
        //     //console.log("cmd: ", cmd);
        //     let resp = await this._conn.send('pageCommandFromHost', pageCmdRequestPayload);
        //     console.log(Log.underscore, "resp: ", resp); 
        //     //console.log("resp: ", resp);
        //     ids.push(JSON.parse(resp).result);
        //     //ids += await this._conn.send('pageCommandFromHost', cmd);
        //     //ids += " ";
        // })
        console.log("ids: ", ids);
        //let ids = await this._conn.sendBatch(commandList);

        // if (ids) {
        //     let n = 0;
        //     ids.split(/\r?\n/).forEach(line => {
                
        //         line.split(" ").forEach(id => {

        //             addedControls[n].uid = id;
        //             addedControls[n].page = this;
        //             this._index.set(id, addedControls[n]);
        //             n += 1
        //         })
        //     })
        // }
        if (ids.length > 0) {
            let n = 0;
            ids.forEach(id => {
                if (id === "") return;
                addedControls[n].uid = id;
                addedControls[n].page = this;
                this._index.set(id, addedControls[n]);
                n += 1;
            })
        }
        return ids;
    }

    add(controls: Control[] | Control) {   
        controls instanceof Array ? this._controls.push(...controls) : this._controls.push(controls);
        return this.update();
    }

    insert(at: number, controls: Control[]) {
        let n = at;
        controls.forEach(ctrl => {
            this._controls.splice(n, 0, ctrl);
            n += 1;
        })
        return this.update();
    }

    remove(controls: Control[]) {
        controls.forEach(ctrl => {
            let index = this._controls.indexOf(ctrl);

            if (index > -1) {
                this._controls.splice(index, 1);
            }
        })
        return this.update();
    }
    
    removeAt(index) {
        this._controls.splice(index, 1);
        return this.update();
    }

    clean() {
        this._previousChildren.length = 0;
        this.getChildren().forEach(ctrl => {
            ctrl.removeControlRecursively(this._index, ctrl);
        })
        let cmd = new Command();
        cmd.name = "clean";
        cmd.values = ["page"];
        let pageCmdRequestPayload = {
            pageName: this._pageName,
            sessionID: this._sessionID,
            command: cmd
        }
        
        return this._conn.send('pageCommandFromHost', pageCmdRequestPayload);
    }

    getValue(ctrl: Control): Promise<string> {
        console.log(Log.bg.blue, "ctrl.uid: ", ctrl.uid);
        let value = (typeof ctrl === "string") ? ctrl : ctrl.uid;
        return this._conn.send('pageCommandFromHost', `get ${value} value`);
    }

    setValue(ctrl: string | Control, value: string, fireAndForget: boolean): Promise<string> {
        let cmd = fireAndForget ? "setf" : "set";

        let ctrlValue = (typeof ctrl === "string") ? ctrl : ctrl.id;
        return this._conn.send('pageCommandFromHost',`${cmd} ${ctrlValue} value="${value}"`);
    }

    // this will be called when onMessage fires with Actions.pageEventToHost
    _onEvent(e: PgletEvent) {
        //console.log(Log.bg.blue, "onEvent PgletEvent: ", e);
        //console.log(this._index);
        if (e.target == "page" && e.name == "change") {
            let allProps = JSON.parse(e.data);
            //console.log("all Props: ", allProps);
            allProps.forEach(props => {
                console.log(Log.bg.blue, "props: ", props)
                let id = props["i"];
                if (this._index.has(id)) {
                    for (const [key, value] of Object.entries(props)) {
                        if (key != "i") {
                            console.log("INNER ALLPROPS LOOP")
                            this._index.get(id).setAttr(key, value, false)
                        }
                    }
                }
            })
        }
        if (this._index.has(e.target)) {
            let handler = this._index.get(e.target).eventHandlers[e.name];
            let ce = new ControlEvent(e.target, e.name, e.data, this._index.get(e.target), this)
            if (handler) {
                handler(ce);
            }
        }
        
    }
    private _onSessionCreated(e: PgletEvent) {
        if (e.target == "page" && e.name == "change") {
            let allProps = JSON.parse(e.data);
            //console.log("all Props: ", allProps);
            allProps.forEach(props => {
                console.log(Log.bg.blue, "props: ", props)
                let id = props["i"];
                if (this._index.has(id)) {
                    for (const [key, value] of Object.entries(props)) {
                        if (key != "i") {
                            console.log("INNER ALLPROPS LOOP")
                            this._index.get(id).setAttr(key, value, false)
                        }
                    }
                }
            })
        }
        if (this._index.has(e.target)) {
            let handler = this._index.get(e.target).eventHandlers[e.name];
            let ce = new ControlEvent(e.target, e.name, e.data, this._index.get(e.target), this)
            if (handler) {
                handler(ce);
            }
        }
        
    }

    getChildren() {
        return this._controls;
    }

    /* accessors */ 
    get title() {
        return this.attrs.get('title')[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get verticalFill() {
        return this.attrs.get('verticalFill')[0];     
    }
    set verticalFill(newVerticalFill: boolean) {
        this.setAttr("verticalFill", newVerticalFill);
    }
    get horizontalAlign() {
        return this.attrs.get('horizontalAlign')[0];     
    }
    set horizontalAlign(newHorizontalAlign: string) {
        this.setAttr("horizontalAlign", newHorizontalAlign);
    }
    get verticalAlign() {
        return this.attrs.get('verticalAlign')[0];     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get width() {
        return this.attrs.get('width')[0];     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get gap() {
        return this.attrs.get('gap')[0];     
    }
    set gap(newGap: string) {
        this.setAttr("gap", newGap);
    }
}

export = Page;