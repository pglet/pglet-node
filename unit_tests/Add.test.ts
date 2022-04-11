import { Stack, Textbox, page } from "../src/index";

function getPage(name) {
    return page({name: name, noWindow: true, local: true});
}

test('add single control', async () => {
    let p = await getPage("add-test-1");
    let result = await p.add([new Textbox({id: "textbox1", label: "textbox 1"})])

    expect(result).toMatchObject("textbox1");
});

test('add multiple controls', async () => {
    let p = await getPage("add-test-2");
    let result = await p.add([new Textbox({id: "textbox1", label: "textbox 1"}), new Textbox({id: "textbox2", label: "textbox 2"})])

    expect(result).toMatchObject("textbox1\ntextbox2");
});

test('add control to existing control', async () => {
    let p = await getPage("add-test-3");
    let stack = new Stack({id: "stack1", horizontal: true})
    await p.add([stack]);
    let textbox = new Textbox({id: "textbox1", label: "textbox 1",})
    stack.childControls.push(textbox);
    await p.update();
    let result = textbox.uid;
    expect(result).toMatchObject("stack1:textbox1");
});