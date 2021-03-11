import { ControlProperties, Control } from './Control'


interface ButtonProperties extends ControlProperties {
    primary?: boolean,
    compound?: boolean,
    action?: boolean,
    toolbar?: boolean,
    split?: boolean,
    text?: string,
    secondaryText?: string,
    url?: string,
    title?: string,
    icon?: string,
    iconColor?: string,
    data?: string,
    newWindow?: boolean,
    onClick?: any
}

class Button extends Control {

    constructor(buttonProps: ButtonProperties) {
        super(buttonProps);
        if (buttonProps.onClick) {
            super.addEventHandler("click", buttonProps.onClick);
        }
    }

    getControlName() {
        return "button";
    }

    /* accessors */ 
    get primary() {
        return this.attrs.get('primary')[0];     
    }
    set primary(newPrimary: boolean) {
        this.setAttr("primary", newPrimary);
    }
    get compound() {
        return this.attrs.get('compound')[0];     
    }
    set compound(newCompound: boolean) {
        this.setAttr("compound", newCompound);
    }
    get action() {
        return this.attrs.get('action')[0];     
    }
    set action(newAction: boolean) {
        this.setAttr("action", newAction);
    }
    get toolbar() {
        return this.attrs.get('toolbar')[0];     
    }
    set toolbar(newToolbar: boolean) {
        this.setAttr("toolbar", newToolbar);
    }
    get split() {
        return this.attrs.get('split')[0];     
    }
    set split(newSplit: boolean) {
        this.setAttr("split", newSplit);
    }
    get text() {
        return this.attrs.get('text')[0];     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get secondaryText() {
        return this.attrs.get('secondaryText')[0];     
    }
    set secondaryText(newSecondaryText: string) {
        this.setAttr("secondaryText", newSecondaryText);
    }
    get url() {
        return this.attrs.get('url')[0];     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get title() {
        return this.attrs.get('title')[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get icon() {
        return this.attrs.get('icon')[0];     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.attrs.get('iconColor')[0];     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get newWindow() {
        return this.attrs.get('newWindow')[0];     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
}

export = Button;