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
        return this.attrs.value;     
    }
    set value(newValue: string) {
        this.attrs.value = newValue;
    }
    get key() {
        return this.attrs.key;     
    }
    set key(newKey: string) {
        this.attrs.key = newKey;
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
        return this.attrs.value;     
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
    get data() {
        return this.attrs.data;     
    }
    set data(newData: string) {
        this.attrs.data = newData;
    }
}

export = Dropdown;