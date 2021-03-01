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
            console.log("buttonProps onclick detected");
            super.addEventHandler("click", buttonProps.onClick);
        }
    }

    getControlName() {
        return "button";
    }

    /* accessors */ 
    get primary() {
        return this.attrs.primary;     
    }
    set primary(newPrimary: boolean) {
        this.attrs.primary = newPrimary;
    }
    get compound() {
        return this.attrs.compound;     
    }
    set compound(newHorizontalAlign: boolean) {
        this.attrs.compound = newHorizontalAlign;
    }
    get action() {
        return this.attrs.description;     
    }
    set action(newAction: boolean) {
        this.attrs.action = newAction;
    }
    get toolbar() {
        return this.attrs.toolbar;     
    }
    set toolbar(newToolbar: boolean) {
        this.attrs.toolbar = newToolbar;
    }
    get split() {
        return this.attrs.split;     
    }
    set split(newSplit: boolean) {
        this.attrs.split = newSplit;
    }
    get text() {
        return this.attrs.text;     
    }
    set text(newText: string) {
        this.attrs.text = newText;
    }
    get secondaryText() {
        return this.attrs.secondaryText;     
    }
    set secondaryText(newSecondaryText: string) {
        this.attrs.secondaryText = newSecondaryText;
    }
    get url() {
        return this.attrs.url;     
    }
    set url(newUrl: string) {
        this.attrs.url = newUrl;
    }
    get title() {
        return this.attrs.title;     
    }
    set title(newTitle: string) {
        this.attrs.title = newTitle;
    }
    get icon() {
        return this.attrs.icon;     
    }
    set icon(newIcon: string) {
        this.attrs.icon = newIcon;
    }
    get iconColor() {
        return this.attrs.iconColor;     
    }
    set iconColor(newText: string) {
        this.attrs.iconColor = newText;
    }
    get data() {
        return this.attrs.data;     
    }
    set data(newIconColor: string) {
        this.attrs.data = newIconColor;
    }
    get newWindow() {
        return this.attrs.newWindow;     
    }
    set newWindow(newNewWindow: boolean) {
        this.attrs.newWindow = newNewWindow;
    }
}

export = Button;