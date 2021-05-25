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
    onClickAction?: any,
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
class Columns extends Control{
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

class Column extends Control{
    private _childControls: Control[] = [];

    constructor(columnProps: ColumnProperties) {
        super(columnProps); 
        if (columnProps.onClickAction) {
            super.addEventHandler("click", columnProps.onClickAction);
        }
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
        return this.attrs.get('name')[0];     
    }
    set name(newName: string) {
        this.setAttr("name", newName);
    }
    get icon() {
        return this.attrs.get('icon')[0];     
    }
    set icon(newIcon: string) {
        this.setAttr("icon", newIcon);
    }
    get iconOnly() {
        return this.attrs.get('iconOnly')[0];     
    }
    set iconOnly(newIconOnly: boolean) {
        this.setAttr("iconOnly", newIconOnly);
    }
    get fieldName() {
        return this.attrs.get('fieldName')[0];     
    }
    set fieldName(newFieldName: string) {
        this.setAttr("fieldName", newFieldName);
    }
    get sortable() {
        return this.attrs.get('sortable')[0];     
    }
    set sortable(newSortable: string) {
        this.setAttr("sortable", newSortable);
    }
    get sortField() {
        return this.attrs.get('sortField')[0];     
    }
    set sortField(newSortField: string) {
        this.setAttr("sortField", newSortField);
    }
    get sorted() {
        return this.attrs.get('sorted')[0];     
    }
    set sorted(newSorted: string) {
        this.setAttr("sorted", newSorted);
    }
    get resizable() {
        return this.attrs.get('resizable')[0];     
    }
    set resizable(newResizable: boolean) {
        this.setAttr("resizable", newResizable);
    }
    get minWidth() {
        return this.attrs.get('minWidth')[0];     
    }
    set minWidth(newMinWidth: number) {
        this.setAttr("minWidth", newMinWidth);
    }
    get maxWidth() {
        return this.attrs.get('maxWidth')[0];     
    }
    set maxWidth(newMaxWidth: number) {
        this.setAttr("maxWidth", newMaxWidth);
    }
}

interface ItemObject {
    [key: string]: any
}

//internal class
class Items extends Control{
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
class Item extends Control{
    constructor(props) {
         super(props);  
    }

    getControlName() {
        return "item";
    }
}

class Grid extends Control {
    private _columns: Columns;
    private _items: Items;

    constructor(gridProps: GridProperties) {
        super(gridProps);
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
        return this.attrs.get('selection')[0];     
    }
    set selection(newSelection: string) {
        this.setAttr("selection", newSelection);
    }
    get compact() {
        return this.attrs.get('compact')[0];     
    }
    set compact(newCompact: boolean) {
        this.setAttr("compact", newCompact);
    }
    get headerVisible() {
        return this.attrs.get('headerVisible')[0];     
    }
    set headerVisible(newHeaderVisible: boolean) {
        this.setAttr("headerVisible", newHeaderVisible);
    }
    get shimmerLines() {
        return this.attrs.get('shimmerLines')[0];     
    }
    set shimmerLines(newShimmerLines: number) {
        this.setAttr("shimmerLines", newShimmerLines);
    }
}

export {
    Grid, Columns, Column, Items, Item
};