import { ControlProperties, Control } from '../Control'
import Point from './Point';

interface PiechartProperties extends ControlProperties {
    legend?: boolean,
    tooltips?: boolean,
    innerValue?: number,
    innerRadius?: number,
    points: Point[]
}

//internal classs
class Data extends Control {
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

class Piechart extends Control {
    _props: PiechartProperties
    private _data: Data;

    constructor(piechartProps: PiechartProperties) {
        super(piechartProps);
        this._props = piechartProps
        this._data = new Data({points: piechartProps.points})
    }

    getControlName() {
        return "piechart";
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
    get legend() {
        return this.getAttr('legend', typeof(this._props.legend));     
    }
    set legend(newLegend: boolean) {
        this.setAttr("legend", newLegend);
    }
    get tooltips() {
        return this.getAttr('tooltips', typeof(this._props.tooltips));     
    }
    set tooltips(newTooltips: boolean) {
        this.setAttr("tooltips", newTooltips);
    }
    get innerValue() {
        return this.getAttr('innerValue', typeof(this._props.innerValue));     
    }
    set innerValue(newInnerValue: number) {
        this.setAttr("innerValue", newInnerValue);
    }
    get innerRadius() {
        return this.getAttr('innerRadius', typeof(this._props.innerRadius));     
    }
    set innerRadius(newInnerRadius: number) {
        this.setAttr("innerRadius", newInnerRadius);
    }
}

export = Piechart