const pglet = require("../dist/index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    p = await pglet.page("new protocol testing", { noWindow: false, web: true });

    async function greeterButtonHandler(e) {
        let name = await p.getValue(textboxObject);
        await p.add([new pglet.Text({value: `Hello ${name}!`})])
        return
    }

    let buttonObject = new pglet.Button({text: "Say hello!", primary: true, onClick: greeterButtonHandler})
    await p.add([buttonObject]);
    await sleep(5000);
    await p.clean();

    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 

