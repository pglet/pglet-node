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
    optionValues?: string[]
}

class Option extends Control{

    constructor(optionProps: OptionProperties) {
        super(optionProps);       
    }

    getControlName() {
        return "option";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get key() {
        return this.attrs.get('key')[0];     
    }
    set key(newKey: string) {
        this.setAttr("key", newKey);
    }
}
class Dropdown extends Control {
    private _options: any = [];

    constructor(dropdownProps: DropdownProperties) {
        super(dropdownProps);
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
                    this._options.push(new Object({key: dropdownProps.optionKeys[i], text: dropdownProps.optionValues[i]}));
                }
            }
        }

    }

    getControlName() {
        return "dropdown";
    }

    protected getChildren(): any[] | null {
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
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
}

export = Dropdown;