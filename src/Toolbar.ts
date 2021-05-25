import { ControlProperties, Control } from './Control'

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
class Overflow extends Control{
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
class Far extends Control{
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

class ToolbarItem extends Control{
    private _childControls: Control[] = [];

    constructor(toolbarItemProps: ToolbarItemProperties) {
        super(toolbarItemProps); 
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
        return this.attrs.get('text')[0];     
    }
    set text(newText: string) {
        this.setAttr("text", newText);
    }
    get secondaryText() {
        return this.attrs.get('secondaryText')[0];     
    }
    set secondaryText(newSecondaryText: string) {
        this.setAttr("secondaryText", newSecondaryText);
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
    get iconOnly() {
        return this.attrs.get('iconOnly')[0];     
    }
    set iconOnly(newIconOnly: boolean) {
        this.setAttr("iconOnly", newIconOnly);
    }
    get split() {
        return this.attrs.get('split')[0];     
    }
    set split(newSplit: boolean) {
        this.setAttr("split", newSplit);
    }
    get divider() {
        return this.attrs.get('divider')[0];     
    }
    set divider(newDivider: boolean) {
        this.setAttr("divider", newDivider);
    }
}

class Toolbar extends Control {
    private _items: ToolbarItem[] = [];
    private _overflow: Overflow;
    private _far: Far;

    constructor(toolbarProps: ToolbarProperties) {
        super(toolbarProps);
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
        return this.attrs.get('inverted')[0];     
    }
    set inverted(newInverted: boolean) {
        this.setAttr("inverted", newInverted);
    }
}

export {
    Toolbar, ToolbarItem
};