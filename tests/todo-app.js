const pglet = require("../build/src/index.js");

(async () => {
    p = await pglet.page("index", { noWindow: false });


    
    while(true) {
        const e = await p.waitEvent();
        console.log(e);

    }
})(); 