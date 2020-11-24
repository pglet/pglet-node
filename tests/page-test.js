const pglet = require("../index.js");

(async () => {
    p = await pglet.page();

    const id = await p.send("add textbox id=name");
    console.log(id);
    
    await p.send("add button id=ok text=OK");
    await p.send("add button id=cancel text=Cancel");
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);
    }
})();