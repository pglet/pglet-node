import { ControlProperties, Control } from '../Control'

interface DialogProperties extends ControlProperties {
    open?: boolean,
    title?: string,
    subText?: string,
    autoDismiss?: boolean,
    type?: string,
    width?: string,
    maxWidth?: string,
    height?: string,
    fixedTop?: boolean,
    blocking?: boolean,
    data?: string,
    childControls?: Control[],
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

class Dialog extends Control {
    _props: DialogProperties
    private _footer: Footer;
    private _childControls: Control[] = [];

    constructor(dialogProps: DialogProperties) {
        super(dialogProps);
        this._props = dialogProps
        if (dialogProps.onDismiss) {
            super.addEventHandler("dismiss", dialogProps.onDismiss);
        }
        if (dialogProps.childControls && dialogProps.childControls.length > 0) {
            this._childControls.push(...dialogProps.childControls)
        }
        this._footer = new Footer({childControls: dialogProps.footer});
    }

    getControlName() {
        return "dialog";
    }
    protected getChildren(): Control[] {
        return [...this._childControls, this._footer];
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
    get subText() {
        return this.getAttr('subText', typeof(this._props.subText));     
    }
    set subText(newSubText: string) {
        this.setAttr("subText", newSubText);
    }
    get autoDismiss() {
        return this.getAttr('autoDismiss', typeof(this._props.autoDismiss));     
    }
    set autoDismiss(newAutoDismiss: boolean) {
        this.setAttr("autoDismiss", newAutoDismiss);
    }
    get type() {
        return this.getAttr('type', typeof(this._props.type));     
    }
    set type(newType: string) {
        this.setAttr("type", newType);
    }
    get width() {
        return this.getAttr('width', typeof(this._props.width));     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get maxWidth() {
        return this.getAttr('maxWidth', typeof(this._props.maxWidth));     
    }
    set maxWidth(newMaxWidth: string) {
        this.setAttr("maxWidth", newMaxWidth);
    }
    get height() {
        return this.getAttr('height', typeof(this._props.height));     
    }
    set height(newHeight: string) {
        this.setAttr("height", newHeight);
    }
    get fixedTop() {
        return this.getAttr('fixedTop', typeof(this._props.fixedTop));     
    }
    set fixedTop(newFixedTop: boolean) {
        this.setAttr("fixedTop", newFixedTop);
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

export = Dialog;