import { ControlProperties, Control } from './Control'


interface LinkProperties extends ControlProperties {
    value?: string,
    url?: string,
    newWindow?: boolean,
    title?: string,
    size?: string,
    bold?: boolean,
    italic?: boolean,
    pre?: boolean,
    align?: string
}

class Link extends Control {
    _props: LinkProperties
    constructor(linkProps: LinkProperties) {
        super(linkProps);
        this._props = linkProps
    }

    getControlName() {
        return "link";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get url() {
        return this.getAttr('url', typeof(this._props.url));     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get newWindow() {
        return this.getAttr('newWindow', typeof(this._props.newWindow));     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
    get title() {
        return this.getAttr('title', typeof(this._props.title));     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get size() {
        return this.getAttr('size', typeof(this._props.size));     
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
    get bold() {
        return this.getAttr('bold', typeof(this._props.bold));     
    }
    set bold(newBold: boolean) {
        this.setAttr("bold", newBold);
    }
    get italic() {
        return this.getAttr('italic', typeof(this._props.italic));     
    }
    set italic(newItalic: boolean) {
        this.setAttr("italic", newItalic);
    }
    get pre() {
        return this.getAttr('pre', typeof(this._props.pre));     
    }
    set pre(newPre: boolean) {
        this.setAttr("password", newPre);
    }
    get align() {
        return this.getAttr('align', typeof(this._props.align));     
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
}

export = Link;