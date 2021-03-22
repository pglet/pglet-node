import { ControlProperties, Control } from './Control'


interface ToggleProperties extends ControlProperties {
    value?: boolean,
    label?: string,
    inline?: boolean,
    onText?: string, 
    offText?: string,
    data?: string,
    onChange?: any 
}

class Toggle extends Control {

    constructor(toggleProps: ToggleProperties) {
        super(toggleProps);
        if (toggleProps.onChange) {
            super.addEventHandler("change", toggleProps.onChange);
        }
    }

    getControlName() {
        return "toggle";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
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
    get inline() {
        return this.attrs.get('inline')[0];     
    }
    set inline(newInline: boolean) {
        this.setAttr("inline", newInline);
    }
    get onText() {
        return this.attrs.get('onText')[0];     
    }
    set onText(newOnText: string) {
        this.setAttr("onText", newOnText);
    }
    get offText() {
        return this.attrs.get('offText')[0];     
    }
    set offText(newOffText: string) {
        this.setAttr("offText", newOffText);
    }
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Toggle;