const pglet = require("../build/index.js");
const Text = require("../build/Text.js");
const Textbox = require("../build/Textbox.js");
const Stack = require("../build/Stack.js");
const Button = require("../build/Button.js");

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    //await p.send('add text id="testObject" value="text object test"')
    let textObject = new Text({id: "testObject", value: "text object test"});
    let textboxObject = new Textbox({value: "testTextbox value"});
    let stackObject = new Stack({childControls: [textObject, textboxObject]});
    const id = await p.add(stackObject);
    
    console.log(id);
    async function greeterButtonHandler(e) {
        await p.send("clean")
        p.add(new Text({value: "Hello click!"}))
        return
    }
    let buttonObject = new Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    p.add(buttonObject);
    //const id2 = await (p.add(textboxObject));
    //let newTextObject = new Text({value: "text object test2"})
    //await p.add([newTextObject, textObject]);
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 