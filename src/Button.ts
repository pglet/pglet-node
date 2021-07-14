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
    _props: ButtonProperties
    constructor(buttonProps: ButtonProperties) {
        super(buttonProps);
        this._props = buttonProps
        if (buttonProps.onClick) {
            super.addEventHandler("click", buttonProps.onClick);
        }
    }

    getControlName() {
        return "button";
    }

    /* accessors */ 
    get primary() {
        return this.getAttr('primary', typeof(this._props.primary));     
    }
    set primary(newPrimary: boolean) {
        this.setAttr("primary", newPrimary);
    }
    get compound() {
        return this.getAttr('compound', typeof(this._props.compound));     
    }
    set compound(newCompound: boolean) {
        this.setAttr("compound", newCompound);
    }
    get action() {
        return this.getAttr('action', typeof(this._props.action));     
    }
    set action(newAction: boolean) {
        this.setAttr("action", newAction);
    }
    get toolbar() {
        return this.getAttr('toolbar', typeof(this._props.toolbar));     
    }
    set toolbar(newToolbar: boolean) {
        this.setAttr("toolbar", newToolbar);
    }
    get split() {
        return this.getAttr('split', typeof(this._props.split));     
    }
    set split(newSplit: boolean) {
        this.setAttr("split", newSplit);
    }
    get text() {
        return this.getAttr('text', typeof(this._props.text));     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get secondaryText() {
        return this.getAttr('secondaryText', typeof(this._props.secondaryText));     
    }
    set secondaryText(newSecondaryText: string) {
        this.setAttr("secondaryText", newSecondaryText);
    }
    get url() {
        return this.getAttr('url', typeof(this._props.url));     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get title() {
        return this.getAttr('title', typeof(this._props.title));     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get icon() {
        return this.getAttr('icon', typeof(this._props.icon));     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.getAttr('iconColor', typeof(this._props.iconColor));     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get newWindow() {
        return this.getAttr('newWindow', typeof(this._props.newWindow));     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
    get onClick() {
        return this.getEventHandler("click");     
    }
    set onClick(newOnClick: any) {
        this.addEventHandler("click", newOnClick);
    }
}

export = Button;