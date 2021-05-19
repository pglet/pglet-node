import { ControlProperties, Control } from './Control'
import Point from './Point';


interface VerticalBarchartProperties extends ControlProperties {
    legend?: boolean,
    tooltips?: boolean,
    barWidth?: number,
    colors?: string,
    yMin?: number,
    yMax?: number,
    yTicks?: string,
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
    private _data: Data;

    constructor(verticalBarchartProps: VerticalBarchartProperties) {
        super(verticalBarchartProps);
        this._data = new Data({points: verticalBarchartProps.points})
    }

    getControlName() {
        return "verticalBarchart";
    }

    protected getChildren(): Control[] {
        return this._data.getChildren();
    }

    /* accessors */ 
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
    get barWidth() {
        return this.attrs.get('barWidth')[0];     
    }
    set barWidth(newBarWidth: number) {
        this.setAttr("barWidth", newBarWidth);
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

export = VerticalBarchart