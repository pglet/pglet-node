import { ControlProperties, Control } from './Control'

interface OptionProperties extends ControlProperties {
    key?: string,
    text?: string,
    icon?: string,
    iconColor?: string,
}

interface ChoiceGroupProperties extends ControlProperties {
    value?: string,
    label?: string,
    data?: string,
    onChange?: any,
    options?: Option[]
}

class Option extends Control {

    constructor(optionProps: OptionProperties) {
        super(optionProps);
    }

    getControlName() {
        return "option";
    }

    /* accessors */ 
    get action() {
        return this.attrs.get('action')[0];     
    }
    set action(newAction: string) {
        this.setAttr("action", newAction);
    }
    get text() {
        return this.attrs.get('text')[0];     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get icon() {
        return this.attrs.get('icon')[0];     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.attrs.get('iconColor')[0];     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
}

class ChoiceGroup extends Control{
    private _options: Option[] = [];

    constructor(choiceGroupProps: ChoiceGroupProperties) {
        super(choiceGroupProps);
        if (choiceGroupProps.onChange) {
            super.addEventHandler("change", choiceGroupProps.onChange);
        }
        this._options.push(...choiceGroupProps.options)
    }

    getControlName() {
        return "choicegroup";
    }

    protected getChildren(): Control[] {
        return this._options;
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
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}



export {
    Option, ChoiceGroup
}