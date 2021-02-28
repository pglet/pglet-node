import { ControlProperties, Control } from './Control'


interface TextboxProperties extends ControlProperties {
    value: string,
    label?: string,
    placeholder?: string,
    errorMessage?: string,
    description?: string,
    multiline?: boolean,
    required?: boolean,
    passwordMask?: boolean,
    align?: string
}

class Textbox extends Control {

    constructor(textboxProps: TextboxProperties) {
        super(textboxProps);
    }

    getControlName() {
        return "textbox";
    }

    /* accessors */ 
    get value() {
        return this.attrs.id;     
    }
    set value(newValue: string) {
        this.attrs.value = newValue;
    }
    get label() {
        return this.attrs.label;     
    }
    set label(newLabel: string) {
        this.attrs.label = newLabel;
    }
    get placeholder() {
        return this.attrs.placeholder;     
    }
    set placeholder(newPlaceholder: string) {
        this.attrs.placeholder = newPlaceholder;
    }
    get errorMessage() {
        return this.attrs.errorMessage;     
    }
    set errorMessage(newErrorMessage: string) {
        this.attrs.errorMessage = newErrorMessage;
    }
    get description() {
        return this.attrs.description;     
    }
    set description(newDescription: string) {
        this.attrs.description = newDescription;
    }
    get multiline() {
        return this.attrs.multiline;     
    }
    set multiline(newMultiline: boolean) {
        this.attrs.multiline = newMultiline;
    }
    get required() {
        return this.attrs.required;     
    }
    set required(newRequired: boolean) {
        this.attrs.required = newRequired;
    }
    get passwordMask() {
        return this.attrs.passwordMask;     
    }
    set passwordMask(newPasswordMask: boolean) {
        this.attrs.password = newPasswordMask;
    }
    get align() {
        return this.attrs.align;     
    }
    set align(newAlign: string) {
        this.attrs.align = newAlign;
    }

}

export = Textbox;