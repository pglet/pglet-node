import { Control } from './Control'
import Debug from 'debug';


// https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function StringHash(str: string): number {
    
    var hash = 0;

    if (str.length == 0) return hash;

    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        // Convert to 32bit integer
        hash = hash & hash; 
    }
    // return only positive integer
    return (hash >>> 0);
    
}

var counter: number = 0;
var globalMap: WeakMap<Control, number> = new WeakMap<Control, number>()

function GetId(control: Control) {
    if (!globalMap.has(control)) {
        globalMap.set(control, counter++);
    }
    return globalMap.get(control);
    // return counter++
}
const Log = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    // Foreground (text) colors
    fg: {
      black: `\x1b[30m%s\x1b[0m`,
      red: `\x1b[31m%s\x1b[0m`,
      green: `\x1b[32m%s\x1b[0m`,
      yellow: `\x1b[33m%s\x1b[0m`,
      blue: `\x1b[34m%s\x1b[0m`,
      magenta: `\x1b[35m%s\x1b[0m`,
      cyan: `\x1b[36m%s\x1b[0m`,
      white: `\x1b[37m%s\x1b[0m`,
      crimson: `\x1b[38m%s\x1b[0m`
    },
    // Background colors
    bg: {
      black: `\x1b[40m%s\x1b[0m`,
      red: `\x1b[41m%s\x1b[0m`,
      green: `\x1b[42m\x1b[30m%s\x1b[0m`,
      yellow: `\x1b[43m\x1b[30m%s\x1b[0m`,
      blue: `\x1b[44m%s\x1b[0m`,
      magenta: `\x1b[45m%s\x1b[0m`,
      cyan: `\x1b[46m%s\x1b[0m`,
      white: `\x1b[47m\x1b[30m%s\x1b[0m`,
      crimson: `\x1b[48m%s\x1b[0m`
    }
  };

  const debug = Debug('debug');
  const info = Debug('info');
  const warn = Debug('warn');
  

export {
    StringHash, GetId, Log, debug, warn, info
}