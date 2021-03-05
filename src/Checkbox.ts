import { ControlProperties, Control } from './Control'


interface CheckboxProperties extends ControlProperties {
    value?: boolean,
    label?: string,
    boxSide?: string,   
}

class Checkbox extends Control {

    constructor(checkboxProps: CheckboxProperties) {
        super(checkboxProps);
    }

    getControlName() {
        return "checkbox";
    }

    /* accessors */ 
    get value() {
        return this.attrs.value;     
    }
    set value(newValue: boolean) {
        this.attrs.value = newValue;
    }
    get label() {
        return this.attrs.label;     
    }
    set label(newLabel: string) {
        this.attrs.label = newLabel;
    }
    get boxSide() {
        return this.attrs.boxSide;     
    }
    set boxSide(newBoxSide: string) {
        this.attrs.boxSide = newBoxSide;
    }
}

export = Checkbox;