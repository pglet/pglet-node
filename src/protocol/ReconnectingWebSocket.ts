import NodeWebSocket from 'ws';
import ReconnectingWebsocket, { Event, Options } from 'reconnecting-websocket';

const isDeno = typeof window !== 'undefined' && ("Deno" in window);

const options: Options = {
    WebSocket: isDeno ? WebSocket : NodeWebSocket,
    connectionTimeout: 200,
    maxRetries: 10
};

const Rws = new ReconnectingWebsocket("ws://localhost:8550/ws", [], options);

Rws.onopen = (evt: Event) => {
    console.log(`Connected to ${Rws.url}`);
}

Rws.onclose = (evt: Event) => {
    console.log("Disconnected");
}

Rws.onmessage = (evt: MessageEvent) => {
    console.log(evt.data);
}

export = Rws;