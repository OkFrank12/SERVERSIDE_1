import http, { IncomingMessage } from 'http';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse<IncomingMessage>) => {
    const chromeDevice = req.rawHeaders[7].split('"')[1];
    const edgeDevice = req.rawHeaders[7].split('"')[1];
    const OS = req.rawHeaders[11].replace('"Windows"', 'Windows');

    res.write(`You are using ${OS} on this device`);
    // console.log(OS);

    // if (chromeDevice === undefined) {
    //     res.write(`You are using ${edgeDevice} to access me`);
    // } else {
    //     res.write(`You are using ${chromeDevice} to access me`);
    // }
    res.end();
});

server.on('connection', () => {
    console.log("A user connected!")
});

server.listen(3322, () => {
    console.log("Server is online!")
});