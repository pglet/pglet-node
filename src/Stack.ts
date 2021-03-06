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
        return this.attrs.horizontal[0];     
    }
    set horizontal(newHorizontal: boolean) {
        this.setAttr("horizontal", newHorizontal);
    }
    get horizontalAlign() {
        return this.attrs.horizontalAlign[0];     
    }
    set horizontalAlign(newHorizontalAlign: string) {
        this.setAttr("horizontalAlign", newHorizontalAlign);
    }
    get verticalFill() {
        return this.attrs.verticalFill[0];     
    }
    set verticalFill(newVerticalFill: boolean) {
        this.setAttr("verticalFill", newVerticalFill);
    }
    get verticalAlign() {
        return this.attrs.verticalAlign[0];     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get gap() {
        return this.attrs.gap[0];     
    }
    set gap(newGap: string) {
        this.setAttr("gap", newGap);
    }
    get wrap() {
        return this.attrs.wrap[0];     
    }
    set wrap(newWrap: string) {
        this.setAttr("wrap", newWrap);
    }
}

export = Stack;