import { ControlProperties, Control } from './Control'

interface ToggleProperties extends ControlProperties {
    value?: boolean,
    label?: string,
    inline?: boolean,
    onText?: string, 
    offText?: string,
    data?: string,
    onChange?: any 
}

class Toggle extends Control {
    _props: ToggleProperties
    constructor(toggleProps: ToggleProperties) {
        super(toggleProps);
        this._props = toggleProps
        if (toggleProps.onChange) {
            super.addEventHandler("change", toggleProps.onChange);
        }
    }

    getControlName() {
        return "toggle";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: boolean) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.getAttr('label', typeof(this._props.label));     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get inline() {
        return this.getAttr('inline', typeof(this._props.inline));     
    }
    set inline(newInline: boolean) {
        this.setAttr("inline", newInline);
    }
    get onText() {
        return this.getAttr('onText', typeof(this._props.onText));     
    }
    set onText(newOnText: string) {
        this.setAttr("onText", newOnText);
    }
    get offText() {
        return this.getAttr('offText', typeof(this._props.offText));     
    }
    set offText(newOffText: string) {
        this.setAttr("offText", newOffText);
    }
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get onChange() {
        return this.getEventHandler("change");     
    }
    set onChange(newOnChange: any) {
        this.addEventHandler("change", newOnChange);
    }
}

export = Toggle;