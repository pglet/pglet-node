import { ControlProperties, Control } from '../Control'

interface SpinButtonProperties extends ControlProperties {
    value?: number,
    label?: string,
    min?: number,
    max?: number,
    step?: number,
    icon?: string,
    data?: string,
    onChange?: any 
}

class SpinButton extends Control {
    _props: SpinButtonProperties
    constructor(spinButtonProps: SpinButtonProperties) {
        super(spinButtonProps);
        this._props = spinButtonProps
        if (spinButtonProps.onChange) {
            super.addEventHandler("change", spinButtonProps.onChange);
        }
    }

    getControlName() {
        return "spinbutton";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: number) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.getAttr('label', typeof(this._props.label));     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get min() {
        return this.getAttr('min', typeof(this._props.min));     
    }
    set min(newMin: number) {
        this.setAttr("min", newMin);
    }
    get max() {
        return this.getAttr('min', typeof(this._props.min));     
    }
    set max(newMax: number) {
        this.setAttr("max", newMax);
    }
    get step() {
        return this.getAttr('step', typeof(this._props.step));     
    }
    set step(newStep: number) {
        this.setAttr("step", newStep);
    }
    get icon() {
        return this.getAttr('icon', typeof(this._props.icon));     
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

export = SpinButton;