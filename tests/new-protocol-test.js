const pglet = require("../dist/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// (async () => {
//     // TODO return page
//     p = await pglet.connectPage("test", { noWindow: false, web: false });
//     await p.clean()
//     let textboxObject = new pglet.Textbox({id: "textbox1", value: "val1"});
//     async function greeterButtonHandler(e) {
//         let name = textboxObject.value;
//         let text = new pglet.Text({value: `Hello ${name}!`});
//         await p.add([text]);
//         await sleep(3000);
//         await p.remove([text]);
//         return
//     }
//     let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
//     await p.add([textboxObject, buttonObject]);
//     // await sleep(5000);
//     // await p.clean();

//     // while(true) {
//     //     // TODO WaitEvent will never resolve since the command and event pipe promise resolution wiring is removed
//     //     const e = await p.waitEvent();
//     //     console.log("e: ", e);

//     // }
// })(); 

(async () => {
    pglet.serveApp(async (p) => {
        //session handler
        await p.clean()
        let textboxObject = new pglet.Textbox({ id: "textbox1", value: "val1" });
        async function greeterButtonHandler(e) {
            let name = textboxObject.value;
            let text = new pglet.Text({ value: `Hello ${name}!` });
            await p.add([text]);
            await sleep(3000);
            await p.remove([text]);
            return
        }
        let buttonObject = new pglet.Button({ text: "Say hello!", primary: true, onClick: greeterButtonHandler })
        await p.add([textboxObject, buttonObject]);

    }, { noWindow: false, web: false });

})();

