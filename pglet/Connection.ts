// const p = pglet.page();
// p.send(`add text to=page value="hello, world"`) --> p.add(Text({to: page, value: "hello, world"}))

import os from 'os';
import net from 'net';
import fs from 'fs';
import { Event } from './Event';
import { Control } from './Control';

export class Connection {
    private connId = ""
    private _commandClient: any;
    private _commandResolve: any;
    private _commandReject: any;
    private _eventClient: any;
    private _eventResolve: any;
    private _eventHandlers: any;

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

            this._commandClient.on('data', (data: any) => {
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

    add(controls: Control[] | Control, to?: string, at?: number, fireAndForget?: boolean ): string {
        let controlsArray: Control[] = [].concat(controls);
        let cmd = fireAndForget ? "add" : "addf";
        cmd += to ? ` to="${to}"` : "";
        cmd += at ? ` at="${at}"` : "";

        let index = [];

        if (controlsArray.length > 1) {
             controlsArray.forEach(ctrl => {
                cmd += `\n${ctrl.getCmdStr()}`;
             })

        }
        console.log("cmd: ", cmd);
        let result = this.send(cmd);

        return "TODO";
        
    }
    // update(): string {

    // }
    // remove(): string {

    // }

    send(command: string): Promise<string | void> {
        let waitResult = !command.match(/\w+/g)[0].endsWith('f');

        if (os.type() === "Windows_NT") {
            // Windows
            return this.sendWindows(command, waitResult);
        } else {
            // Linux/macOS - use FIFO
            return this.sendLinux(command, waitResult);
        }
    }
    private sendWindows(command: string, waitResult: boolean): Promise<string | void> {
        if (waitResult) {

            // command with result
            return new Promise((resolve, reject) => {
                this._commandResolve = resolve;
                this._commandReject = reject;

                // send command
                this._commandClient.write(command + '\n');                
            });

        } else {

            // fire-and-forget command
            return new Promise<void>((resolve, reject): void => {
                this._commandClient.write(command + '\n', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    }

    private sendLinux(command: string, waitResult: boolean): Promise<string | void> {
        return new Promise<void>((resolve, reject) => {
                
            fs.writeFile(this.connId, command + '\n', (err) => {
                if (err) {
                    reject(err);
                } else {
                    if (waitResult) {
                        fs.readFile(this.connId, (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                // parse result
                                const result = this.parseResult(data);
                
                                if (result.error) {
                                    reject(result.error);
                                } else {
                                    resolve(result.value);
                                }
                            }
                        })
                    } else {
                        resolve();
                    }
                }
            });
            
        });
    }    
    private addEventHandlers(controlId: string, eventName: string, handler: any) {
        let controlEvents = controlId in this._eventHandlers ? this._eventHandlers[controlId] : null;
        if (!controlEvents) {
            controlEvents = {}
            this._eventHandlers[controlId] = controlEvents;
        }
        controlEvents[eventName] = handler;
    }
    private parseResult(data: any) {
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

    private parseEvent(data) {
        const result = data.toString().trim();

        let re = /(?<target>[^\s]+)\s(?<name>[^\s]+)(\s(?<data>.+))*/;
        let match = re.exec(result);

        return new Event(match.groups.target, match.groups.name, match.groups.data);
    }

    // private getControlId(controlId: string) {
    //     if 

    // }
    
}