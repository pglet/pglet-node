import { ControlProperties, Control } from './Control'


interface DatePickerProperties extends ControlProperties {
    value?: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    allowTextInput?: boolean,
    borderless?: boolean,
    underlined?: boolean,
    onChange?: any
}

class DatePicker extends Control {

    constructor(datePickerProps: DatePickerProperties) {
        super(datePickerProps);
        if (datePickerProps.onChange) {
            super.addEventHandler("change", datePickerProps.onChange);
        }
        if (datePickerProps.value) {
            this.value = new Date(datePickerProps.value);
        }

    }

    getControlName() {
        return "datepicker";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: Date) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.attrs.get('label')[0];     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get placeholder() {
        return this.attrs.get('placeholder')[0];     
    }
    set placeholder(newPlaceholder: string) {
        this.setAttr("placeholder", newPlaceholder);
    }
    get required() {
        return this.attrs.get('required')[0];     
    }
    set required(newRequired: boolean) {
        this.setAttr("required", newRequired);
    }
    get allowTextInput() {
        return this.attrs.get('allowTextInput')[0];     
    }
    set allowTextInput(newAllowTextInput: boolean) {
        this.setAttr("allowTextInput", newAllowTextInput);
    }
    get borderless() {
        return this.attrs.get('borderless')[0];     
    }
    set borderless(newBorderless: boolean) {
        this.setAttr("borderless", newBorderless);
    }
    get underlined() {
        return this.attrs.get('underlined')[0];     
    }
    set underlined(newUnderlined: boolean) {
        this.setAttr("underlined", newUnderlined);
    }
}

export = DatePicker;