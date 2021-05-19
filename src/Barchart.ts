import { ControlProperties, Control } from './Control'
import Point from './Point';

// interface PointProperties extends ControlProperties {
//     x?: number,
//     y?: number,
//     legend?: string,
//     color?: string,
//     xTooltip?: string,
//     yTooltip?: string,
// }

interface BarchartProperties extends ControlProperties {
    tooltips?: boolean,
    dataMode?: string,
    points: Point[] 
}

// class Point extends Control{

//     constructor(pointProps: PointProperties) {
//         super(pointProps);    
//     }

//     getControlName() {
//         return "point";
//     }

//     /* accessors */ 
//     get x() {
//         return this.attrs.get('x')[0];     
//     }
//     set x(newX: number) {
//         this.setAttr("x", newX);
//     }
//     get y() {
//         return this.attrs.get('y')[0];     
//     }
//     set y(newY: number) {
//         this.setAttr("y", newY);
//     }
//     get legend() {
//         return this.attrs.get('legend')[0];     
//     }
//     set legend(newLegend: string) {
//         this.setAttr("legend", newLegend);
//     }
//     get color() {
//         return this.attrs.get('color')[0];     
//     }
//     set color(newColor: string) {
//         this.setAttr("color", newColor);
//     }
//     get xTooltip() {
//         return this.attrs.get('xTooltip')[0];     
//     }
//     set xTooltip(newXTooltip: string) {
//         this.setAttr("xTooltip", newXTooltip);
//     }
//     get yTooltip() {
//         return this.attrs.get('yTooltip')[0];     
//     }
//     set yTooltip(newYTooltip: string) {
//         this.setAttr("yTooltip", newYTooltip);
//     }
// }

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
        return this._data.getChildren();
    }

    /* accessors */ 
    get tooltips() {
        return this.attrs.get('tooltips')[0];     
    }
    set tooltips(newTooltips: boolean) {
        this.setAttr("tooltips", newTooltips);
    }
    get dataMode() {
        return this.attrs.get('dataMode')[0];     
    }
    set dataMode(newDataMode: boolean) {
        this.setAttr("dataMode", newDataMode);
    }
}

export = Barchart;