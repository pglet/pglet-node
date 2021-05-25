import { ControlProperties, Control } from './Control'
import Point from './Point';

interface BarchartProperties extends ControlProperties {
    tooltips?: boolean,
    dataMode?: string,
    points: Point[] 
}

//internal class
class Data extends Control{
    private _points: Point[] = [];

    constructor(props) {
        super(props);
        if (props.points && props.points.length > 0) {
            this._points.push(...props.points);
        }       
    }

    getControlName() {
        return "data";
    }

    getChildren() {
        return this._points;
    }

    /* accessors */ 
    get points() {
        return this._points;     
    }
    set points(newPoints: Point[]) {
        this._points = newPoints;
    }


}

class Barchart extends Control {
    private _data: Data;

    constructor(barchartProps: BarchartProperties) {
        super(barchartProps);
        this._data = new Data({points: barchartProps.points})
    }

    getControlName() {
        return "barchart";
    }

    protected getChildren(): Control[] {
        return [this._data];
    }

    /* accessors */ 
    get points() {
        return this._data.points;     
    }
    set points(newPoints: Point[]) {
        this._data.points = newPoints;
    }
    get tooltips() {
        return this.attrs.get('tooltips')[0];     
    }
    set tooltips(newTooltips: boolean) {
        this.setAttr("tooltips", newTooltips);
    }
    get dataMode() {
        return this.attrs.get('dataMode')[0];     
    }
    set dataMode(newDataMode: string) {
        this.setAttr("dataMode", newDataMode);
    }
}

export = Barchart;