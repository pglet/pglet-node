import NodeWebSocket from 'ws';
import rws, { Event, Options } from 'reconnecting-websocket';

const isDeno = typeof window !== 'undefined' && ("Deno" in window);

const options: Options = {
    WebSocket: isDeno ? WebSocket : NodeWebSocket,
    connectionTimeout: 200,
    maxRetries: 10
};

export class ReconnectingWebSocket {
    private _rws: rws;

    constructor(uri: string) {
        this._rws = new rws(uri, [], options);
    }

    set onOpen(value: (evt: Event) => void) {
        this._rws.onopen = value;
    }
    set onClose(value: (evt: Event) => void) {
        this._rws.onclose = value;
    }
    set onMessage(value: (evt: MessageEvent) => void) {
        this._rws.onmessage = value;
    }

    send(msg: any) { 
        // TODO simulate request response with hash
        this._rws.send(msg);
    }

    connect(): Promise<void> {
        return new Promise((res, rej) => {
            //additional reconnection configuration and/or cancellation (bluebirdjs?)
        });
    }

}
