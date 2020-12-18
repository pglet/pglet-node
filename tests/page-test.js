const pglet = require("../index.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
    p = await pglet.page("index", { noWindow: true });

    await p.send("clean");
    const id = await p.send("add textbox id=name multiline");
    console.log(id);
    
    await p.send("add button id=ok text=OK");
    await p.send("add button id=cancel text=Cancel");

    console.log("before sleep");
    await sleep(5000);
    console.log("after sleep");
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);
        let name = await p.send("get name value");
        console.log("name:", name);
    }
})();