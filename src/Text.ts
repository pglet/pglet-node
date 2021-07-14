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
    _props: TextProperties
    constructor(textProps: TextProperties) {
        super(textProps);
        this._props = textProps
    }

    getControlName() {
        return "text";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
        // return this.getAttr('value');
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get align() {
        return this.getAttr('align', typeof(this._props.align));     
        // return this.getAttr('align');;
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
    get size() {
        return this.getAttr('size', typeof(this._props.size));     
        // return this.getAttr('size');
    }
    set size(newSize: string) {
        this.setAttr("size", newSize);
    }
    get verticalAlign() {
        return this.getAttr('verticalAlign', typeof(this._props.verticalAlign));     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get markdown() {
        return this.getAttr('markdown', typeof(this._props.markdown));     
    }
    set markdown(newMarkdown: boolean) {
        this.setAttr("markdown", newMarkdown);
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
        this.setAttr("pre", newPre);
    }
    get nowrap() {
        return this.getAttr('nowrap', typeof(this._props.nowrap));     
    }
    set nowrap(newNowrap: boolean) {
        this.setAttr("nowrap", newNowrap);
    }
    get block() {
        return this.getAttr('block', typeof(this._props.block));     
    }
    set block(newBlock: boolean) {
        this.setAttr("block", newBlock);
    }
    get bgcolor() {
        return this.getAttr('bgcolor', typeof(this._props.bgcolor));     
    }
    set bgcolor(newBgcolor: string) {
        this.setAttr("bgcolor", newBgcolor);
    }
    get color() {
        return this.getAttr('color', typeof(this._props.color));     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get border() {
        return this.getAttr('border', typeof(this._props.border));     
    }
    set border(newBorder: number) {
        this.setAttr("border", newBorder);
    }
    get borderStyle() {
        return this.getAttr('borderStyle', typeof(this._props.borderStyle));     
    }
    set borderStyle(newBorderStyle: string) {
        this.setAttr("borderStyle", newBorderStyle);
    }
    get borderWidth() {
        return this.getAttr('borderWidth', typeof(this._props.borderWidth));     
    }
    set borderWidth(newBorderWidth: string) {
        this.setAttr("borderWidth", newBorderWidth);
    }
    get borderColor() {
        return this.getAttr('borderColor', typeof(this._props.borderColor));     
    }
    set borderColor(newBorderColor: number) {
        this.setAttr("borderColor", newBorderColor);
    }
    get borderRadius() {
        return this.getAttr('borderRadius', typeof(this._props.borderRadius));     
    }
    set borderRadius(newBorderRadius: string) {
        this.setAttr("borderRadius", newBorderRadius);
    }
    get borderLeft() {
        return this.getAttr('borderLeft', typeof(this._props.borderLeft));     
    }
    set borderLeft(newBorderLeft: string) {
        this.setAttr("borderLeft", newBorderLeft);
    }
    get borderRight() {
        return this.getAttr('borderRight', typeof(this._props.borderRight));     
    }
    set borderRight(newBorderRight: string) {
        this.setAttr("borderRight", newBorderRight);
    }
    get borderTop() {
        return this.getAttr('borderTop', typeof(this._props.borderTop));     
    }
    set borderTop(newBorderTop: string) {
        this.setAttr("borderTop", newBorderTop);
    }
    get borderBottom() {
        return this.getAttr('borderBottom', typeof(this._props.borderBottom));     
    }
    set borderBottom(newBorderBottom: string) {
        this.setAttr("borderBottom", newBorderBottom);
    }  
}

export = Text;