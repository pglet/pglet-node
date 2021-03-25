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
    tabs: Tab[]
}

class Tab extends Control{
    private _childControls: Control[] = [];

    constructor(tabProps: TabProperties) {
        super(tabProps);
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
        return this.attrs.get('text')[0];     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get key() {
        return this.attrs.get('key')[0];     
    }
    set key(newKey: string) {
        this.setAttr("key", newKey);
    }
    get icon() {
        return this.attrs.get('icon')[0];     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get count() {
        return this.attrs.get('count')[0];     
    }
    set count(newCount: string) {
        this.setAttr("count", newCount);
    }
}

class Tabs extends Control {
    _tabs: Tab[] = [];

    constructor(tabsProps: TabsProperties) {
        super(tabsProps);
        tabsProps.tabs.forEach(tab => {
            this._tabs.push(tab);
        })
    }

    getControlName() {
        return "tabs";
    }

    protected getChildren(): Control[] {
        return this._tabs;
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get solid() {
        return this.attrs.get('solid')[0];     
    }
    set solid(newSolid: boolean) {
        this.setAttr("solid", newSolid);
    }
}

export {
    Tabs, Tab
}