import { ControlProperties, Control } from './Control'

interface CheckboxProperties extends ControlProperties {
    value?: boolean,
    label?: string,
    boxSide?: string,
    onChange?: any   
}

class Checkbox extends Control {
    constructor(checkboxProps: CheckboxProperties) {
        super(checkboxProps);
        if (checkboxProps.onChange) {
            super.addEventHandler("change", checkboxProps.onChange);
        }
    }

    getControlName() {
        return "checkbox";
    }

    /* accessors */ 
    get value() {
        //return this.attrs.get('value', "boolean")[0]; 
        return this.getAttr('value', 'boolean');
    }
    set value(newValue: boolean) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.attrs.get('label')[0];     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get boxSide() {
        return this.attrs.get('boxSide')[0];     
    }
    set boxSide(newBoxSide: string) {
        this.setAttr("boxSide", newBoxSide);
    }
}

export = Checkbox;