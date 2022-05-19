import { Control, Button, Text, Callout } from "../src/index"

test('callout add test', () => {
    //let cob = new Button({id: "callout_button", text: "Callout Button", primary: false});
    let co = new Callout({target: "callout_button", position: "leftBottom", beak: true, beakWidth: 10, visible: true, focus: false, childControls: [
                            new Text({value: "Callout!"})
                        ]});
    expect(co instanceof Control).toBeTruthy();
    expect(co instanceof Callout).toBeTruthy();
    expect(co.getControlName()).toBe("callout");
    expect(co.getCmds()).toMatchObject([
        { indent: 0, values: ['callout'], attrs: {target: 'callout_button', position: 'leftBottom', beak: 'true', beakWidth: '10', visible: 'true', focus: 'false'}, commands: [] },
        { indent: 2, values: ['text'], attrs: {value: 'Callout!'}, commands: [] }
    ]);
});
 