import { ControlProperties, Control } from './Control'

// interface FooterProperties extends ControlProperties {
//     childControls?: []
// }

interface PanelProperties extends ControlProperties {
    open?: boolean,
    title?: string,
    type?: string,
    autoDismiss?: boolean,
    lightDismiss?: boolean,
    width?: string,
    blocking?: boolean,
    data?: string,
    footer: Control[],
    onDismiss?: any
}

class Footer {
    private _controls: Control[] = []

    constructor(controls: Control[]) {
        controls.forEach(ctrl => {
            this._controls.push(ctrl);
        })
    }

    getControlName() {
        return "footer";
    }

    protected getChildren(): Control[] {
        return this._controls;
    }
    /* accessors */ 
    get controls() {
        return this._controls;  
    }
    set controls(newControls: Control[]) {
        this._controls.concat(newControls);
    }

}

class Panel extends Control {
    private _controls: Control[] = [];

    constructor(panelProps: PanelProperties) {
        super(panelProps);
        if (panelProps.onDismiss) {
            super.addEventHandler("dismiss", panelProps.onDismiss);
        }
        panelProps.footer.forEach(ctrl => {
            this._controls.push(ctrl);
        })
    }

    getControlName() {
        return "panel";
    }

    protected getChildren(): Control[] {
        return this._controls;
    }

    /* accessors */ 
    get open() {
        return this.attrs.get('open')[0];     
    }
    set open(newOpen: boolean) {
        this.setAttr("open", newOpen);
    }
    get title() {
        return this.attrs.get('title')[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get type() {
        return this.attrs.get('type')[0];     
    }
    set type(newType: string) {
        this.setAttr("type", newType);
    }
    get autoDismiss() {
        return this.attrs.get('autoDismiss')[0];     
    }
    set autoDismiss(newAutoDismiss: boolean) {
        this.setAttr("autoDismiss", newAutoDismiss);
    }
    get lightDismiss() {
        return this.attrs.get('lightDismiss')[0];     
    }
    set lightDismiss(newLightDismiss: boolean) {
        this.setAttr("lightDismiss", newLightDismiss);
    }
    get width() {
        return this.attrs.get('width')[0];     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get blocking() {
        return this.attrs.get('blocking')[0];     
    }
    set blocking(newBlocking: string) {
        this.setAttr("blocking", newBlocking);
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Panel;