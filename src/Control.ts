import Page from './Page';
import { GetId } from './Utils';
import { Command } from './protocol/Command';
import * as diff from 'diff';
import { CpuInfo } from 'os';
import { Log } from './Utils';

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
        // excludedAttrs is needed so that a single object can be passed to control constructor and here event handlers and other non-applicable attributes are filtered out. 
        let excludedAttrs = ["connection", "id", "childControls", "onClick", "onChange", "onSearch", "onEscape", "onClear", "onDismiss", "onChangeHandler", "onSubmit", "columns", "items", "tabs", "overflow", "far", "options", "footer", "buttons", "points", "lines", "optionKeys", "optionValues"]
        Object.keys(controlProps).forEach(key => {  
            if (excludedAttrs.indexOf(key) < 0) {                
                this.setAttr(key, controlProps[key]);
            }   
        })
    }

    getControlName(): string {
        throw new Error("must be overridden in child class");
    }
    
    protected getAttr(key: string, type?: string) {

        let value = this.attrs.has(key) ? this.attrs.get(key)[0] : undefined;

        if (type == 'boolean' && (value && typeof(value) == "string")) {
            return (value == "true");
        }
        else if (type == "number" && (value && typeof(value) == "string")) {
            return parseFloat(value);
        }
        return value;
    }
    

    setAttr(key: string, value: any, dirty = true) {
        let newVal: string;
        if (typeof(value) == "boolean") {
            newVal = String(value);
        }
        else if(typeof(value) == "number") {
            newVal = value.toString();
        }
        else {
            newVal = value;
        }
        this.attrs.set(key, [newVal, dirty]);
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

    populateUpdateCommands(controlMap: Map<string, Control>, addedControls: Control[], commandList: Command[]) {
        let updateCmd = this.getCmdAttrs(true);

        if (Object.keys(updateCmd.attrs).length > 0) {
            //`set ${updateCmd.join(' ')}`
            updateCmd.name = "set";
            commandList.push(updateCmd);
        }

        let hashes = new Map<number, Control>();
        let previousInts: number[] = [];
        let currentInts: number[] = [];
        
        const previousChildren = this._previousChildren;
        previousChildren.forEach(ctrl => {
            let hash = GetId(ctrl);
            hashes.set(hash, ctrl);
            previousInts.push(hash);
        })

        const currentChildren = this.getChildren();
        currentChildren.forEach(ctrl => {
            let hash = GetId(ctrl);
            hashes.set(hash, ctrl);
            currentInts.push(hash);
        })

        let diffList = diff.diffArrays(previousInts, currentInts);
        let n = 0;
        diffList.forEach(changeObject => {
            //console.log("change object: ", changeObject);
            if (changeObject.added) {
                //insert control
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    let cmd = ctrl.getCmds(0, controlMap, addedControls);
                    let addCommand = new Command();
                    addCommand.name = "add";
                    addCommand.attrs = {
                        "to": this._uid,
                        "at": n.toString()
                    }
                    addCommand.commands.push(...cmd)
                    commandList.push(addCommand);
                    n += 1;
                })
            }
            else if (changeObject.removed) {
                // remove control
                let ids = [];
                changeObject.value.forEach(val => {
                    let ctrl = hashes.get(val);
                    //console.log(Log.bg.red, "ctrl and ctrl.uid: ", ctrl, ctrl.uid)
                    this.removeControlRecursively(controlMap, ctrl);
                    ids.push(ctrl.uid);
                })
                let removeCommand = new Command();
                removeCommand.name = "remove";
                removeCommand.values = ids;
                commandList.push(removeCommand);
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
        this._previousChildren.push(...currentChildren);
    }

    removeControlRecursively(map: Map<string, Control>, control: Control) {
        control.getChildren().forEach(ctrl => {
            this.removeControlRecursively(map, ctrl);
        })
        map.delete(control.uid);
    }

    getCmds(indent?: number, index?: Map<string, Control>, addedControls?: Control[]): Command[] {

        if (this.uid && index && index.has(this.uid)) {
            index.delete(this.uid);
        }

        if(!indent) {
            indent = 0;
        }

        let commands: Command[] = [];
        
        //top level command
        let attrParts = this.getCmdAttrs(false);
        attrParts.indent = indent;
        attrParts.values.push(this.getControlName());
        commands.push(attrParts);    

        if (addedControls) {
            addedControls.push(this);
        }
        const currentChildren = this.getChildren();

        currentChildren.forEach(control => {
             let childCmds = control.getCmds((indent + 2), index, addedControls);
             if (childCmds.length > 0) {
                commands.push(...childCmds);
             }
        })
        
        this._previousChildren.length = 0;
        this._previousChildren.push(...currentChildren);
        //commands.forEach(cmd => console.log(Log.bg.red, cmd, cmd.values, cmd.attrs));
        return commands
    }

    // alternate to storing attributes as strings?
    private stringifyAttr(attr: any): any {
        let sattr: string = attr.toString();
        return sattr.replace(/\n/g, "\\n").replace(/\"/g, "\\\"");
    }

    private getCmdAttrs(update?: boolean): Command {
        let cmd = new Command();

        if (update && !this.uid) {
            return cmd;
        }

        this.attrs.forEach((value, attr) => {
            let dirty = value[1];
            
            if (update && !dirty) {
                return;
            }
            cmd.attrs[attr] = value[0]

            this.attrs.set(attr, [value[0], false]);
        })
        
        if (!update && this._id) {
            cmd.attrs["id"] = this.stringifyAttr(this._id);
        }
        else if (update && Object.keys(cmd.attrs).length > 0) {
            cmd.values.push(this.stringifyAttr(this.uid));
        }      

        return cmd;
    }


    protected getChildren(): Control[] {
        return [];
    }
}

export {
    Control, ControlProperties
}