import os from 'os';
import net from 'net';
import fs from 'fs';
import { Event } from './Event';
import { Control } from './Control';
import { throws } from 'assert';


export class Connection {
    private connId = ""
    private _commandClient: any;
    private _commandResolve: any;
    private _commandReject: any;
    private _eventClient: any;
    private _eventResolve: any;
    private _eventHandlers: any = {};

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
                let controlEvents = this._eventHandlers ? this._eventHandlers[result.target] : null;

                if (controlEvents) {
                    let handler = controlEvents[result.name]
                    handler();
                }
                var fn = this._eventResolve;
                this._eventResolve = null;

                if (fn) {
                    fn(result);
                }
            });
        }
    }

    async add(controls: Control[] | Control, to?: string, at?: number, fireAndForget?: boolean ): Promise<string | void> {
        let controlsArray: Control[] = [].concat(controls);
        let cmd = fireAndForget ? "addf" : "add";
        cmd += to ? ` to="${to}"` : "";
        cmd += at ? ` at="${at}"` : "";

        let index = [];

        controlsArray.forEach(ctrl => {
            if (ctrl.id) {
                this.removeEventHandlers(ctrl.id);
            }
            cmd += `\n${ctrl.getCmdStr(false, '', index, this)}`;
        })

        let result = await this.send(cmd);
        let ids = result.split(" ");

        for(let i = 0; i < ids.length; i++) {
            index[i].id = ids[i];
            //resubscribe to event handlers
            let handlers = index[i].getEventHandlers();

            Object.keys(handlers).forEach(event => {
                this.addEventHandlers(ids[i], event, handlers[event]);
            })
        }
        
        return result;   
    }
    
    update(controls: Control[] | Control, fireAndForget?: boolean): Promise<string> {
        let controlsArray: Control[] = [].concat(controls);
        
        let cmd = fireAndForget ? "setf" : "set";

        let lines = [];
        
        controlsArray.forEach(ctrl => {
            lines.push(ctrl.getCmdStr(true));
        })

        let slines = lines.join("\n")

        let result = this.send(`${cmd}\n${slines}`);

        return result;
    }

    getValue(ctrl: string | Control): Promise<string> {
        let value = (typeof ctrl === "string") ? ctrl : ctrl.id;
        return this.send(`get ${value} value`);
    }

    send(command: string): Promise<string> {
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
    waitEvent(): Promise<string | Event> {
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
            return new Promise<string>((resolve, reject): void => {
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

    addEventHandlers(controlId: string, eventName: string, handler: any) {
        let controlEvents = controlId in this._eventHandlers ? this._eventHandlers[controlId] : {};

        controlEvents[eventName] = handler;
        this._eventHandlers[controlId] = controlEvents;
    }
    
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

        return new Event(match.groups.target, match.groups.name, match.groups.data);
    }
    
}