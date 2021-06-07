import { ControlProperties, Control } from './Control'

interface OptionProperties extends ControlProperties {
    text: string,
    key: string  
}

interface DropdownProperties extends ControlProperties {
    value?: string,
    label?: string
    placeholder?: string,
    errorMessage?: string,
    data?: string,
    optionKeys?: string[],
    optionValues?: string[],
    onChange: any
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
    get text() {
        return this.getAttr('text', typeof(this._props.text));     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get key() {
        return this.getAttr('key', typeof(this._props.key));     
    }
    set key(newKey: string) {
        this.setAttr("key", newKey);
    }
}

class Dropdown extends Control {
    _props: DropdownProperties
    private _options: Option[] = [];

    constructor(dropdownProps: DropdownProperties) {
        super(dropdownProps);
        this._props = dropdownProps
        if (dropdownProps.optionKeys || dropdownProps.optionValues) {
            if (!dropdownProps.optionKeys) {
                for (let i = 0; i < dropdownProps.optionValues.length; i++) {
                    this._options.push(new Option({key: `key${i}`, text: dropdownProps.optionValues[i]}));
                }
            } 
            else if (!dropdownProps.optionValues) {
                for (let i = 0; i < dropdownProps.optionKeys.length; i++) {
                    this._options.push(new Option({key: `key${i}`, text: dropdownProps.optionKeys[i]}));
                }
            }
            else {
                for (let i = 0; i < dropdownProps.optionValues.length; i++) {
                    this._options.push(new Option({key: dropdownProps.optionKeys[i], text: dropdownProps.optionValues[i]}));
                }
            }
        }
        if (dropdownProps.onChange) {
            super.addEventHandler("change", dropdownProps.onChange);
        }
    }

    getControlName() {
        return "dropdown";
    }
    protected getChildren(): any[] {
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
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get onChange() {
        return this.getEventHandler("change");     
    }
    set onChange(newOnChange: any) {
        this.addEventHandler("change", newOnChange);
    }
}

export = Dropdown;