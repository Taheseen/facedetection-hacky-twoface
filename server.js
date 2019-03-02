const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(function (req, res) {
    res.send('say what');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('open', function open() {
        console.log('connected');
    });

    ws.on('close', function close() {
        console.log('disconnected');
    });

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    console.log('First connected');
    ws.send('{}');
});

server.listen(9090, function listening() {
    console.log('Listening on %d', server.address().port);
});