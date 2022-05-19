import { Textbox, connectPage } from "../src/index";

async function getPage() {
    return connectPage("updatetest page", {noWindow: true, web: false});
    
}

test('update single control by object', async () => {
    let p = await getPage();
    await p.clean();
    let textbox = new Textbox({id: "textbox1", value: "val1"});
    await p.add([textbox]);
    //let value = await p.getValue(textbox);

    expect(textbox.value).toBe("val1");

    textbox.value = "val2";
    await p.update();
    //let newValue = await p.getValue(textbox);

    expect(textbox.value).toBe("val2");
});

