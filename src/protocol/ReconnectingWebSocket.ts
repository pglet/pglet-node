import NodeWebSocket from 'ws';
import rws, { Event, Options } from 'reconnecting-websocket';
import { Message as PgletMessage } from './Message';
import { Message } from '..';

const isDeno = typeof window !== 'undefined' && ("Deno" in window);

const options: Options = {
    WebSocket: isDeno ? WebSocket : NodeWebSocket,
    connectionTimeout: 200,
    maxRetries: 10
};

export class ReconnectingWebSocket {
    private _rws: rws;
    private _onOpen: (evt: Event) => void;
    private _onClose: (evt: Event) => void;
    private _onMessage: (evt: MessageEvent) => void;

    constructor(uri: string) {
        this._rws = new rws(uri, [], options);
    }

    set onOpen(value: (evt: Event) => void) {
        this._onOpen = value;
        this._rws.onopen = value;
    }
    set onClose(value: (evt: Event) => void) {
        this._onClose = value;
        this._rws.onclose = value;
    }
    set onMessage(value: (evt: MessageEvent) => void) {
        this._onMessage = value;
        this._rws.onmessage = value;
    }

    send(msg: PgletMessage) { 
        // TODO simulate request response with hash
        this._rws.send(msg.message);

    }

    connect(): Promise<void> {
        return new Promise((res, rej) => {
            //additional reconnection configuration and/or cancellation (bluebirdjs?)
        });

    }


}
