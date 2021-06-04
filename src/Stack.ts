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
    get onSubmit() {
        return this.getAttr('onSubmit', typeof(this._props.onSubmit));     
    }
    set onSubmit(newOnSubmit: boolean) {
        this.setAttr("onSubmit", newOnSubmit);
    }
}

export = Stack;