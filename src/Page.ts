import { ControlProperties, Control } from './Control'
import { Alignment } from './Alignment';


interface PageProperties extends ControlProperties {
    title?: string,
    verticalFill?: boolean,
    horizontalAlign?: string,
    verticalAlign?: string,
    width?: string,
    gap?: string
}

class Page extends Control {

    constructor(pageProps: PageProperties) {
        pageProps.id = "page";
        super(pageProps);
        if (pageProps.horizontalAlign && !(pageProps.horizontalAlign in Alignment)) {
            throw "horizontalAlign must be of Alignment type"
        }
        if (pageProps.verticalAlign && !(pageProps.verticalAlign in Alignment)) {
            throw "verticalAlign must be of Alignment type"
        }
    }

    getControlName() {
        return "page";
    }

    /* accessors */ 
    get title() {
        return this.attrs.get('title')[0];     
    }
    set title(newTitle: string) {
        this.setAttr("title", newTitle);
    }
    get verticalFill() {
        return this.attrs.get('verticalFill')[0];     
    }
    set verticalFill(newVerticalFill: boolean) {
        this.setAttr("verticalFill", newVerticalFill);
    }
    get horizontalAlign() {
        return this.attrs.get('horizontalAlign')[0];     
    }
    set horizontalAlign(newHorizontalAlign: string) {
        this.setAttr("horizontalAlign", newHorizontalAlign);
    }
    get verticalAlign() {
        return this.attrs.get('verticalAlign')[0];     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get width() {
        return this.attrs.get('width')[0];     
    }
    set width(newWidth: string) {
        this.setAttr("width", newWidth);
    }
    get gap() {
        return this.attrs.get('gap')[0];     
    }
    set gap(newGap: string) {
        this.setAttr("gap", newGap);
    }
}

export = Page;