const pglet = require("../build/index.js");
const Text = require("../build/Text.js");
const Textbox = require("../build/Textbox.js");
const Stack = require("../build/Stack.js");
const Button = require("../build/Button.js");

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    let textObject = new Text({id: "heading", value: "greeter app test"});
    let textboxObject = new Textbox({value: "Your Name", description: "Please provide your name"});
    let stackObject = new Stack({childControls: [textObject, textboxObject]});
    const id = await p.add(stackObject);
    
    console.log(id);
    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        await p.send("clean")
        await p.add(new Text({value: `Hello ${name}!`}))
        return
    }
    let buttonObject = new Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add(buttonObject);
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 