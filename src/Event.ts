
export class Event {
    private _target: string;
    private _name: string;
    private _data: string;
 
    constructor(target: string, name: string, data: string) {
        this._target = target;
        this._name = name;
        this._data = data;
    }

    get target() {
        return this._target;
    }

    get name() {
        return this._name;
    }

    get data() {
        return this._data;
    }
}