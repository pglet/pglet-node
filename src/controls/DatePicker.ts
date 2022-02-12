import { ControlProperties, Control } from '../Control'

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
    _props: DatePickerProperties
    constructor(datePickerProps: DatePickerProperties) {
        super(datePickerProps);
        this._props = datePickerProps
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
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: Date) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.getAttr('label', typeof(this._props.label));     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get placeholder() {
        return this.getAttr('placeholder', typeof(this._props.placeholder));     
    }
    set placeholder(newPlaceholder: string) {
        this.setAttr("placeholder", newPlaceholder);
    }
    get required() {
        return this.getAttr('required', typeof(this._props.required));     
    }
    set required(newRequired: boolean) {
        this.setAttr("required", newRequired);
    }
    get allowTextInput() {
        return this.getAttr('allowTextInput', typeof(this._props.allowTextInput));     
    }
    set allowTextInput(newAllowTextInput: boolean) {
        this.setAttr("allowTextInput", newAllowTextInput);
    }
    get borderless() {
        return this.getAttr('borderless', typeof(this._props.borderless));     
    }
    set borderless(newBorderless: boolean) {
        this.setAttr("borderless", newBorderless);
    }
    get underlined() {
        return this.getAttr('underlined', typeof(this._props.underlined));     
    }
    set underlined(newUnderlined: boolean) {
        this.setAttr("underlined", newUnderlined);
    }
    get onChange() {
        return this.getEventHandler("change");     
    }
    set onChange(newOnChange: any) {
        this.addEventHandler("change", newOnChange);
    }
}

export = DatePicker;