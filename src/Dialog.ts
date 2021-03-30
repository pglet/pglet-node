import { ControlProperties, Control } from './Control'

interface DialogProperties extends ControlProperties {
    open?: boolean,
    title?: string,
    subText?: string,
    autoDismiss?: boolean,
    largeHeader?: boolean,
    width?: string,
    maxWidth?: string,
    height?: string,
    fixedTop?: boolean,
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

class Dialog extends Control {
    private _footer: Footer;

    constructor(dialogProps: DialogProperties) {
        super(dialogProps);
        if (dialogProps.onDismiss) {
            super.addEventHandler("dismiss", dialogProps.onDismiss);
        }
        this._footer = new Footer({childControls: dialogProps.footer});
    }

    getControlName() {
        return "dialog";
    }

    protected getChildren(): Control[] {
        return [this._footer];
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
    get subText() {
        return this.attrs.get('subText')[0];     
    }
    set subText(newSubText: string) {
        this.setAttr("subText", newSubText);
    }
    get autoDismiss() {
        return this.attrs.get('autoDismiss')[0];     
    }
    set autoDismiss(newAutoDismiss: boolean) {
        this.setAttr("autoDismiss", newAutoDismiss);
    }
    get largeHeader() {
        return this.attrs.get('largeHeader')[0];     
    }
    set largeHeader(newLargeHeader: boolean) {
        this.setAttr("largeHeader", newLargeHeader);
    }
    get width() {
        return this.attrs.get('width')[0];     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get maxWidth() {
        return this.attrs.get('maxWidth')[0];     
    }
    set maxWidth(newMaxWidth: string) {
        this.setAttr("maxWidth", newMaxWidth);
    }
    get height() {
        return this.attrs.get('height')[0];     
    }
    set height(newHeight: string) {
        this.setAttr("height", newHeight);
    }
    get fixedTop() {
        return this.attrs.get('fixedTop')[0];     
    }
    set fixedTop(newFixedTop: boolean) {
        this.setAttr("fixedTop", newFixedTop);
    }
    get blocking() {
        return this.attrs.get('blocking')[0];     
    }
    set blocking(newBlocking: boolean) {
        this.setAttr("blocking", newBlocking);
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Dialog;