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
    _props: OptionProperties
    constructor(optionProps: OptionProperties) {
        super(optionProps);
        this._props = optionProps
    }

    getControlName() {
        return "option";
    }

    /* accessors */ 
    get action() {
        return this.getAttr('key', typeof(this._props.key));     
    }
    set action(newKey: string) {
        this.setAttr("key", newKey);
    }
    get text() {
        return this.getAttr('text', typeof(this._props.text));     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get icon() {
        return this.getAttr('icon', typeof(this._props.icon));     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconColor() {
        return this.getAttr('iconColor', typeof(this._props.iconColor));     
    }
    set iconColor(newIconColor: string) {
        this.setAttr("iconColor", newIconColor);
    }
}

class ChoiceGroup extends Control {
    _props: ChoiceGroupProperties
    private _options: Option[] = [];

    constructor(choiceGroupProps: ChoiceGroupProperties) {
        super(choiceGroupProps);
        this._props = choiceGroupProps
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
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get label() {
        return this.getAttr('label', typeof(this._props.label));     
    }
    set label(newLabel: string) {
        this.setAttr("label", newLabel);
    }
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}



export {
    Option, ChoiceGroup
}