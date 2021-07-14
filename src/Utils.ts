import { Control } from './Control'

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

export {
    StringHash, GetId
}