const pglet = require("../index.js");

(async () => {
    // test app
    await pglet.app(async (p) => {

        const id = await p.send("add textbox id=name");
        console.log(id);

        await p.send("add button id=ok text=OK");
        await p.send("add button id=cancel text=Cancel");

        while(true) {
            const e = await p.waitEvent();
            console.log(e);
        }
    });

    process.stdin.resume();
})();