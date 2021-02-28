const pglet = require("../build/index.js");
const Text = require("../build/Text.js");

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    //await p.send('add text id="testObject" value="text object test"')
    let textObject = new Text({id: "testObject", value: "text object test"});
    const id = await p.add(textObject);
    
    console.log(id);
    let newTextObject = new Text({value: "text object test2"})
    await p.add([newTextObject, textObject]);
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 