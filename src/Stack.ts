import { ControlProperties, Control } from './Control'

interface StackProperties extends ControlProperties {
    horizontal?: boolean,
    horizontalAlign?: string
    verticalFill?: boolean,
    verticalAlign?: string,
    minWidth?: string,
    maxWidth?: string,
    minHeight?: string,
    maxHeight?: string,
    gap?: string,
    wrap?: string,
    bgcolor?: string,
    border?: string,
    borderRadius?: string,
    borderLeft?: string,
    borderRight?: string,
    borderTop?: string,
    borderBottom?: string,
    scrollx?: boolean,
    scrolly?: boolean,
    childControls?: Control[],
    onSubmit?: boolean,
}

class Stack extends Control {
    _props: StackProperties
    private _childControls: Control[] = [];

    constructor(stackProps: StackProperties) {
        super(stackProps);
        this._props = stackProps
        if (stackProps.childControls && stackProps.childControls.length > 0) {
            this._childControls.push(...stackProps.childControls)
        }
    }

    getControlName() {
        return "stack";
    }
    protected getChildren(): Control[] {
        return this._childControls;
    }

    /* accessors */ 
    get childControls() {
        return this._childControls;
    }
    set childControls(ctrl: Control[]) {
        this._childControls.push(...ctrl);
    }
    get horizontal() {
        return this.getAttr('horizontal', typeof(this._props.horizontal));     
    }
    set horizontal(newHorizontal: boolean) {
        this.setAttr("horizontal", newHorizontal);
    }
    get horizontalAlign() {
        return this.getAttr('horizontalAlign', typeof(this._props.horizontalAlign));     
    }
    set horizontalAlign(newHorizontalAlign: string) {
        this.setAttr("horizontalAlign", newHorizontalAlign);
    }
    get verticalFill() {
        return this.getAttr('verticalFill', typeof(this._props.verticalFill));     
    }
    set verticalFill(newVerticalFill: boolean) {
        this.setAttr("verticalFill", newVerticalFill);
    }
    get verticalAlign() {
        return this.getAttr('verticalAlign', typeof(this._props.verticalAlign));     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get minWidth() {
        return this.getAttr('minWidth', typeof(this._props.minWidth));     
    }
    set minWidth(newMinWidth: string) {
        this.setAttr("minWidth", newMinWidth);
    }
    get maxWidth() {
        return this.getAttr('maxWidth', typeof(this._props.maxWidth));     
    }
    set maxWidth(newMaxWidth: string) {
        this.setAttr("maxWidth", newMaxWidth);
    }
    get minHeight() {
        return this.getAttr('minHeight', typeof(this._props.minHeight));     
    }
    set minHeight(newMinHeight: string) {
        this.setAttr("minHeight", newMinHeight);
    }
    get maxHeight() {
        return this.getAttr('maxHeight', typeof(this._props.maxHeight));     
    }
    set maxHeight(newMaxHeight: string) {
        this.setAttr("maxHeight", newMaxHeight);
    }
    get gap() {
        return this.getAttr('gap', typeof(this._props.gap));     
    }
    set gap(newGap: string) {
        this.setAttr("gap", newGap);
    }
    get wrap() {
        return this.getAttr('wrap', typeof(this._props.wrap));     
    }
    set wrap(newWrap: string) {
        this.setAttr("wrap", newWrap);
    }
    get bgcolor() {
        return this.getAttr('bgcolor', typeof(this._props.bgcolor));     
    }
    set bgcolor(newBgcolor: string) {
        this.setAttr("bgcolor", newBgcolor);
    }
    get border() {
        return this.getAttr('border', typeof(this._props.border));     
    }
    set border(newBorder: string) {
        this.setAttr("border", newBorder);
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
    get scrollx() {
        return this.getAttr('scrollx', typeof(this._props.scrollx));     
    }
    set scrollx(newScrollx: boolean) {
        this.setAttr("scrollx", newScrollx);
    }
    get scrolly() {
        return this.getAttr('scrolly', typeof(this._props.scrolly));     
    }
    set scrolly(newScrolly: boolean) {
        this.setAttr("scrolly", newScrolly);
    }
    get onSubmit() {
        return this.getAttr('onSubmit', typeof(this._props.onSubmit));     
    }
    set onSubmit(newOnSubmit: boolean) {
        this.setAttr("onSubmit", newOnSubmit);
    }
}

export = Stack;