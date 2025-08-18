const net = require('net');
const log = console.log;
const port = 1024;

const handler = {
    retries: 0,
    maxRetries: 10,
    interval: 5000,
    quit: false,
    // JS shorthand for function
    connect() {
        this.retries = 0;
        log('Connecting. . .');
        this.conn = net.createConnection(port);
        this.conn.on('close', this.close.bind(this));
        this.conn.on('error', this.error.bind(this));
        process.stdin.resume();
        process.stdin.on('data', this.inputHandler.bind(this));
        this.conn.pipe(process.stdout, {end: false});
    },
    close() {
        log('Connection closed... Trying again!');
        process.stdin.pause();
        process.stdin.removeAllListeners();
        // this.reconnect();
    },
    error() {
        log(`Error: ${err}`);
        process.stdin.removeAllListeners();
        this.reconnect();
    },
    reconnect() {
        if (this.retries >= this.maxRetries) {
            throw new Error('The connection  is seriously broken!');
        } else {
            this.retries++;
            // since setTimetout is global it must be bound
            setTimeout(this.connect.bind(this), this.interval)
        }
        log('Reconnecting...')
    },
    inputHandler(data) {
        if(data.toString().trim().toUpperCase() === 'QUIT') {
            this.quit = true;
            log('QUIT!');
            this.conn.end();
            process.stdin.pause();
            process.exit(0);
        } else {
            this.conn.write(data);
        }
    }
};
handler.connect();