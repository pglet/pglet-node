import { ControlProperties, Control } from './Control'

interface TextboxProperties extends ControlProperties {
    value?: string,
    label?: string,
    placeholder?: string,
    errorMessage?: string,
    description?: string,
    multiline?: boolean,
    required?: boolean,
    readonly?: boolean,
    autoAdjustHeight?: boolean,
    borderless?: boolean,
    underlined?: boolean,
    password?: boolean,
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
    get readOnly() {
        return this.attrs.get('readOnly')[0];     
    }
    set readOnly(newReadOnly: boolean) {
        this.setAttr("readOnly", newReadOnly);
    }
    get autoAdjustHeight() {
        return this.attrs.get('autoAdjustHeight')[0];     
    }
    set autoAdjustHeight(newAutoAdjustHeight: boolean) {
        this.setAttr("autoAdjustHeight", newAutoAdjustHeight);
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
    get password() {
        return this.attrs.get('password')[0];     
    }
    set password(newPassword: boolean) {
        this.setAttr("password", newPassword);
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