import { ControlProperties, Control } from './Control'

interface TextboxProperties extends ControlProperties {
    value?: string,
    label?: string,
    placeholder?: string,
    errorMessage?: string,
    description?: string,
    multiline?: boolean,
    required?: boolean,
    readOnly?: boolean,
    autoAdjustHeight?: boolean,
    borderless?: boolean,
    underlined?: boolean,
    password?: boolean,
    align?: string
    onchange?: boolean,
    onChangeHandler?: any
}

class Textbox extends Control {
    _props: TextboxProperties;
    constructor(textboxProps: TextboxProperties) {
        super(textboxProps);
        //this._props = textboxProps;
        if (textboxProps.onChangeHandler) {
            super.addEventHandler("change", textboxProps.onChangeHandler);
        }
    }

    getControlName() {
        return "textbox";
    }

    /* accessors */ 
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get label() {
        //return this.getAttr('label', typeof(this._props.label));
        return this.getAttr('label', typeof(this._props.multiline))    
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
    get errorMessage() {
        return this.getAttr('errorMessage', typeof(this._props.errorMessage));     
    }
    set errorMessage(newErrorMessage: string) {
        this.setAttr("errorMessage", newErrorMessage);
    }
    get description() {
        return this.getAttr('description', typeof(this._props.description));     
    }
    set description(newDescription: string) {
        this.setAttr("description", newDescription);
    }
    get multiline() {
        return this.getAttr('multiline', typeof(this._props.multiline));     
    }
    set multiline(newMultiline: boolean) {
        this.setAttr("multiline", newMultiline);
    }
    get required() {
        return this.getAttr('required', typeof(this._props.required));     
    }
    set required(newRequired: boolean) {
        this.setAttr("required", newRequired);
    }
    get readOnly() {
        return this.getAttr('readOnly', typeof(this._props.readOnly));     
    }
    set readOnly(newReadOnly: boolean) {
        this.setAttr("readOnly", newReadOnly);
    }
    get autoAdjustHeight() {
        return this.getAttr('autoAdjustHeight', typeof(this._props.autoAdjustHeight));     
    }
    set autoAdjustHeight(newAutoAdjustHeight: boolean) {
        this.setAttr("autoAdjustHeight", newAutoAdjustHeight);
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
    get password() {
        return this.getAttr('password', typeof(this._props.password));     
    }
    set password(newPassword: boolean) {
        this.setAttr("password", newPassword);
    }
    get align() {
        return this.getAttr('align', typeof(this._props.align));     
    }
    set align(newAlign: string) {
        this.setAttr("align", newAlign);
    }
    get onChange() {
        return this.getAttr('onchange', typeof(this._props.onchange));     
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