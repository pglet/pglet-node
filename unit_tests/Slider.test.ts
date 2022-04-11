import Slider from "../src/Slider";
import { Control } from "../src/index";

test('Slider add test', () => {
    let slider = new Slider({ label: "sliderLabel", step: 1, min: 0, max: 10});
    expect(slider instanceof Control).toBeTruthy();
    expect(slider.getControlName()).toMatchObject("slider");
    expect(slider.getCmds()).toMatchObject(
        `slider label="sliderLabel" step="1" min="0" max="10"` 
    );
});