import { Control, Progress } from "../src/index";

test('Progress add test', () => {
    let progress = new Progress({ value: 10, label: "progressLabel"});
    expect(progress instanceof Control).toBeTruthy();
    expect(progress.getControlName()).toBe("progress");
    expect(progress.getCmds()).toMatchObject([
        { indent: 0, values: ['progress'], attrs: {value: '10', label: 'progressLabel'}, commands: [] }
    ]);
});

