import { Event } from './Event';

export class ControlEvent extends Event {
    private _control: string;
    private _page: string;
 
    constructor(target: string, name: string, data: string, control: string, page: string) {
        super(target, name, data);
    }

    get control() {
        return this._control;
    }

    get page() {
        return this._page;
    }

}