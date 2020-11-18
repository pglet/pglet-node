const pglet = require("../index.js");

pglet.page();

pglet.page("page1");

pglet.page("page1", { public: true });

pglet.page({ name: "test1" });


// test app
pglet.app((p) => { console.log(p.id) });

pglet.app("page1", (p) => { console.log(p.id) });

pglet.app("page1", { public: true }, (p) => { console.log(p.id) });

pglet.app({ name: "test1" }, (p) => { console.log(p.id) });


// wrong example - should through an exception
//pglet.app();