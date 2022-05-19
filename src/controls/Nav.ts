import { ControlProperties, Control } from '../Control'

interface NavItemProperties extends ControlProperties {
    key?: string,
    text?: string,
    icon?: string,
    iconColor?: string,
    url?: string,
    newWindow?: boolean,
    expanded?: boolean,
    items?: NavItem[];
}

interface NavProperties extends ControlProperties {
    value?: string,
    items?: NavItem[],
    onChange?: any,
    onExpand?: any,
    onCollapse?: any
}

class NavItem extends Control {
    _props: NavItemProperties
    private _items: NavItem[] = [];

    constructor(navItemProps: NavItemProperties) {
         super(navItemProps);
        this._props = navItemProps
         if (navItemProps.items && navItemProps.items.length > 0) {
             navItemProps.items.forEach(item => {
                 this.addItems(item);
             })
         }  
    }

    getControlName() {
        return "item";
    }
    get items() {
        return this._items;
    }
    addItems(item: NavItem) {
        this._items.push(item);
    }
    getChildren() {
        return this._items;
    }

    /* accessors */
    get key() {
        return this.getAttr('key', typeof(this._props.key));     
    }
    set key(newKey: string) {
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
    get url() {
        return this.getAttr('url', typeof(this._props.url));     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get newWindow() {
        return this.getAttr('newWindow', typeof(this._props.newWindow));     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
    get expanded() {
        return this.getAttr('expanded', typeof(this._props.expanded));     
    }
    set expanded(newExpanded: boolean) {
        this.setAttr("expanded", newExpanded);
    }  
}

class Nav extends Control {
    _props: NavProperties
    private _items: NavItem[] = [];
    
    constructor(navProps: NavProperties) {
        super(navProps);
        this._props = navProps
        if (navProps.items && navProps.items.length > 0) {
            navProps.items.forEach(nav => {
                this.addItems(nav);
            })
        }  
        if (navProps.onChange) {
            super.addEventHandler("change", navProps.onChange);
        }
        if (navProps.onExpand) {
            super.addEventHandler("expand", navProps.onExpand)
        }
        if (navProps.onCollapse) {
            super.addEventHandler("collapse", navProps.onCollapse);
        }
    }

    getControlName() {
        return "nav";
    }
    addItems(item: NavItem) {
        this._items.push(item);
    }
    getChildren() {
        return this._items;
    }

    /* accessors */ 
    get items() {
        return this._items;
    }
    set items(newItems: NavItem[]) {
        this._items = newItems;
    }
    get value() {
        return this.getAttr('value', typeof(this._props.value));     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }
    get onChange() {
        return this.getEventHandler("change");     
    }
    set onChange(newOnChange: any) {
        this.addEventHandler("change", newOnChange);
    }
    get onExpand() {
        return this.getEventHandler("expand");     
    }
    set onExpand(newOnExpand: any) {
        this.addEventHandler("expand", newOnExpand);
    }
    get onCollapse() {
        return this.getEventHandler("collapse");     
    }
    set onCollapse(newOnCollapse: any) {
        this.addEventHandler("collapse", newOnCollapse);
    }
}

export {
    Nav, NavItem
};