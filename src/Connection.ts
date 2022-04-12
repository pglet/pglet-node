import os from 'os';
import crypto from 'crypto';
import cp from 'child_process';
import util from 'util';
import net from 'net';
import fs from 'fs';
import { Event as PgletEvent } from './Event';
import Page from './Page'
import rws , { Event, Options } from 'reconnecting-websocket';
import { ReconnectingWebSocket } from './protocol/ReconnectingWebSocket';
import { MessageChannel } from 'worker_threads';
import { CommandResponse } from './protocol/CommandResponse';
import { Message as PgletMessage } from './protocol/Message';
import { Action } from './protocol/Actions';
import { resolve } from 'path';
import { Log } from './Utils';


export class Connection {
    private _eventHandlers: any = {};
    private _rws: ReconnectingWebSocket;
    private connId: string = "";
    private _messageResolve: any;
    private _messageReject: any;
    private _pageUrl: string;
    private _pageName: string;
    private _sessions: { [key: string]: Page} = {};
    sentMessageHash: { [key: string]: PgletMessage } = {};
    onEvent: any;
    onSessionCreated: any;
    //onMessage: (evt: MessageEvent) => Promise<void>

    constructor(Rws: ReconnectingWebSocket) {
        this._rws = Rws;

        this._rws.onMessage = this.onMessage.bind(this);
        this._rws.onOpen = (msg: Event) => {
            //console.log(Log.bg.green, "connected!");
        }
        this._rws.onClose = (msg: Event) => {
            //console.log(Log.bg.red, "closed!");
        }
        this._messageResolve = null;
        this._messageReject = null;
    }

    get pageUrl() {
        return this._pageUrl;    
    }
    set pageUrl(url: string) {
        this._pageUrl = url;
    }
    get pageName() {
        return this._pageName;    
    }
    set pageName(name: string) {
        this._pageName = name;
    }
    get sessions() {
        return this._sessions;    
    }
    // addSession(key: string, page: Page) {
    //     this._sessions[key] = page;
    // }
    set sessions(session: { [key: string]: Page}) {
        this._sessions = session;
    }

    // async sendBatch (commands: string[]): Promise<string> {
    //     await this._send("begin"); //returns null
    //     for (const cmd of commands) {
    //         await this._send(cmd); //returns null
    //     }
    //     return this._send("end"); //returns results of intervening commands in text list
    // }

    async send(action: Action, command: any): Promise<string> {
        let msg: PgletMessage = {
            id: crypto.randomUUID(), //requires node >=15
            action: action,
            payload: command
        }
        this.sentMessageHash[msg.id] = msg;
        console.log(Log.bg.yellow, "sending message: ", msg);
        console.log(Log.bg.yellow, "sending message stringified: ", JSON.stringify(msg));
        return this.sendMessageInternal(msg);
    }

    private sendMessageInternal(msg: PgletMessage): Promise<string> {
        return new Promise((res, rej) => {          
            this._rws.send(JSON.stringify(msg));
            // wait for message to arrive in hash
            // then these will be called in onMessage 
            this._messageResolve = res;
            this._messageReject = rej;
            
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
        const payload = data.payload

        return new PgletEvent(payload.eventTarget, payload.eventName, payload.eventData);
    }

    // wait event pipe for new event
    waitEvent(): Promise<string | PgletEvent> {
        // register for result

        return new Promise((resolve, reject) => {
            if (os.type() === "Windows_NT") {
                
                //this._eventResolve = resolve;
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

    async readLoop() {
        while (true) {
            const e = await this.waitEvent();
            console.log(e);
        }
    }
    
    onMessage(msg: MessageEvent) {
        let storedMsg: PgletMessage;
        let msgData = JSON.parse(msg.data);
        console.log(Log.bg.yellow, "msgData: ", msgData);
        // if (msgData.id in this.sentMessageHash) {
        //     console.log("found!");
        //     storedMsg = this.sentMessageHash[msgData.id];
        //     //assume msg is retrieved
        //     switch (storedMsg.action) {
        //         case 'registerHostClient':
        //             console.log(Log.underscore + Log.bg.yellow, "Register Host Client");
        //             break;
        //         case 'pageCommandFromHost':
        //             console.log(Log.underscore + Log.bg.yellow, "Page Command From Host", msgData.payload.result);
        //             //this.onEvent(msgData.payload);
        //             break;
        //         case 'pageCommandsBatchFromHost':
        //             console.log(Log.underscore + Log.bg.yellow, "Page Commands Batch from Host");
        //             break;
        //         case 'pageEventToHost':
        //             console.log(Log.underscore + Log.bg.yellow, "Page Event to Host");
        //     }
        // }

        if (msgData.action === 'pageEventToHost') {
            this.onEvent(msgData.payload);
            return;
        }

        if (msgData.action === 'sessionCreated') {
            console.log(Log.bg.yellow, "sessionCreated: ", msgData);
            this.onSessionCreated(msgData.payload);
            return;
        }

        let cb = msgData.payload.error ? this._messageReject : this._messageResolve;

        if (cb) {
            cb(JSON.stringify(msgData));
            this._messageResolve = null;
            this._messageReject = null;
        }
    }



}

