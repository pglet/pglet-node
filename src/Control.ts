import { Connection } from './Connection';


export interface ControlProperties {
    id?: string,
    childControls?: Control[],
    visible?: boolean,
    disabled?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    margin?: string
}

export class Control {
    protected _id: string | null;
    protected _childControls: Control[] | null;
    protected _eventHandlers: any = {};
    protected connection: Connection | null;
    protected attrs: any = {};

    constructor(controlProps: ControlProperties) {
        this._id = controlProps.id ? controlProps.id : undefined;
        this._childControls = controlProps.childControls ? controlProps.childControls : new Array<Control>();
        
        this.attrs = new Map();
        Object.keys(controlProps).forEach(key => {
            if (key != "id" && key != "childControls" && key!="onClick") {
                this.setAttr(key, controlProps[key]);
            }       
        })
    }

    protected getControlName() {
        throw new Error("must be overridden in child class");
    }

    protected setAttr(key: string, value: any) {
        this.attrs[key] = [value, true];
    }
     
    protected getEventHandlers() {
        return this._eventHandlers;
    }

    protected addEventHandler(eventName: string, handler: any): void {
        this._eventHandlers[eventName] = handler;
        console.log("control eventHandlers: ", this._eventHandlers, this.getControlName());
        //only used for previously instantiated controls
        if (this.connection) {
            this.connection.addEventHandlers(this._id, eventName, handler);
        }
    }
 
    /* accessors */ 
    get id() {
        return this._id;     
    }
    set id(newId: string) {
        this._id = newId;
    }
    get visible() {
        return this.attrs.visible[0];     
    }
    set visible(newVisible: boolean) {
        this.setAttr("visible",newVisible);
    }
    get disabled() {
        return this.attrs.disabled[0];     
    }
    set disabled(newDisabled: boolean) {
        this.setAttr("disabled", newDisabled);
    }
    get width() {
        return this.attrs.width[0];     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get height() {
        return this.attrs.height[0];   
    }
    set height(newHeight: string) {
        this.setAttr("height", newHeight);
    }
    get padding() {
        return this.attrs.padding[0];    
    }
    set padding(newPadding: string) {
        this.setAttr("padding", newPadding);
    }
    get margin() {
        return this.attrs.margin[0];    
    }
    set margin(newMargin: string) {
        this.setAttr("margin", newMargin);
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

        if (attrParts.length > 0 || !update) {
            parts.push(...attrParts);
        }

        lines.push(parts.join(' '));

        if(index) {
            index.push(this);
        }

        this.getChildren().forEach(control => {
             let childCmd = control.getCmdStr(update, (indent+"  "), index);
             if (childCmd != "") {
                 lines.push(childCmd);
             }
        })
        
        return lines.join('\n');
    }

    // unsure of the utility of this function
    private stringifyAttr(attr: any): any {
        let sattr: string = attr.toString();
        return sattr.replace(/\n/g, "\\n").replace(/\"/g, "\\\"");
    }

    private getCmdAttrs(update?: boolean): string[] {
        let parts = [];

        if (update && !this._id) {
            return parts;
        }
        //console.log("attrs before: ", JSON.stringify(this.attrs, undefined, 2))
        Object.keys(this.attrs).forEach(attr => {
            let dirty = this.attrs[attr][1];
            if (update && !dirty) {
                return;
            }
            
            let value = this.stringifyAttr(this.attrs[attr][0]);

            parts.push(`${attr}="${value}"`);

            this.attrs[attr] = [value, false];
        })
        
        if (this._id) {
            if (!update) {
                parts.unshift(`id="${this.stringifyAttr(this._id)}"`)
            }
            else if (parts.length > 0) {
                parts.unshift(`${this.stringifyAttr(this._id)}`)
            }
        }

        return parts;
    }

    protected getChildren(): Control[] | null {
        return this._childControls;
    }
}