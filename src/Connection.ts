import os from 'os';
import net from 'net';
import fs from 'fs';
import { Event as PgletEvent } from './Event';
import ReconnectingWebSocket, { Event, Options } from 'reconnecting-websocket';
import Rws from './protocol/ReconnectingWebSocket';
import { MessageChannel } from 'worker_threads';

export class Connection {
    //private connId = ""
    private _commandClient: any;
    private _commandResolve: any;
    private _commandReject: any;
    private _eventClient: any;
    private _eventResolve: any;
    private _eventHandlers: any = {};
    private _sendQueue: MessageChannel;
    onEvent: any;
    onMessage: (evt: MessageEvent) => Promise<void>

    constructor(Rws: ReconnectingWebSocket) {
        //this.connId = connId;
        Rws.onmessage = (msg: MessageEvent) => {
            console.log(msg.data);
        }

        if (os.type() === "Windows_NT") {
            // open connections for command and event pipes
            this._commandResolve = null;
            this._commandReject = null;
            this._commandClient = net.createConnection(os.type() === "Windows_NT" ? `\\\\.\\pipe\\${connId}` : `${os.tmpdir()}/CoreFxPipe_${connId}`, () => {
                this._commandClient.setNoDelay(true);
            });

            this._commandClient.on('data', (data: any) => {
                // parse result
                const result = this.parseResult(data);
                //console.log("commandClient data: ", result);
                
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
            });

            this._eventClient.on('data', (data) => {
                const result = this.parseEvent(data);
                
                //call page private _onEvent
                this.onEvent(result); 
                var fn = this._eventResolve;
                this._eventResolve = null;

                if (fn) {
                    fn(result);
                }
            });
        }
    }

    async sendBatch (commands: string[]): Promise<string> {
        await this._send("begin"); //returns null
        for (const cmd of commands) {
            await this._send(cmd); //returns null
        }
        return this._send("end"); //returns results of intervening commands in text list
    }

    send(command: string): Promise<string> {
        return this._send(command);
    }

    private _send(command: string): Promise<string> {
        let waitResult = !command.match(/\w+/g)[0].endsWith('f');
        if (os.type() === "Windows_NT") {
            // Windows
            return this.sendWindows(command, waitResult);
        } else {
            // Linux/macOS - use FIFO
            return this.sendLinux(command, waitResult);
        }
    }

    // wait event pipe for new event
    waitEvent(): Promise<string | PgletEvent> {
        // register for result

        return new Promise((resolve, reject) => {
            if (os.type() === "Windows_NT") {
                this._eventResolve = resolve;
            } else {
                fs.open(`${this.connId}.events`, 'r+', (err, fd) => {
                    if (err) {
                        reject(err);
                    } else {
                        var stream = fs.createReadStream(null, {
                            fd
                        });
                        stream.on('data', (data) => {
                            stream.close()
                            resolve(this.parseEvent(data));
                        });                     
                    }
                });                
            }
        });
    }

    private sendWindows(command: string, waitResult: boolean): Promise<string> {
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
            return new Promise<string>((resolve, reject) => {
                this._commandClient.write(command + '\n', (err) => {
                    if (err) {
                        reject(err);
         
                    } else {
                        resolve("");
                    }
                });
            });
        }
    }

    private sendLinux(command: string, waitResult: boolean): Promise<string> {
        return new Promise<string>((resolve, reject) => {
                
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
                        resolve("");
                    }
                }
            });
            
        });
    }

    // addEventHandlers(controlId: string, eventName: string, handler: any) {
    //     let controlEvents = controlId in this._eventHandlers ? this._eventHandlers[controlId] : {};

    //     controlEvents[eventName] = handler;
    //     this._eventHandlers[controlId] = controlEvents;
    // }
    
    protected removeEventHandlers(controlId: string): void {
        if (controlId in this._eventHandlers) {
            delete this._eventHandlers[controlId];            
        }
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

    private parseEvent(data: any) {
        const result = data.toString().trim();
        
        let re = /(?<target>[^\s]+)\s(?<name>[^\s]+)(\s(?<data>.+))*/;
        let match = re.exec(result);

        return new PgletEvent(match.groups.target, match.groups.name, match.groups.data);
    }

    startReadWriteLoops() {
        // something like waitEvent() - for Read - and sendLinux/Windows - for Write
        // Pglet.page should be able to await ws messages (read) and send ws messages (write)
        // Producer of channel = Pglet.page/app, Consumer of channel = Connection
    }

    private sendMessageInternal(): Promise<void> {
        return new Promise((res, rej) => {
            
        });
    }
    
}