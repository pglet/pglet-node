    def update(self, *controls, fire_and_forget=False):
        cmd = "set"
        if fire_and_forget:
            cmd = "setf"

        lines = []

        for control in self._expand_controls_argv(*controls):
            lines.append(control.get_cmd_str(update=True))

        if len(lines) == 0:
            return

        slines = "\n".join(lines)
        self.send(f'{cmd}\n{slines}')


for i = range(11):
    prog.label = f"Doing step {i}..."
    prog.value = i * 10
    page.update(prog, fire_and_forget=True)