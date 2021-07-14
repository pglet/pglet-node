var ps = require("ps-node");
import { exec } from 'child_process';

module.exports = () => {
  console.log("Cleaning up test environment...");

  // A simple pid lookup
  ps.lookup(
    {
      command: "pglet"
    },
    function (err, resultList) {
      if (err) {
        throw new Error(err);
      }

      resultList.forEach(function (process) {
        if (process) {
          console.log( "PID: %s, COMMAND: %s, ARGUMENTS: %s", process.pid, process.command, process.arguments);

            // Kills a PID and all child process
            exec(`taskkill /pid ${process.pid} /t /f`, (err) => {
                if (err) {
                    throw err
                }
            })
        }
      });
    }
  );
};
