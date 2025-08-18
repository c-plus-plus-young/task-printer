// NodeJS server to run scheduled tasks
// Source venv python modules, then run from root folder
const cron = require("node-cron");
const log = console.log();

const { spawn } = require('child_process');

// Use below as guide for character limit, 
// including spaces for comment
// 12345678901234567890123456789012345
// Workouts
let workout_arm_day = 
`Arm Day

Warm-up (10 min):
5 min row machine/arm bike
2 min band pull aparts/wall slides
1 min shoulder shrugs + wrist rolls
2 min light dynamic stretches

Cardio (20 min):
Elliptical Challenge:
2 min on/1min off
Repeat 4 cycles

Strength - Beginner Upper 
Body Circuit (30 min):
3 rounds, alternate with partner
10 dumbbell chest presses (bench)
8-10 assisted pull-up/lat pulldowns
12 cable tricep pushdowns
10 dumbbell bicep curls
10 shoulder presses (machine)
15 (per side) seated ab twist`;
let workout_leg_day = 
`Leg/Lower Body Day

Warm-up (10 min):
5 min bike/elliptical (low res)
2 min walking lunges
1 min to touches/hamstring stretch
2 min glute activation (banded
or bodyweight)

Cardio (20 min):
Partner Bike Intervals
Partner A: 1 min moderate pace
Partner B: rest/stretch
switch every minute, 10 rounds total

Strength - Beginner Lower 
Body Circuit (30 min):
3 rounds, alternate with partner
10 goblet squats
10 reps each leg dumbbell 
step-ups (box/bench)
10 leg curl machine (seated/lying)
20-30 sec plank
15 seated calf raises (machine)

Finish with hamstring/quad stretch`;
let workout_full_body_day = 
`Full Body Day

Warm-up (10 min):
5 min treadmill brisk walk
1 min arm Circles
1 min leg swings (forward/bakckward)
2 min dynamic stretching (reach down,
twist, side bends)
1 min bodyweight squats

Cardio (20 min):
Partner Treadmill Intervals 
(walk/jog swap):
Partner A walks 3.0-3.5 incline
Partner B jogs 1.0 incline, 
4.5-5.0 speed
Switch every 2 min, repeat 5 rounds

Strength - Beginner Full 
Body Circuit (30 min):
3 rounds, alternate with partner
10-12 leg press (machine)
10-12 chest press (machine)
10 lat pulldown (wide grip)
10 seated row machine
15 bodyweight glute bridges

Finish with hamstring/quad/
shoulder stretch`;
// Other tasks:
let read = `Read 30 minutes`;
let scriptures = `Read scriptures for 30 min`;
let photos = `Practice photography for 10 min`;
let gameDev = `Practice Game Dev 30 min`;
let tidy = `Put away 10 things`;

// Cron job syntax:
// Minute (0-59)
// Hour (0-23) 
// Day of Month (0-31)
// Month (1-12)
// Day of Week (0-7) - Sunday is 0 and 7
// * is all 
// - is range (i.e. 2-4)
// , is for multiples (i.e. 3,5,7)
// / is for interval/step (i.e. */15 means every 15 min)
// L is last (i.e. 5L means last Friday)
// W is weekday (M-F)
// # nth day of week (i.e. 2#3 for third Tuesday)
cron.schedule("0 7 * * 1", () => {
    log("Printing arm day workout - 7AM on Mon");
    myTask("message", workout_arm_day);
});
cron.schedule("0 7 * * 3", () => {
    log("Printing leg day workout - 7AM on Wed");
    myTask("message", workout_leg_day);
});
cron.schedule("0 7 * * 5", () => {
    log("Printing full body day workout - 7AM on Fri");
    myTask("message", workout_full_body_day);
});
cron.schedule("0 8 * * *", () => {
    log("Printing scripture study reminder - 8AM");
    myTask("message", scriptures);
});
cron.schedule("0 17 * * *", () => {
    log("Printing reading reminder - 5PM");
    myTask("message", read);
});
cron.schedule("30 8 * * *", () => {
    log("Printing photo practice reminder - 8:30AM");
    myTask("message", photos);
});
cron.schedule("0 16 * * *", () => {
    log("Printing Game Dev practice reminder - 4PM");
    myTask("message", gameDev);
});
cron.schedule("0 20 * * *", () => {
    log("Printing tidy up reminder - 8PM");
    myTask("message", tidy);
});

// example image schedule
// cron.schedule("6 20 * * 0", () => {
//     log("Running scheduled task at 7AM on Mon");
//     myImage('media/hammerhead.png')
// });

// data is a message (text) or image file, 
// indicated by type
function myTask(type, data) {
    // Spawn Python process
    if (type === "message") {
        const python = spawn('python3', ['src/print.py', data]);
    } else {
        const python = spawn('python3', ['src/print_image.py', data]);
    }
    // Listen for output
    python.stdout.on('data', (data) => {
        log(`Output: ${data}`);
    });
    // Listen for errors
    python.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });
    // Handle exit
    python.on('close', (code) => {
        log(`Python process exited with code ${code}`);
    });
}

const net = require('net');
const server = net.createServer(onConnection);
const port = 1024;

let count = 0;
let users = {};

server.listen(port, function onListen() {
    log(`Now listening on port : ${port}`);
});
function onConnection(conn) {
    const message = `Welcome to <Task Printer \\>
    ${count} other people are connected at this time...
    Please write your name and press enter...\n`;
    conn.setEncoding('utf8');
    conn.write(message);
    let name;
    count++;
    conn.on('data', function onData(data) {
        data = data.replace("\n", "");
        if(!name) {
            if(users[data]) {
                conn.write(`Name: ${data} already taken. Choose another!\n`);
            } else {
                name = data;
                users[name] = conn;
                shoutOut(`${name} has joined the room!\n`);
            }
        } else {
            shoutOut(`${name}: ${data}\n`);
        }
    });
    conn.on('close', function onClose() {
        count -= 1;
        delete users[name];
        shoutOut(`${name} has left the chat!\n`);
    });

    function shoutOut(msg) {
        shoutOut(`Printing message`);
        myTask("message", msg);
        Object.keys(users)
            .forEach(user => {
                if (user != name) {
                    const connection = users[user];
                    connection.write(msg);
                }
            });
    };
};