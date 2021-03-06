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
        return this.attrs.value[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.attrs.label[0];     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get placeholder() {
        return this.attrs.placeholder[0];     
    }
    set placeholder(newPlaceholder: string) {
        this.setAttr("placeholder", newPlaceholder);
    }
    get errorMessage() {
        return this.attrs.errorMessage[0];     
    }
    set errorMessage(newErrorMessage: string) {
        this.setAttr("errorMessage", newErrorMessage);
    }
    get description() {
        return this.attrs.description[0];     
    }
    set description(newDescription: string) {
        this.setAttr("description", newDescription);
    }
    get multiline() {
        return this.attrs.multiline[0];     
    }
    set multiline(newMultiline: boolean) {
        this.setAttr("multiline", newMultiline);
    }
    get required() {
        return this.attrs.required[0];     
    }
    set required(newRequired: boolean) {
        this.setAttr("required", newRequired);
    }
    get passwordMask() {
        return this.attrs.passwordMask[0];     
    }
    set passwordMask(newPasswordMask: boolean) {
        this.setAttr("password", newPasswordMask);
    }
    get align() {
        return this.attrs.align[0];     
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
}

export = Textbox;