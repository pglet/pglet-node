import Page from './Page';
import { GetId } from './Utils';
import * as diff from 'diff';

interface ControlProperties {
    id?: string,
    visible?: boolean,
    disabled?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    margin?: string
}

class Control {
    protected _id: string | null;
    protected _page: Page | null;
    protected _uid: string | null;
    protected _eventHandlers: any = {};
    protected _previousChildren: Control[] = [];
    protected attrs: any = {};

    constructor(controlProps: ControlProperties) {
        this._id = controlProps.id ? controlProps.id : undefined;
        this.attrs = new Map();
        let excludedAttrs = ["id", "childControls", "onClick", "onChange", "onDismiss", "onChangeHandler", "columns", "items", "tabs", "overflow", "far", "options", "footer", "buttons", "points", "lines"]
        Object.keys(controlProps).forEach(key => {  
            if (excludedAttrs.indexOf(key) < 0) {
                this.setAttr(key, controlProps[key]);
            }   
        })
    }

    getControlName() {
        throw new Error("must be overridden in child class");
    }
    
    protected getAttr(key: string, type?: string) {

        let value = this.attrs.get(key)[0];
        if (type == 'boolean' && (value && typeof(value) == "string")) {
            return (value == "true");
        }
        else if (type == "number" && (value && typeof(value) == "string")) {
            return parseFloat(value);
        }

        return value;

    }

    setAttr(key: string, value: any, dirty?: boolean) {
        this.attrs.set(key, [value, dirty ? dirty : true]);
    }
     
    protected getEventHandler(eventName: string) {
        return this._eventHandlers[eventName];
    }

    protected addEventHandler(eventName: string, handler: any): void {
        this._eventHandlers[eventName] = handler;
    }
 
    /* accessors */
    get eventHandlers() {
        return this._eventHandlers;
    } 
    get uid() {
        return this._uid;
    }
    set uid(uid: string) {
        this._uid = uid;
    }
    get page() {
        return this._page;
    }
    set page(page: Page) {
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
    async update() {
        if (!this._page) {
            throw `Control must be added to the page first.`
        }
        else {
            return this._page.update([this]);
        }
    }
    populateUpdateCommands(controlMap: Map<string, Control>, addedControls: Control[], commandList: String[]) {
        let updateAttrs = this.getCmdAttrs(true);

        if (updateAttrs.length > 0) {
            commandList.push(`set ${updateAttrs.join(' ')}`);
        }

        let hashes = new Map<number, Control>();
        let previousInts: number[] = [];
        let currentInts: number[] = [];
        
        const previousChildren = this._previousChildren;
        previousChildren.forEach(ctrl => {
            //console.log("previous child cmdstr: ", ctrl.getCmdStr());
            let hash = GetId(ctrl);
            hashes.set(hash, ctrl);
            previousInts.push(hash);
        })

        const currentChildren = this.getChildren();
        currentChildren.forEach(ctrl => {
            //console.log("current child cmdstr: ", ctrl.getCmdStr());
            let hash = GetId(ctrl);
            hashes.set(hash, ctrl);
            currentInts.push(hash);
        })

        let diffList = diff.diffArrays(previousInts, currentInts);
        let n = 0;
        diffList.forEach(changeObject => {
            //console.log("change object: ", changeObject);
            if (changeObject.added) {
                console.log("insert");
                //insert control
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    let cmd = ctrl.getCmdStr('', controlMap, addedControls);
                    commandList.push(`add to="${this.uid}" at="${n}"\n${cmd}`);
                    n += 1;
                })
            }
            else if (changeObject.removed) {
                console.log("remove");
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
                console.log("leave");
                // leave control
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    ctrl.populateUpdateCommands(controlMap, addedControls, commandList);
                    n += 1;
                })

            }
        })
        
        this._previousChildren.length = 0;
        this._previousChildren.push(...currentChildren);
    }

    removeControlRecursively(map: Map<string, Control>, control: Control) {
        control.getChildren().forEach(ctrl => {
            this.removeControlRecursively(map, ctrl);
        })
        map.delete(control.uid);
    }

    getCmdStr(indent?: string, index?: Map<string, Control>, addedControls?: Control[]): string {

        if (this.uid && index && index.has(this.uid)) {
            index.delete(this.uid);
        }

        if(!indent) {
            indent = '';
        }

        let lines = [];
        let parts = [];
        
        let attrParts = this.getCmdAttrs(false);
        parts.push(indent + this.getControlName(), ...attrParts);     

        lines.push(parts.join(' '));

        if (addedControls) {
            addedControls.push(this);
        }
        const currentChildren = this.getChildren();

        currentChildren.forEach(control => {
             let childCmd = control.getCmdStr((indent+"  "), index, addedControls);
             if (childCmd != "") {
                 lines.push(childCmd);
             }
        })
        
        this._previousChildren.length = 0;
        this._previousChildren.push(...currentChildren);

        return lines.join('\n');
    }

    // unsure of the utility of this function
    private stringifyAttr(attr: any): any {
        let sattr: string = attr.toString();
        return sattr.replace(/\n/g, "\\n").replace(/\"/g, "\\\"");
    }

    private getCmdAttrs(update?: boolean): string[] {
        let parts = [];

        if (update && !this.uid) {
            return parts;
        }

        this.attrs.forEach((value, attr) => {
            //console.log("value, attr: ", value, attr);
            //let dirty = this.attrs.get(attr)[1];
            let dirty = value[1];
            
            if (update && !dirty) {
                return;
            }

            parts.push(`${attr}="${value[0]}"`);

            this.attrs.set(attr, [value[0], false]);
        })
        
        if (!update && this._id) {
            parts.unshift(`id="${this.stringifyAttr(this._id)}"`)
        }
        else if (update && parts.length > 0) {
            parts.unshift(`${this.stringifyAttr(this.uid)}`)
        }
        

        return parts;
    }

    protected getChildren() {
        //return new Array<Control>();
        return [];
    }
}

export {
    Control, ControlProperties
}