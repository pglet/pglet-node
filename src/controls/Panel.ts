import { ControlProperties, Control } from '../Control'

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

// internal class
class Footer extends Control {
    private _controls: Control[] = []

    constructor(props) {
        super(props);
        props.childControls.forEach(ctrl => {
            this.addControl(ctrl);
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
    addControl(ctrl: Control) {
        this._controls.push(ctrl);
    }
}

class Panel extends Control {
    _props: PanelProperties
    private _footer: Footer;

    constructor(panelProps: PanelProperties) {
        super(panelProps);
        this._props = panelProps
        if (panelProps.onDismiss) {
            super.addEventHandler("dismiss", panelProps.onDismiss);
        }
        this._footer = new Footer({childControls: panelProps.footer});
    }

    getControlName() {
        return "panel";
    }
    protected getChildren(): Control[] {
        return [this._footer];
    }

    /* accessors */ 
    get open() {
        return this.getAttr('open', typeof(this._props.open));     
    }
    set open(newOpen: boolean) {
        this.setAttr("open", newOpen);
    }
    get title() {
        return this.getAttr('title', typeof(this._props.title));     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get type() {
        return this.getAttr('type', typeof(this._props.type));     
    }
    set type(newType: string) {
        this.setAttr("type", newType);
    }
    get autoDismiss() {
        return this.getAttr('autoDismiss', typeof(this._props.autoDismiss));     
    }
    set autoDismiss(newAutoDismiss: boolean) {
        this.setAttr("autoDismiss", newAutoDismiss);
    }
    get lightDismiss() {
        return this.getAttr('lightDismiss', typeof(this._props.lightDismiss));     
    }
    set lightDismiss(newLightDismiss: boolean) {
        this.setAttr("lightDismiss", newLightDismiss);
    }
    get width() {
        return this.getAttr('width', typeof(this._props.width));     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get blocking() {
        return this.getAttr('blocking', typeof(this._props.blocking));     
    }
    set blocking(newBlocking: boolean) {
        this.setAttr("blocking", newBlocking);
    }
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get onDismiss() {
        return this.getEventHandler("dismiss");     
    }
    set onDismiss(newOnDismiss: any) {
        this.addEventHandler("dismiss", newOnDismiss);
    }
}

export = Panel;