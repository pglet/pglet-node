const pglet = require("../build/index.js");
const Text = require("../build/Text.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
    p = await pglet.page("index", { noWindow: false });

    await p.send("clean");
    const id = await p.add(new Text.Text({id: "testObject", value: "text object test"}));
    console.log(id);


    console.log("before sleep");
    await sleep(5000);
    console.log("after sleep");
    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 