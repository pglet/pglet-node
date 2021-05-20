import { ControlProperties, Control } from './Control'
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
    legend?: string,
    points: Point[]
}


class LineData extends Control{
    private _points: Point[] = [];

    constructor(lineDataProps) {
        super(lineDataProps);
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
        return this.attrs.get('color')[0];     
    }
    set color(newColor: string) {
        this.setAttr("color", newColor);
    }
    get legend() {
        return this.attrs.get('legend')[0];     
    }
    set legend(newLegend: boolean) {
        this.setAttr("legend", newLegend);
    }

}

class Linechart extends Control {
    private _lines: LineData[] = [];

    constructor(linechartProps: LinechartProperties) {
        super(linechartProps);
        this._lines.push(...linechartProps.lines);
        // linechartProps.lines.forEach(line => {
        //     this._lines.push(line);
        // })
        
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
        return this.attrs.get('legend')[0];     
    }
    set legend(newLegend: boolean) {
        this.setAttr("legend", newLegend);
    }
    get tooltips() {
        return this.attrs.get('tooltips')[0];     
    }
    set tooltips(newTooltips: boolean) {
        this.setAttr("tooltips", newTooltips);
    }
    get strokeWidth() {
        return this.attrs.get('strokeWidth')[0];     
    }
    set strokeWidth(newStrokeWidth: number) {
        this.setAttr("strokeWidth", newStrokeWidth);
    }
    get colors() {
        return this.attrs.get('colors')[0];     
    }
    set colors(newColors: string) {
        this.setAttr("colors", newColors);
    }
    get yMin() {
        return this.attrs.get('yMin')[0];     
    }
    set yMin(newYMin: number) {
        this.setAttr("yMin", newYMin);
    }
    get yMax() {
        return this.attrs.get('yMax')[0];     
    }
    set yMax(newYMax: number) {
        this.setAttr("yMax", newYMax);
    }
    get yTicks() {
        return this.attrs.get('yTicks')[0];     
    }
    set yTicks(newYTicks: number) {
        this.setAttr("yTicks", newYTicks);
    }
    get yFormat() {
        return this.attrs.get('yFormat')[0];     
    }
    set yFormat(newYFormat: string) {
        this.setAttr("yFormat", newYFormat);
    }
    get xType() {
        return this.attrs.get('xType')[0];     
    }
    set xType(newXType: string) {
        this.setAttr("xType", newXType);
    }

}

export  {
    Linechart, LineData
}