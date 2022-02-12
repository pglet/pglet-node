import { ControlProperties, Control } from '../Control'
import Point from './Point';

interface VerticalBarchartProperties extends ControlProperties {
    legend?: boolean,
    tooltips?: boolean,
    barWidth?: number,
    colors?: string,
    yMin?: number,
    yMax?: number,
    yTicks?: number,
    yFormat?: string,
    xType?: string,
    points: Point[]
}

//internal classs
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

class VerticalBarchart extends Control {
    _props: VerticalBarchartProperties
    private _data: Data;

    constructor(verticalBarchartProps: VerticalBarchartProperties) {
        super(verticalBarchartProps);
        this._props = verticalBarchartProps
        this._data = new Data({points: verticalBarchartProps.points})
    }

    getControlName() {
        return "verticalbarchart";
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
    get barWidth() {
        return this.getAttr('barWidth', typeof(this._props.barWidth));     
    }
    set barWidth(newBarWidth: number) {
        this.setAttr("barWidth", newBarWidth);
    }
    get colors() {
        return this.getAttr('colors', typeof(this._props.colors));     
    }
    set colors(newColors: string) {
        this.setAttr("colors", newColors);
    }
    get yMin() {
        return this.getAttr('yMin', typeof(this._props.yMin));     
    }
    set yMin(newYMin: number) {
        this.setAttr("yMin", newYMin);
    }
    get yMax() {
        return this.getAttr('yMax', typeof(this._props.yMax));     
    }
    set yMax(newYMax: number) {
        this.setAttr("yMax", newYMax);
    }
    get yTicks() {
        return this.getAttr('yTicks', typeof(this._props.yTicks));     
    }
    set yTicks(newYTicks: number) {
        this.setAttr("yTicks", newYTicks);
    }
    get yFormat() {
        return this.getAttr('yFormat', typeof(this._props.yFormat));     
    }
    set yFormat(newYFormat: string) {
        this.setAttr("yFormat", newYFormat);
    }
    get xType() {
        return this.getAttr('xType', typeof(this._props.xType));     
    }
    set xType(newXType: string) {
        this.setAttr("xType", newXType);
    }
}

export = VerticalBarchart