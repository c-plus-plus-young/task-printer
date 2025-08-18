const cron = require("node-cron");

const { spawn } = require('child_process');


// // Run at 7:00 AM on Monday (1), Wednesday (3), and Friday (5)
// cron.schedule("0 7 * * 1,3,5", () => {
//     console.log("Running scheduled task at 7AM on Mon/Wed/Fri");
//     // Your function here
//     myTask();
// });
let workout_arm_day = 
// 12345678901234567890123456789012345
`Arm Day

Warm up (10 min):
5min row machine/arm bike
2min band pull aparts/wall slides
1min shoulder shrugs + wrist rolls
2min light dynamic stretches

Cardio (20 min):
Elliptical challenge:
2min 1/1min off
Repeat 4 cycles

Strength
Beginner Upper Body Circuit (30min):
3 rounds, alternate with partner
10 Dumbbell chest presses (bench)
8-10 Assisted pull-up/lat pulldowns
12 cable tricep pushdowns
10 dumbbell bicep curls
10 shoulder presses (machine)
15 (per side) seated ab twist`;
let workout_leg_day = ``
let workout_full_body_day = ``

cron.schedule("0 7 * * 1", () => {
    console.log("Running scheduled task at 7AM on Mon");
    // myTask(workout_arm_day);
    myTask(workout_arm_day);
});
cron.schedule("6 20 * * 0", () => {
    console.log("Running scheduled task at 7AM on Mon");
    // myTask(workout_arm_day);
    myImage('media/hammerhead.png')
});

function myTask(message) {

    // Spawn Python process
    const python = spawn('python3', ['src/print.py', message]);
    
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

function myImage(image) {
    
    // Spawn Python process
    const python = spawn('python3', ['src/print_image.py', image]);
    
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
