import { Textbox, page } from "../src/index";

async function getPage() {
    return page({name: "updatetest page", noWindow: true});
    
}

test('update single control by object', async () => {
    let p = await getPage();
    await p.clean();
    let textbox = new Textbox({id: "textbox1", value: "val1"});
    await p.add([textbox]);
    let value = await p.getValue(textbox);

    expect(value).toBe("val1");

    textbox.value = "val2";
    await p.update();
    let newValue = await p.getValue(textbox);

    expect(newValue).toBe("val2");
});

