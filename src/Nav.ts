import { ControlProperties, Control } from './Control'

interface ItemProperties extends ControlProperties {
    key?: string,
    text?: string,
    icon?: string,
    iconColor?: string,
    url?: string,
    newWindow?: boolean,
    expanded?: boolean,
    items?: Item[];
}

interface NavProperties extends ControlProperties {
    value?: string,
    items?: Item[],
    onChange?: any,
    onExpand?: any,
    onCollapse?: any
}

class Item extends Control{
    private _items: Item[] = [];

    constructor(itemProps: ItemProperties) {
         super(itemProps);
         if (itemProps.items && itemProps.items.length > 0) {
             itemProps.items.forEach(item => {
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
    addItems(item: Item) {
        this._items.push(item);
    }
    getChildren() {
        return this._items;
    }

    /* accessors */
    get key() {
        return this.attrs.get('key')[0];     
    }
    set key(newKey: string) {
        this.setAttr("key", newKey);
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
    get url() {
        return this.attrs.get('url')[0];     
    }
    set url(newUrl: string) {
        this.setAttr("url", newUrl);
    }
    get newWindow() {
        return this.attrs.get('newWindow')[0];     
    }
    set newWindow(newNewWindow: boolean) {
        this.setAttr("newWindow", newNewWindow);
    }
    get expanded() {
        return this.attrs.get('expanded')[0];     
    }
    set expanded(newExpanded: boolean) {
        this.setAttr("expanded", newExpanded);
    }
    

}

class Nav extends Control {
    private _items: Item[] = [];
    constructor(navProps: NavProperties) {
        super(navProps);
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
    get items() {
        return this._items;
    }
    addItems(item: Item) {
        this._items.push(item);
    }
    getChildren() {
        return this._items;
    }

    /* accessors */ 
    get value() {
        return this.attrs.get('value')[0];     
    }
    set value(newValue: string) {
        this.setAttr("value", newValue);
    }

}

export {
    Nav, Item
};