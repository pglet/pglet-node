import Slider from "../src/Slider";
import { Control } from "../src/index";

test('Slider add test', () => {
    let slider = new Slider({ label: "sliderLabel", step: 1, min: 0, max: 10});
    expect(slider instanceof Control).toBeTruthy();
    expect(slider.getControlName()).toBe("slider");
    expect(slider.getCmdStr()).toBe(
        `slider label="sliderLabel" step="1" min="0" max="10"` 
    );
});