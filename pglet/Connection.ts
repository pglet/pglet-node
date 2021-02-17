// const p = pglet.page();
// p.send(`add text to=page value="hello, world"`) --> p.add(Text({to: page, value: "hello, world"}))

import os from 'os';
import net from 'net';
import { Event } from './Event';

export class Connection {
    private connId = ""
    private _commandClient: any;
    private _commandResolve: any;
    private _commandReject: any;
    private _eventClient: any;
    private _eventResolve: any;

    constructor(connId: string) {
        this.connId = connId;

        if (os.type() === "Windows_NT") {
            // open connections for command and event pipes
            this._commandResolve = null;
            this._commandReject = null;
            this._commandClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}` : `${os.tmpdir()}/CoreFxPipe_${connId}`, () => {
                //console.log("Connected to command pipe.");
                this._commandClient.setNoDelay(true);
            });

            this._commandClient.on('data', (data) => {
                // parse result
                const result = this.parseResult(data);

                let fn = this._commandResolve;
                let value = result.value;
                if (result.error) {
                    let fn = this._commandReject;
                    let value = result.error;
                }

                this._commandResolve = null;
                this._commandReject = null;

                if (fn) {
                    fn(value);
                }
            });

            this._eventResolve = null;
            this._eventClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}.events` : `${os.tmpdir()}/CoreFxPipe_${connId}.events`, () => {
                //console.log("Connected to event pipe.");
            });

            this._eventClient.on('data', (data) => {
                const result = this.parseEvent(data);

                var fn = this._eventResolve;
                this._eventResolve = null;

                if (fn) {
                    fn(result);
                }
            });
        }
    }

    add(): string {


    }
    update(): string {

    }
    remove(): string {

    }
    parseResult(data: any) {
        const result = data.toString().trim();
            
        var flag = result;
        var value = null;
        const idx = result.indexOf(" ");
        if (idx != -1) {
            flag = result.substring(0, idx);
            value = result.substring(idx + 1);
        }

        return {
            value: (flag !== "error") ? value : null,
            error: (flag === "error") ? value : null
        }      

    }

    parseEvent(data) {
        const result = data.toString().trim();

        let re = /(?<target>[^\s]+)\s(?<name>[^\s]+)(\s(?<data>.+))*/;
        let match = re.exec(result);

        return new Event(match.groups.target, match.groups.name, match.groups.data);
    }
}