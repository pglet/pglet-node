const pglet = require("../build/index.js");
const Text = require("../build/Text.js");
const Textbox = require("../build/Textbox.js");
const Stack = require("../build/Stack.js");

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    //await p.send('add text id="testObject" value="text object test"')
    let textObject = new Text({id: "testObject", value: "text object test"});
    let textboxObject = new Textbox({value: "testTextbox value"});
    let stackObject = new Stack({childControls: [textObject, textboxObject]});
    const id = await p.add(stackObject);
    
    console.log(id);

    //const id2 = await (p.add(textboxObject));
    //let newTextObject = new Text({value: "text object test2"})
    //await p.add([newTextObject, textObject]);
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 