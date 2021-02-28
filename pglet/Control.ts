import { Connection } from './Connection';

export interface ControlProperties {
    id?: string,
    visible?: boolean,
    disabled?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    margin?: string
}

export class Control {
    protected _id: string | null;
    protected connection: Connection | null;
    protected attrs: any = {};

    constructor(controlProps: ControlProperties) {
        //this.attrs = controlProps;
        this._id = controlProps.id ? controlProps.id : undefined;
        this.attrs = new Map();
        Object.keys(controlProps).forEach(key => {
            if (key != "id") {
                this.attrs[key] = [controlProps[key], true];
            }       
        })
    }

    getControlName() {
        throw new Error("must be overridden in child class");
    }
    
    /* accessors */ 
    get id() {
        return this._id;     
    }
    set id(newId: string) {
        this._id = newId;
    }
    get visible() {
        return this.attrs.visible;     
    }
    set visible(vis: boolean) {
        this.attrs.visible = vis;
    }
    get disabled() {
        return this.attrs.disabled;     
    }
    set disabled(dis: boolean) {
        this.attrs.disabled = dis;
    }
    get width() {
        return this.attrs.width;     
    }
    set width(newWidth: string) {
        this.attrs.width = newWidth;
    }
    get height() {
        return this.attrs.height;   
    }
    set height(newHeight: string) {
        this.attrs.height = newHeight;
    }
    get padding() {
        return this.attrs.padding;    
    }
    set padding(newPadding: string) {
        this.attrs.padding = newPadding;
    }
    get margin() {
        return this.attrs.margin;    
    }
    set margin(newMargin: string) {
        this.attrs.margin = newMargin;
    }


    getCmdStr(update?: boolean, indent?: string, index?: any, connection?: Connection): string {
        if (connection) {
            this.connection = connection;
        }
        let lines = [];
        let parts = [];

        if (!update) {
            parts.push(indent + this.getControlName());
        }

        let attrParts = this.getCmdAttrs(update);
        console.log("attrParts: ", attrParts);
        if (attrParts.length > 0 || !update) {
            console.log("concat run");
            parts.push(...attrParts);
        }
        console.log("parts: ", parts)

        lines.push(parts.join(' '));

        if(index) {
            index.concat(this);
        }

        // TODO lines.concat(getChildren)

        return lines.join('\n');

    }

    private stringifyAttr(attr: any): any {
        let sattr: string = attr.toString();
        return sattr.replace(/\n/g, "\\n").replace(/\"/g, "\\\"");
    }

    private getCmdAttrs(update?: boolean): string[] {
        let parts = [];

        if (update && this.attrs.id == undefined) {
            return parts;
        }
        console.log("attrs before: ", JSON.stringify(this.attrs, undefined, 2))
        Object.keys(this.attrs).forEach(attr => {
            let dirty = this.attrs[attr][1];
            console.log("attrs after: ", JSON.stringify(this.attrs, undefined, 2))
            if (update && !dirty) {
                return;
            }
            console.log("attr before stringify: ", this.attrs[attr][0]);
            let value = this.stringifyAttr(this.attrs[attr][0]);
            console.log(value);
            parts.push(`${attr}="${value}"`);

            this.attrs[attr] = [value, false];
        })
        console.log("parts after loop: ", parts);
        
        if (this._id) {
            if (!update) {
                parts.unshift(`id="${this.stringifyAttr(this._id)}"`)
            }
            else if (parts.length > 0) {
                parts.unshift(`"${this.stringifyAttr(this._id)}`)
            }
        }

        return parts;

    }

    getChildren(): Control[] {
        let children: Control[] = [];
        return children;
    }



}