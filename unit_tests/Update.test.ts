import { Textbox, page } from "../src/index";

function getPage() {
    return page("test page", {noWindow: true});
}

test('update single control by object', async () => {
    let p = await getPage();
    let textbox = new Textbox({id: "textbox1", value: "val1"})
    await p.add(textbox);
    let value = await p.getValue(textbox);

    expect(value).toBe("val1");

    textbox.value = "val2";
    await p.update(textbox);
    let newValue = await p.getValue(textbox);

    expect(newValue).toBe("val2");
});

// test('update single control by returned id', async () => {
//     let p = await getPage();
//     let textbox = new Textbox({id: "textbox1", value: "val1"})
//     let result = await p.add(textbox);
//     let value = await p.getValue(result);

//     expect(value).toBe("val1");
    
//     textbox.value = "val2";
//     let updateResult = await p.update(textbox);
//     let newValue = await p.getValue(updateResult);

//     expect(newValue).toBe("val2");
// });