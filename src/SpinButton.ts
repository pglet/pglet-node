import { ControlProperties, Control } from './Control'

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
    constructor(spinButtonProps: SpinButtonProperties) {
        super(spinButtonProps);
        if (spinButtonProps.onChange) {
            super.addEventHandler("change", spinButtonProps.onChange);
        }
    }

    getControlName() {
        return "spinButton";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: number) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.attrs.get('label')[0];     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get min() {
        return this.attrs.get('min')[0];     
    }
    set min(newMin: number) {
        this.setAttr("min", newMin);
    }
    get max() {
        return this.attrs.get('min')[0];     
    }
    set max(newMax: number) {
        this.setAttr("max", newMax);
    }
    get step() {
        return this.attrs.get('step')[0];     
    }
    set step(newStep: number) {
        this.setAttr("step", newStep);
    }
    get icon() {
        return this.attrs.get('icon')[0];     
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = SpinButton;