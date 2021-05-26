import { ControlProperties, Control } from './Control'

interface TextProperties extends ControlProperties {
    value: string,
    align?: string,
    size?: string,
    verticalAlign?: string,
    markdown?: boolean,
    bold?: boolean,
    italic?: boolean,
    pre?: boolean,
    nowrap?: boolean,
    block?: boolean,
    bgcolor?: string,
    color?: string,
    border?: string,
    borderStyle?: string,
    borderWidth?: string,
    borderColor?: string,
    borderRadius?: string,
    borderLeft?: string,
    borderRight?: string,
    borderTop?: string,
    borderBottom?: string
}

class Text extends Control {

    constructor(textProps: TextProperties) {
        super(textProps);
    }

    getControlName() {
        return "text";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
        // return this.getAttr('value');
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get align() {
        return this.attrs.get('align')[0];     
        // return this.getAttr('align');;
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
    get size() {
        return this.attrs.get('size')[0];     
        // return this.getAttr('size');
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
    get verticalAlign() {
        return this.attrs.get('verticalAlign')[0];     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get markdown() {
        return this.attrs.get('markdown')[0];     
    }
    set markdown(newMarkdown: boolean) {
        this.setAttr("markdown", newMarkdown);
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
        this.setAttr("pre", newPre);
    }
    get nowrap() {
        return this.attrs.get('nowrap')[0];     
    }
    set nowrap(newNowrap: boolean) {
        this.setAttr("nowrap", newNowrap);
    }
    get block() {
        return this.attrs.get('block')[0];     
    }
    set block(newBlock: boolean) {
        this.setAttr("block", newBlock);
    }
    get bgcolor() {
        return this.attrs.get('bgcolor')[0];     
    }
    set bgcolor(newBgcolor: string) {
        this.setAttr("bgcolor", newBgcolor);
    }
    get color() {
        return this.attrs.get('color')[0];     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get border() {
        return this.attrs.get('border')[0];     
    }
    set border(newBorder: number) {
        this.setAttr("border", newBorder);
    }
    get borderStyle() {
        return this.attrs.get('borderStyle')[0];     
    }
    set borderStyle(newBorderStyle: string) {
        this.setAttr("borderStyle", newBorderStyle);
    }
    get borderWidth() {
        return this.attrs.get('borderWidth')[0];     
    }
    set borderWidth(newBorderWidth: string) {
        this.setAttr("borderWidth", newBorderWidth);
    }
    get borderColor() {
        return this.attrs.get('borderColor')[0];     
    }
    set borderColor(newBorderColor: number) {
        this.setAttr("borderColor", newBorderColor);
    }
    get borderRadius() {
        return this.attrs.get('borderRadius')[0];     
    }
    set borderRadius(newBorderRadius: string) {
        this.setAttr("borderRadius", newBorderRadius);
    }
    get borderLeft() {
        return this.attrs.get('borderLeft')[0];     
    }
    set borderLeft(newBorderLeft: string) {
        this.setAttr("borderLeft", newBorderLeft);
    }
    get borderRight() {
        return this.attrs.get('borderRight')[0];     
    }
    set borderRight(newBorderRight: string) {
        this.setAttr("borderRight", newBorderRight);
    }
    get borderTop() {
        return this.attrs.get('borderTop')[0];     
    }
    set borderTop(newBorderTop: string) {
        this.setAttr("borderTop", newBorderTop);
    }
    get borderBottom() {
        return this.attrs.get('borderBottom')[0];     
    }
    set borderBottom(newBorderBottom: string) {
        this.setAttr("borderBottom", newBorderBottom);
    }
    
}

export = Text;