import { Control, SpinButton } from "../src/index";

test('spinButton add test', () => {
    let spinButton = new SpinButton({ label: "spinButtonLabel", min: 0, max: 10});
    expect(spinButton instanceof Control).toBeTruthy();
    expect(spinButton.getControlName()).toBe("spinbutton");
    expect(spinButton.getCmds()).toMatchObject([
        { indent: 0, values: ['spinbutton'], attrs: {min: '0', max: '10', label: 'spinButtonLabel'}, commands: [] }
    ]);
});