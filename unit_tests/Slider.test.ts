import { Control, Slider } from "../src/index";

test('Slider add test', () => {
    let slider = new Slider({ label: "sliderLabel", step: 1, min: 0, max: 10});
    expect(slider instanceof Control).toBeTruthy();
    expect(slider.getControlName()).toBe("slider");
    expect(slider.getCmds()).toMatchObject([
        { indent: 0, values: ['slider'], attrs: {step: '1', min: '0', max: '10', label: 'sliderLabel'}, commands: [] }
    ]);
});