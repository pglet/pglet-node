import { Action } from './Actions';

export interface Message {

    readonly id: string | null;
    readonly action: Action;
    readonly payload: any;
    
}