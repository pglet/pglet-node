import { ControlProperties, Control } from './Control'
import { Alignment } from './Alignment';
import { Connection } from './Connection';


interface PageProperties extends ControlProperties {
    connection?: Connection,
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
    private _url: string;

    constructor(pageProps: PageProperties) {
        super(pageProps);
        // pageProps.id = "page";
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
    }

    getControlName() {
        return "page";
    }

    getControl(id: string): Control {
        return this._index.get(id);
    }

    update(controls: Control[]) {
        if (controls.length == 0) {
            return this._update([this]);
        }
        else {
            return this._update(controls);
        }
    }

    private async _update(controls: Control[]) {
        let addedControls: Control[]  = [];
        let commandList: string[] = [];

        controls.forEach(ctrl => {
            ctrl.populateUpdateCommands(this._index, addedControls, commandList);
        });

        if (commandList.length == 0) {
            return;
        }

        let ids = await this._conn.sendBatch(commandList);

        if (ids != "") {
            let n = 0;
            ids.split(/\r?\n/).forEach(line => {
                line.split(" ").forEach(id => {
                    addedControls[n].uid = id;
                    addedControls[n].page = this;
                    this._index.set(id, addedControls[n]);
                    n += 1
                })
            })
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