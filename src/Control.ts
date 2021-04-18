import { Connection } from './Connection';
import { StringHash } from './Utils';
import * as diff from 'diff';


interface ControlProperties {
    id?: string,
    //childControls?: Control[],
    visible?: boolean,
    disabled?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    margin?: string
}

class Control {
    protected _id: string | null;
    protected _page: Control | null;
    protected _uid: string | null;
    protected _eventHandlers: any = {};
    protected _previousChildren: Control[] = [];
    //protected connection: Connection | null;
    protected attrs: any = {};

    constructor(controlProps: ControlProperties) {
        this._id = controlProps.id ? controlProps.id : undefined;
        //this._childControls = controlProps.childControls ? controlProps.childControls : new Array<Control>();
        // console.log("outerstack childControls: ", this._childControls);
        this.attrs = new Map();
        let excludedAttrs = ["id", "childControls", "onClick", "onDismiss", "columns", "items", "tabs", "overflow", "far", "options", "footer", "buttons"]
        Object.keys(controlProps).forEach(key => {
            // if (key != "id" && key != "childControls" && key != "onClick" && key != "onDismiss" && key != "columns" && key != "items" && key != "tabs" && key != "overflow" && key != "far" && key != "options" && key != "footer" && key != "buttons") {
            //     this.setAttr(key, controlProps[key]);
            // }    
            if (excludedAttrs.indexOf(key) < 0) {
                this.setAttr(key, controlProps[key]);
            }   
        })
        // console.log("ctrl and its attrs: ", this.getControlName(), this._id, this.attrs);
    }

    protected getControlName() {
        throw new Error("must be overridden in child class");
    }
    
    protected getAttr(key: string) {
        // console.log("getAttr called with argument: ", key);
        return this.attrs.get(key)[0];

    }

    protected setAttr(key: string, value: any) {
        this.attrs.set(key, [value, true]);
        // console.log("attrs so far: ", this.attrs);
    }
     
    protected getEventHandlers() {
        return this._eventHandlers;
    }

    protected addEventHandler(eventName: string, handler: any): void {
        this._eventHandlers[eventName] = handler;
        // console.log("control eventHandlers: ", this._eventHandlers, this.getControlName());
        //only used for previously instantiated controls

        /*if (this.connection) {
            this.connection.addEventHandlers(this._id, eventName, handler);
        }*/
    }
 
    /* accessors */ 
    get uid() {
        return this._uid;
    }
    set uid(uid: string) {
        this._uid = uid;
    }
    get page() {
        return this._page;
    }
    set page(page: Control) {
        this._page = page;
    }
    get id() {
        return this._id;     
    }
    set id(newId: string) {
        this._id = newId;
    }
    get visible() {
        return this.attrs.get('visible')[0];     
    }
    set visible(newVisible: boolean) {
        this.setAttr("visible",newVisible);
    }
    get disabled() {
        return this.attrs.get('disabled')[0];     
    }
    set disabled(newDisabled: boolean) {
        this.setAttr("disabled", newDisabled);
    }
    get width() {
        return this.attrs.get('width')[0];     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get height() {
        return this.attrs.get('height')[0];   
    }
    set height(newHeight: string) {
        this.setAttr("height", newHeight);
    }
    get padding() {
        return this.attrs.get('padding')[0];    
    }
    set padding(newPadding: string) {
        this.setAttr("padding", newPadding);
    }
    get margin() {
        return this.attrs.get('margin')[0];    
    }
    set margin(newMargin: string) {
        this.setAttr("margin", newMargin);
    }

    // why can't this be protected?
    populateUpdateCommands(controlMap: Map<string, Control>, addedControls: Control[], commandList: String[]) {
        let updateAttrs = this.getCmdAttrs(true);

        if (updateAttrs.length > 0) {
            commandList.push(`set ${updateAttrs.join(' ')}`);
        }

        let hashes = new Map<number, Control>();
        let previousInts: number[] = [];
        let currentInts: number[] = [];
        console.log("previous children: ", this._previousChildren);
        this._previousChildren.forEach(ctrl => {
            let hash = StringHash(ctrl.getCmdStr());
            hashes.set(hash, ctrl);
            previousInts.push(hash);
        })
        console.log("current children: ", this.getChildren());
        this.getChildren().forEach(ctrl => {
            let hash = StringHash(ctrl.getCmdStr());
            hashes.set(hash, ctrl);
            currentInts.push(hash);
        })

        let diffList = diff.diffArrays(previousInts, currentInts);
        
        let n = 0;
        diffList.forEach(changeObject => {
            if (changeObject.added) {
                //insert control
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    //TODO change getCmdStr signature.
                    let cmd = ctrl.getCmdStr('', controlMap, addedControls);
                    commandList.push(`add to="${this.uid}" at="${n}"\n${cmd}`);
                    n += 1;
                })
            }
            else if (changeObject.removed) {
                // remove control
                let ids = [];
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    this.removeControlRecursively(controlMap, ctrl);
                    ids.push(ctrl.uid);
                })
                
                commandList.push(`remove ${ids.join(' ')}`);

            }
            else {
                // leave control
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    ctrl.populateUpdateCommands(controlMap, addedControls, commandList);
                    n += 1;
                })

            }
        })
        this._previousChildren.length = 0;
        this._previousChildren.push(...this.getChildren());

    }

    private removeControlRecursively(map: Map<string, Control>, control: Control) {
        control.getChildren().forEach(ctrl => {
            this.removeControlRecursively(map, ctrl);
        })
        map.delete(control.uid);

    }

    getCmdStr(indent?: string, index?: Map<string, Control>, addedControls?: Control[]): string {
        /*if (connection) {
            this.connection = connection;
        }*/

        if (this.uid && index && index.has(this.uid)) {
            index.delete(this.uid);
        }

        if(!indent) {
            indent = '';
        }

        let lines = [];
        let parts = [];
        
        // console.log("current ctrl attrs: ", this.attrs);
        let attrParts = this.getCmdAttrs(false);
        // console.log("returned attr parts: ", attrParts);
        parts.push(indent + this.getControlName(), ...attrParts);     

        lines.push(parts.join(' '));

        if (addedControls) {
            console.log("added control: ", this)
            addedControls.push(this);
        }

        this.getChildren().forEach(control => {
             let childCmd = control.getCmdStr((indent+"  "), index, addedControls);
             if (childCmd != "") {
                 lines.push(childCmd);
             }
        })
        
        this._previousChildren.length = 0;
        this._previousChildren.push(...this.getChildren());

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

        this.attrs.forEach((value, attr) => {
            let dirty = this.attrs.get(attr)[1];
            
            if (update && !dirty) {
                return;
            }

            parts.push(`${attr}="${value[0]}"`);

            this.attrs.set(attr, [value[0], false]);
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

    protected getChildren() {
        return [];
    }
}

export {
    Control, ControlProperties
}