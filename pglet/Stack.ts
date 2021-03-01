import { ControlProperties, Control } from './Control'


interface StackProperties extends ControlProperties {
    horizontal?: boolean,
    horizontalAlign?: string
    verticalFill?: boolean,
    verticalAlign?: string,
    gap?: string,
    wrap?: string,
}

class Stack extends Control {

    constructor(stackProps: StackProperties) {
        super(stackProps);
    }

    getControlName() {
        return "stack";
    }

    protected getChildren(): Control[] | null {
        return super.getChildren();
    }

    /* accessors */ 
    get horizontal() {
        return this.attrs.horizontal;     
    }
    set horizontal(newHorizontal: boolean) {
        this.attrs.horizontal = newHorizontal;
    }
    get horizontalAlign() {
        return this.attrs.horizontalAlign;     
    }
    set horizontalAlign(newHorizontalAlign: string) {
        this.attrs.horizontalAlign = newHorizontalAlign;
    }
    get verticalFill() {
        return this.attrs.verticalFill;     
    }
    set verticalFill(newVerticalFill: boolean) {
        this.attrs.verticalFill = newVerticalFill;
    }
    get verticalAlign() {
        return this.attrs.verticalAlign;     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.attrs.verticalAlign = newVerticalAlign;
    }
    get gap() {
        return this.attrs.gap;     
    }
    set gap(newGap: string) {
        this.attrs.gap = newGap;
    }
    get wrap() {
        return this.attrs.wrap;     
    }
    set wrap(newWrap: string) {
        this.attrs.wrap = newWrap;
    }
}

export = Stack;