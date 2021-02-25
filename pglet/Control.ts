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
    // public id: string | null;
    // public visible: boolean | null;
    // public disabled: boolean | null;
    // public width: string | null;
    // public height: string | null;
    // public padding: string | null;
    // public margin: string | null;
    protected connection: Connection | null;
    protected attrs: any = {};

    constructor(controlProps: ControlProperties) {
        // this.id = controlProps.id ? controlProps.id : null;
        // this.visible = controlProps.visible ? controlProps.visible : null;
        // this.disabled = controlProps.disabled ? controlProps.disabled : null;
        // this.width = controlProps.width ? controlProps.width : null;
        // this.height = controlProps.height ? controlProps.height : null;
        // this.padding = controlProps.padding ? controlProps.padding : null;
        // this.margin = controlProps.margin ? controlProps.margin : null;
        this.attrs = controlProps;
    }
    getControlName() {
        throw new Error("must be overridden in child class");
    }
    
    /* accessors */ 
    get id() {
        return this.attrs.id;     
    }
    set id(newId: string) {
        this.attrs.id = newId;
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


    private getCmdStr(update?: boolean, indent?: string, index?: any, connection?: Connection): string {
        if (connection) {
            this.connection = connection;
        }

        let parts = [];

        if (!update) {
            parts.concat(indent + this.getControlName);
        }


        
        return "TODO";

    }

    private stringifyAttr(attr: any): any {
        let sattr = attr.toString();
        return sattr.replaceAll("\n", "\\n").replaceAll("\"", "\\\"");
    }

    private getCmdAttrs(update?: boolean): string[] {
        let parts = [];

        if (update && this.attrs.id == undefined) {
            return parts;
        }
        this.attrs.forEach(attr => {
            let dirty = this.attrs[attr][1];

            if (update && !dirty) {
                continue
            }

            let value = this.stringifyAttr(this.attrs[attr][0]);
            parts.concat(value);

            this.attrs[attr] = [value, false];
        })

        

    }

    getChildren(): Control[] {
        let children = Control[];
        return children;
    }



}