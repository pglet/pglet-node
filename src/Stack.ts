import { ControlProperties, Control } from './Control'

interface StackProperties extends ControlProperties {
    horizontal?: boolean,
    horizontalAlign?: string
    verticalFill?: boolean,
    verticalAlign?: string,
    gap?: string,
    wrap?: string,
    childControls?: Control[],
    onSubmit?: boolean,
    //onSubmitHandler?: any
}

class Stack extends Control {
    private _childControls: Control[] = [];

    constructor(stackProps: StackProperties) {
        super(stackProps);
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
        return this.attrs.get('horizontal')[0];     
    }
    set horizontal(newHorizontal: boolean) {
        this.setAttr("horizontal", newHorizontal);
    }
    get horizontalAlign() {
        return this.attrs.get('horizontalAlign')[0];     
    }
    set horizontalAlign(newHorizontalAlign: string) {
        this.setAttr("horizontalAlign", newHorizontalAlign);
    }
    get verticalFill() {
        return this.attrs.get('verticalFill')[0];     
    }
    set verticalFill(newVerticalFill: boolean) {
        this.setAttr("verticalFill", newVerticalFill);
    }
    get verticalAlign() {
        return this.attrs.get('verticalAlign')[0];     
    }
    set verticalAlign(newVerticalAlign: string) {
        this.setAttr("verticalAlign", newVerticalAlign);
    }
    get gap() {
        return this.attrs.get('gap')[0];     
    }
    set gap(newGap: string) {
        this.setAttr("gap", newGap);
    }
    get wrap() {
        return this.attrs.get('wrap')[0];     
    }
    set wrap(newWrap: string) {
        this.setAttr("wrap", newWrap);
    }
    get onSubmit() {
        return this.attrs.get('onSubmit')[0];     
    }
    set onSubmit(newOnSubmit: boolean) {
        this.setAttr("onSubmit", newOnSubmit);
    }
}

export = Stack;