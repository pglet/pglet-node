const pglet = require("../index.js");

    // test app
    pglet.app(async (p) => {

        const id = await p.send("add textbox id=name");
        console.log(id);

        const e = p.waitEvents();
        console.log(e);
    });

    process.stdin.resume();