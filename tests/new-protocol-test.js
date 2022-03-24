const pglet = require("../dist/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    // TODO return page
    p = await pglet.connectPage("test", { noWindow: false, web: false });
    await p.clean()
    let textboxObject = new pglet.Textbox({id: "textbox1", value: "val1"});
    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        await p.add([new pglet.Text({value: `Hello ${name}!`})])
        return
    }
    let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add([textboxObject, buttonObject]);
    await sleep(5000);
    await p.clean();

    // while(true) {
    //     // TODO WaitEvent will never resolve since the command and event pipe promise resolution wiring is removed
    //     const e = await p.waitEvent();
    //     console.log("e: ", e);

    // }
})(); 

