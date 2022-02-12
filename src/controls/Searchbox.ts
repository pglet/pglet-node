import { ControlProperties, Control } from '../Control'

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
    _props: SearchboxProperties
    constructor(searchboxProps: SearchboxProperties) {
        super(searchboxProps);
        this._props = searchboxProps
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
        return this.getAttr('value', typeof(this._props.value));
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get placeholder() {
        return this.getAttr('placeholder', typeof(this._props.placeholder));     
    }
    set placeholder(newPlaceholder: string) {
        this.setAttr("placeholder", newPlaceholder);
    }
    get underlined() {
        return this.getAttr('underlined', typeof(this._props.underlined));     
    }
    set underlined(newUnderlined: boolean) {
        this.setAttr("underlined", newUnderlined);
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
    get data() {
        return this.getAttr('data', typeof(this._props.data));     
    }
    set data(newData: string) {
        this.setAttr("data", newData);
    }
    get triggerOnChange() {
        return this.getAttr('triggerOnChange', typeof(this._props.triggerOnChange));     
    }
    set triggerOnChange(newTriggerOnChange: boolean) {
        this.setAttr("triggerOnChange", newTriggerOnChange);
    }
    get onChange() {
        return this.getEventHandler("change");     
    }
    set onChange(newOnChange: any) {
        this.addEventHandler("change", newOnChange);
    }
    get onSearch() {
        return this.getEventHandler("search");     
    }
    set onSearch(newOnSearch: any) {
        this.addEventHandler("search", newOnSearch);
    }
    get onEscape() {
        return this.getEventHandler("escape");     
    }
    set onEscape(newOnEscape: any) {
        this.addEventHandler("escape", newOnEscape);
    }
    get onClear() {
        return this.getEventHandler("clear");     
    }
    set onClear(newOnClear: any) {
        this.addEventHandler("clear", newOnClear);
    }
}

export = Searchbox;