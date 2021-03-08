const pglet = require("../build/src/index.js");
// const Text = require("../build/src/Text.js");
// const Textbox = require("../build/src/Textbox.js");
// const Stack = require("../build/src/Stack.js");
// const Button = require("../build/src/Button.js");
// const Dropdown = require("../build/src/Dropdown.js");
// const Progress = require("../build/src/Progress.js");
// const Checkbox = require("../build/src/Checkbox.js");
const { isAwaitExpression } = require("typescript");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    let progressObject = new pglet.Progress({label: "testProgress", width: "100%"})
    await p.add(progressObject);

    let textObject = new pglet.Text({id: "heading", value: "greeter app test"});
    let textboxObject = new pglet.Textbox({value: "Your Name", description: "Please provide your name"});
    let ddObject = new pglet.Dropdown({label: "dropdown", optionKeys: ["small", "medium", "large"]});
    let checkBoxObject = new pglet.Checkbox({value: true, label: "testCheckbox"});
    let stackObject = new pglet.Stack({childControls: [textObject, textboxObject, ddObject, checkBoxObject]});
    const id = await p.add(stackObject);

    for (let i = 0; i < 11; i++) {
        progressObject.label = `Doing step ${i}..`
        progressObject.value = (i*10)
        await sleep(1000);
        await p.update(progressObject);

    }
    progressObject.label = "Completed!"
    await p.update(progressObject);
    
    console.log(id);
    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        await p.send("clean")
        await p.add(new pglet.Text({value: `Hello ${name}!`}))
        return
    }

    let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add(buttonObject);
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 