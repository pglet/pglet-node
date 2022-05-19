import { ControlProperties, Control } from '../Control'

interface CheckboxProperties extends ControlProperties {
    value?: boolean,
    label?: string,
    boxSide?: string,
    onChange?: any   
}

class Checkbox extends Control {
    _props: CheckboxProperties
    constructor(checkboxProps: CheckboxProperties) {
        super(checkboxProps);
        this._props = checkboxProps
        if (checkboxProps.onChange) {
            super.addEventHandler("change", checkboxProps.onChange);
        }
    }

    getControlName() {
        return "checkbox";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value)); 
        //return this.getAttr('value', 'boolean');
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
    get boxSide() {
        return this.getAttr('boxSide', typeof(this._props.boxSide));     
    }
    set boxSide(newBoxSide: string) {
        this.setAttr("boxSide", newBoxSide);
    }
    get onChange() {
        return this.getEventHandler("change");     
    }
    set onChange(newOnChange: any) {
        this.addEventHandler("change", newOnChange);
    }
}

export = Checkbox;