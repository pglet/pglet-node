import { ControlProperties, Control } from './Control'


interface TextboxProperties extends ControlProperties {
    value?: string,
    label?: string,
    placeholder?: string,
    errorMessage?: string,
    description?: string,
    multiline?: boolean,
    required?: boolean,
    passwordMask?: boolean,
    align?: string
    onchange?: boolean,
    onChangeHandler?: any
}

class Textbox extends Control {

    constructor(textboxProps: TextboxProperties) {
        super(textboxProps);
        if (textboxProps.onChangeHandler) {
            super.addEventHandler("change", textboxProps.onChangeHandler);
        }
    }

    getControlName() {
        return "textbox";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: string) {
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
    get errorMessage() {
        return this.attrs.get('errorMessage')[0];     
    }
    set errorMessage(newErrorMessage: string) {
        this.setAttr("errorMessage", newErrorMessage);
    }
    get description() {
        return this.attrs.get('description')[0];     
    }
    set description(newDescription: string) {
        this.setAttr("description", newDescription);
    }
    get multiline() {
        return this.attrs.get('multiline')[0];     
    }
    set multiline(newMultiline: boolean) {
        this.setAttr("multiline", newMultiline);
    }
    get required() {
        return this.attrs.get('required')[0];     
    }
    set required(newRequired: boolean) {
        this.setAttr("required", newRequired);
    }
    get passwordMask() {
        return this.attrs.get('passwordMask')[0];     
    }
    set passwordMask(newPasswordMask: boolean) {
        this.setAttr("password", newPasswordMask);
    }
    get align() {
        return this.attrs.get('align')[0];     
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
    get onChange() {
        return this.attrs.get('onchange')[0];     
    }
    set onChange(newOnChange: boolean) {
        this.setAttr("onchange", newOnChange);
    }
    get onChangeHandler() {
        return this.getEventHandler('onChangeHandler');     
    }
    set onChangeHandler(newOnChangeHandler: any) {
        this.addEventHandler ("onChangeHandler", newOnChangeHandler);
        
    }
}

export = Textbox;