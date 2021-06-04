import { ControlProperties, Control } from './Control'

interface TabProperties extends ControlProperties {
    text?: string,
    key?: string,
    icon?: string,
    count?: string,
    childControls?: Control[]
}

interface TabsProperties extends ControlProperties {
    value?: string,
    solid?: boolean,
    tabs: Tab[],
    onChange?: any
}

class Tab extends Control{
    _props: TabProperties
    private _childControls: Control[] = [];

    constructor(tabProps: TabProperties) {
        super(tabProps);
        this._props = tabProps
        if (tabProps.childControls && tabProps.childControls.length > 0) {
            this._childControls.push(...tabProps.childControls);
        }
    }

    getControlName() {
        return "tab";
    }
    protected getChildren(): Control[] {
        return this._childControls;
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
    get icon() {
        return this.getAttr('icon', typeof(this._props.icon));     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get count() {
        return this.getAttr('count', typeof(this._props.count));     
    }
    set count(newCount: string) {
        this.setAttr("count", newCount);
    }
}

class Tabs extends Control {
    _props: TabsProperties
    private _tabs: Tab[] = [];

    constructor(tabsProps: TabsProperties) {
        super(tabsProps);
        this._props = tabsProps
        tabsProps.tabs.forEach(tab => {
            this._tabs.push(tab);
        })
        if (tabsProps.onChange) {
            super.addEventHandler("change", tabsProps.onChange);
        }
    }

    getControlName() {
        return "tabs";
    }
    protected getChildren(): Control[] {
        return this._tabs;
    }

    /* accessors */ 
    get tabs() {
        return this._tabs;
    }
    set tabs(newTabs: Tab[]) {
        this._tabs = newTabs;
    }
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get solid() {
        return this.getAttr('solid', typeof(this._props.solid));     
    }
    set solid(newSolid: boolean) {
        this.setAttr("solid", newSolid);
    }
}

export {
    Tabs, Tab
}