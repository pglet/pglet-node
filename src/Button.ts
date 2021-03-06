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
            console.log("buttonProps onclick detected: ", buttonProps.onClick);
            super.addEventHandler("click", buttonProps.onClick);
        }
    }

    getControlName() {
        return "button";
    }

    /* accessors */ 
    get primary() {
        return this.attrs.primary[0];     
    }
    set primary(newPrimary: boolean) {
        this.setAttr("primary", newPrimary);
    }
    get compound() {
        return this.attrs.compound[0];     
    }
    set compound(newCompound: boolean) {
        this.setAttr("compound", newCompound);
    }
    get action() {
        return this.attrs.action[0];     
    }
    set action(newAction: boolean) {
        this.setAttr("action", newAction);
    }
    get toolbar() {
        return this.attrs.toolbar[0];     
    }
    set toolbar(newToolbar: boolean) {
        this.setAttr("toolbar", newToolbar);
    }
    get split() {
        return this.attrs.split[0];     
    }
    set split(newSplit: boolean) {
        this.setAttr("split", newSplit);
    }
    get text() {
        return this.attrs.text[0];     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get secondaryText() {
        return this.attrs.secondaryText[0];     
    }
    set secondaryText(newSecondaryText: string) {
        this.setAttr("secondaryText", newSecondaryText);
    }
    get url() {
        return this.attrs.url[0];     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get title() {
        return this.attrs.title[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get icon() {
        return this.attrs.icon[0];     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.attrs.iconColor[0];     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
    get data() {
        return this.attrs.data[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get newWindow() {
        return this.attrs.newWindow[0];     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
}

export = Button;