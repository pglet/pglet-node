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

    constructor(linkProps: LinkProperties) {
        super(linkProps);
    }

    getControlName() {
        return "link";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get url() {
        return this.attrs.get('url')[0];     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get newWindow() {
        return this.attrs.get('newWindow')[0];     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
    get title() {
        return this.attrs.get('title')[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get size() {
        return this.attrs.get('size')[0];     
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
    get bold() {
        return this.attrs.get('bold')[0];     
    }
    set bold(newBold: boolean) {
        this.setAttr("bold", newBold);
    }
    get italic() {
        return this.attrs.get('italic')[0];     
    }
    set italic(newItalic: boolean) {
        this.setAttr("italic", newItalic);
    }
    get pre() {
        return this.attrs.get('pre')[0];     
    }
    set pre(newPre: boolean) {
        this.setAttr("password", newPre);
    }
    get align() {
        return this.attrs.get('align')[0];     
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
}

export = Link;