import { ControlProperties, Control } from '../Control'
import Point from './Point';


interface LinechartProperties extends ControlProperties {
    legend?: boolean,
    tooltips?: boolean,
    strokeWidth?: number,
    colors?: string,
    yMin?: number,
    yMax?: number,
    yTicks?: number,
    yFormat?: string,
    xType?: string,
    lines: LineData[]
}

interface LineDataProperties extends ControlProperties {
    color?: string,
    points: Point[]
}


class LineData extends Control {
    _props: LineDataProperties
    private _points: Point[] = [];

    constructor(lineDataProps) {
        super(lineDataProps);
        this._props = lineDataProps
        if (lineDataProps.points && lineDataProps.points.length > 0) {
            this._points.push(...lineDataProps.points);
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
    get color() {
        return this.getAttr('color', typeof(this._props.color));     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
}

class Linechart extends Control {
    _props: LinechartProperties
    private _lines: LineData[] = [];

    constructor(linechartProps: LinechartProperties) {
        super(linechartProps);
        this._props = linechartProps
        this._lines.push(...linechartProps.lines);  
    }

    getControlName() {
        return "linechart";
    }

    protected getChildren(): Control[] {
        return this._lines;
    }

    /* accessors */ 
    get lines() {
        return this._lines;     
    }
    set lines(newLines: LineData[]) {
        this._lines = newLines;
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
    get strokeWidth() {
        return this.getAttr('strokeWidth', typeof(this._props.strokeWidth));     
    }
    set strokeWidth(newStrokeWidth: number) {
        this.setAttr("strokeWidth", newStrokeWidth);
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

export  {
    Linechart, LineData
}