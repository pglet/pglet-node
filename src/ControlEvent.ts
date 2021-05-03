import { Event } from './Event';
import { Control } from './Control';
import Page from './Page';

export class ControlEvent extends Event {
    private _control: Control;
    private _page: Page;
 
    constructor(target: string, name: string, data: string, control: Control, page: Page) {
        super(target, name, data);
        this._control = control;
        this._page = page;
    }

    get control() {
        return this._control;
    }

    get page() {
        return this._page;
    }

}