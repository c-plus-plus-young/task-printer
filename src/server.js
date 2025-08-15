const cron = require("node-cron");

const { spawn } = require('child_process');


// // Run at 7:00 AM on Monday (1), Wednesday (3), and Friday (5)
// cron.schedule("0 7 * * 1,3,5", () => {
//     console.log("Running scheduled task at 7AM on Mon/Wed/Fri");
//     // Your function here
//     myTask();
// });

cron.schedule("15 10 * * 5", () => {
    console.log("Running scheduled task at 7AM on Mon/Wed/Fri");
    // Your function here
    myTask();
});

function myTask() {

    // Spawn Python process
    // const python = spawn('python3', ['print.py', 'arg1', 'arg2']);
    const python = spawn('python3', ['print.py']);

    // Listen for output
    python.stdout.on('data', (data) => {
        console.log(`Output: ${data}`);
    });

    // Listen for errors
    python.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Handle exit
    python.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
    });

}
