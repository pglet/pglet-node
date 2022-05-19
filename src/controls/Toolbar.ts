import { ControlProperties, Control } from '../Control'

interface ToolbarItemProperties extends ControlProperties {
    text?: string,
    secondaryText?: string,
    url?: string,
    newWindow?: boolean,
    icon?: string,
    iconColor?: string,
    iconOnly?: boolean,
    split?: boolean,
    divider?: boolean,
    onClick?: any,
    childControls?: Control[];
}

interface ToolbarProperties extends ControlProperties {
    inverted?: boolean,
    items: ToolbarItem[],
    overflow?: ToolbarItem[],
    far?: ToolbarItem[]
}

//internal class
class Overflow extends Control {
    private _overflowItems: ToolbarItem[] = [];

    constructor(props) {
        super(props);
        if (props.items && props.items.length > 0) {
            this._overflowItems.push(...props.items);
        }       
    }

    getControlName() {
        return "overflow";
    }

    /* accessors */ 
    get overflowItems() {
        return this._overflowItems;     
    }
    getChildren() {
        return this._overflowItems;
    }
}

//internal class
class Far extends Control {
    private _farItems: ToolbarItem[] = [];

    constructor(props) {
        super(props);
        if (props.items && props.items.length > 0) {
            this._farItems.push(...props.items);
        }       
    }

    getControlName() {
        return "far";
    }

    /* accessors */ 
    get farItems() {
        return this._farItems;     
    }
    getChildren() {
        return this._farItems;
    }
}

class ToolbarItem extends Control {
    _props: ToolbarItemProperties
    private _childControls: Control[] = [];

    constructor(toolbarItemProps: ToolbarItemProperties) {
        super(toolbarItemProps);
        this._props = toolbarItemProps 
        if (toolbarItemProps.onClick) {
            super.addEventHandler("click", toolbarItemProps.onClick);
        }
        if (toolbarItemProps.childControls && toolbarItemProps.childControls.length > 0) {
            this._childControls.push(...toolbarItemProps.childControls)
        }      
    }

    getControlName() {
        return "item";
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
    get secondaryText() {
        return this.getAttr('secondaryText', typeof(this._props.secondaryText));     
    }
    set secondaryText(newSecondaryText: string) {
        this.setAttr("secondaryText", newSecondaryText);
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
    get iconOnly() {
        return this.getAttr('iconOnly', typeof(this._props.iconOnly));     
    }
    set iconOnly(newIconOnly: boolean) {
        this.setAttr("iconOnly", newIconOnly);
    }
    get split() {
        return this.getAttr('split', typeof(this._props.split));     
    }
    set split(newSplit: boolean) {
        this.setAttr("split", newSplit);
    }
    get divider() {
        return this.getAttr('divider', typeof(this._props.divider));     
    }
    set divider(newDivider: boolean) {
        this.setAttr("divider", newDivider);
    }
    get onClick() {
        return this.getEventHandler("click");     
    }
    set onClick(newOnClick: any) {
        this.addEventHandler("click", newOnClick);
    }
}

class Toolbar extends Control {
    _props: ToolbarProperties
    private _items: ToolbarItem[] = [];
    private _overflow: Overflow;
    private _far: Far;

    constructor(toolbarProps: ToolbarProperties) {
        super(toolbarProps);
        this._props = toolbarProps
        this._overflow = new Overflow({items: toolbarProps.overflow});
        this._far = new Far({items: toolbarProps.far});
        this._items.push(...toolbarProps.items);

    }

    getControlName() {
        return "toolbar";
    }
    protected getChildren(): Control[] {
        return [...this._items, this._far, this._overflow];
    }

    /* accessors */ 
    get inverted() {
        return this.getAttr('inverted', typeof(this._props.inverted));     
    }
    set inverted(newInverted: boolean) {
        this.setAttr("inverted", newInverted);
    }
}

export {
    Toolbar, ToolbarItem
};