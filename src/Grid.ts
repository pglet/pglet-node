import { ControlProperties, Control } from './Control'

interface ColumnProperties extends ControlProperties {
    name: string,
    icon?: string,
    iconOnly?: boolean,
    fieldName?: string,
    sortable?: string,
    sortField?: string,
    sorted?: string,
    resizable?: boolean,
    minWidth?: number,
    maxWidth?: number,
    onClick?: boolean,
    childControls?: Control[];
}

interface GridProperties extends ControlProperties {
    selection?: string,
    compact?: boolean,
    headerVisible?: boolean,
    shimmerLines?: number,
    columns: Column[],
    items: any[],
    onSelect?: any,
    onItemInvoke?: any
}

//internal class
class Columns extends Control {
    private _columns: Column[] = [];

    constructor(props) {
        super(props);
        if (props.columns && props.columns.length > 0) {
            props.columns.forEach(column => {
                this.addColumn(column);
            })
        }       
    }

    getControlName() {
        return "columns";
    }
    getChildren() {
        return this._columns;
    }

    /* accessors */ 
    get columns() {
        return this._columns;     
    }
    addColumn(column: Column) {
        this._columns.push(column);
    }

}

class Column extends Control {
    _props: ColumnProperties
    private _childControls: Control[] = [];

    constructor(columnProps: ColumnProperties) {
        super(columnProps);
        this._props = columnProps 
        if (columnProps.childControls && columnProps.childControls.length > 0) {
            this._childControls.push(...columnProps.childControls)
        }      
    }

    getControlName() {
        return "column";
    }
    protected getChildren(): Control[] {
        return this._childControls;
    }

    /* accessors */ 
    get name() {
        return this.getAttr('name', typeof(this._props.name));     
    }
    set name(newName: string) {
        this.setAttr("name", newName);
    }
    get icon() {
        return this.getAttr('icon', typeof(this._props.icon));     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconOnly() {
        return this.getAttr('iconOnly', typeof(this._props.iconOnly));     
    }
    set iconOnly(newIconOnly: boolean) {
        this.setAttr("iconOnly", newIconOnly);
    }
    get fieldName() {
        return this.getAttr('fieldName', typeof(this._props.fieldName));     
    }
    set fieldName(newFieldName: string) {
        this.setAttr("fieldName", newFieldName);
    }
    get sortable() {
        return this.getAttr('sortable', typeof(this._props.sortable));     
    }
    set sortable(newSortable: string) {
        this.setAttr("sortable", newSortable);
    }
    get sortField() {
        return this.getAttr('sortField', typeof(this._props.sortField));     
    }
    set sortField(newSortField: string) {
        this.setAttr("sortField", newSortField);
    }
    get sorted() {
        return this.getAttr('sorted', typeof(this._props.sorted));     
    }
    set sorted(newSorted: string) {
        this.setAttr("sorted", newSorted);
    }
    get resizable() {
        return this.getAttr('resizable', typeof(this._props.resizable));     
    }
    set resizable(newResizable: boolean) {
        this.setAttr("resizable", newResizable);
    }
    get minWidth() {
        return this.getAttr('minWidth', typeof(this._props.minWidth));     
    }
    set minWidth(newMinWidth: number) {
        this.setAttr("minWidth", newMinWidth);
    }
    get maxWidth() {
        return this.getAttr('maxWidth', typeof(this._props.maxWidth));     
    }
    set maxWidth(newMaxWidth: number) {
        this.setAttr("maxWidth", newMaxWidth);
    }
    get onClick() {
        return this.getAttr('onClick', typeof(this._props.onClick));      
    }
    set onClick(newOnClick: boolean) {
        this.setAttr("onClick", newOnClick);     
    }
}

interface ItemObject {
    [key: string]: any
}

//internal class
class Items extends Control {
    private _items: Item[] = [];

    constructor(props) {
        super(props);  
        if (props.items && props.items.length > 0) {
            props.items.forEach(item => {
                this.addItem(item);
            })
        }        
    }

    getControlName() {
        return "items";
    }
    getChildren() {
        return this._items;
    }

    /* accessors */ 
    get items() {
        return this._items;     
    }
    addItem(item: any) {   
        let props: ItemObject = {};
        //let names = Object.getOwnPropertyNames(item);
        //let descriptors = Object.getOwnPropertyDescriptors(item);
        Object.entries(item).forEach(entry => {
            //console.log("entry: ", entry);
            const [prop, val]: any = entry;
            props[prop] = val;   
        })
        
        this._items.push(
            new Item(props)
        );
    }
}

// internal class
class Item extends Control {
    constructor(props) {
         super(props);  
    }

    getControlName() {
        return "item";
    }
}

class Grid extends Control {
    _props: GridProperties
    private _columns: Columns;
    private _items: Items;

    constructor(gridProps: GridProperties) {
        super(gridProps);
        this._props = gridProps
        this._columns = new Columns({columns: gridProps.columns});
        this._items = new Items({items: gridProps.items});
        if (gridProps.onItemInvoke) {
            super.addEventHandler("itemInvoke", gridProps.onItemInvoke);
        }
        if (gridProps.onSelect) {
            super.addEventHandler("select", gridProps.onSelect)
        }
    }

    getControlName() {
        return "grid";
    }
    protected getChildren(): any[] {
        return [this._columns, this._items]
    }

    /* accessors */ 
    get selection() {
        return this.getAttr('selection', typeof(this._props.selection));     
    }
    set selection(newSelection: string) {
        this.setAttr("selection", newSelection);
    }
    get compact() {
        return this.getAttr('compact', typeof(this._props.compact));     
    }
    set compact(newCompact: boolean) {
        this.setAttr("compact", newCompact);
    }
    get headerVisible() {
        return this.getAttr('headerVisible', typeof(this._props.headerVisible));     
    }
    set headerVisible(newHeaderVisible: boolean) {
        this.setAttr("headerVisible", newHeaderVisible);
    }
    get shimmerLines() {
        return this.getAttr('shimmerLines', typeof(this._props.shimmerLines));     
    }
    set shimmerLines(newShimmerLines: number) {
        this.setAttr("shimmerLines", newShimmerLines);
    }
    get onItemInvoke() {
        return this.getEventHandler("itemInvoke");     
    }
    set onItemInvoke(newOnItemInvoke: any) {
        this.addEventHandler("itemInvoke", newOnItemInvoke);
    }
    get onSelect() {
        return this.getEventHandler("select");     
    }
    set onSelect(newOnSelect: any) {
        this.addEventHandler("select", newOnSelect);
    }
}

export {
    Grid, Columns, Column, Items, Item
};