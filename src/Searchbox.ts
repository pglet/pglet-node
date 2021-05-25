import { ControlProperties, Control } from './Control'

interface SearchboxProperties extends ControlProperties {
    value?: string,
    placeholder?: string,
    underlined?: boolean,
    icon?: string,  
    iconColor?: string, 
    data?: string,
    triggerOnChange?: boolean,
    onChange?: any,
    onSearch?: any,
    onEscape?: any,
    onClear?: any
}

class Searchbox extends Control {
    constructor(searchboxProps: SearchboxProperties) {
        super(searchboxProps);
        if (searchboxProps.onChange) {
            super.addEventHandler("change", searchboxProps.onChange);
        }
        if (searchboxProps.onSearch) {
            super.addEventHandler("search", searchboxProps.onSearch);
        }
        if (searchboxProps.onEscape) {
            super.addEventHandler("escape", searchboxProps.onEscape);
        }
        if (searchboxProps.onClear) {
            super.addEventHandler("clear", searchboxProps.onClear);
        }
    }

    getControlName() {
        return "searchbox";
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get placeholder() {
        return this.attrs.get('placeholder')[0];     
    }
    set placeholder(newPlaceholder: string) {
        this.setAttr("placeholder", newPlaceholder);
    }
    get underlined() {
        return this.attrs.get('underlined')[0];     
    }
    set underlined(newUnderlined: boolean) {
        this.setAttr("underlined", newUnderlined);
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
    get data() {
        return this.attrs.get('data')[0];     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get triggerOnChange() {
        return this.attrs.get('triggerOnChange')[0];     
    }
    set triggerOnChange(newTriggerOnChange: boolean) {
        this.setAttr("triggerOnChange", newTriggerOnChange);
    }
}

export = Searchbox;