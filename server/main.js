const os = require("os");
const interfaces = os.networkInterfaces();
var myadd=null
var cons = new Set();
var msg = new Set();
const fs = require("fs");

for (const name in interfaces) {
    for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
            console.log(iface.address);
            myadd=iface.address
        }
    }
}


const WebSocket = require('ws');

// Create a WebSocket server on port 8088
const wss = new WebSocket.Server({ 
    host: myadd,    
    port: 8088 

});

console.log('WebSocket server is running on ws://' + myadd + ':8088');

// Connection event handler
wss.on('connection', (ws, req) => {
  console.log('New client connected');
  cons.add(ws);
  console.log('Client IP:', req.socket.remoteAddress);
  console.log('Client Port:', req.socket.remotePort);
  console.log('Client URL:', req.url);
  console.log('Client Protocol:', req.protocol);
  console.log('Client Headers:', req.headers);
  console.log('Client Cookies:', req.headers.cookie);  

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server!');

  // Message event handler
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
    msg.add(message);

    var messages = JSON.parse(fs.readFileSync("data.json", "utf8"));

    // Append new message
    messages.push(message.toString());

    // Write it back
    fs.writeFileSync(
        "data.json",
        JSON.stringify(messages, null, 2)
    );

  });

  // Close event handler
  ws.on('close', () => {
    console.log('Client disconnected');
    cons.delete(ws);
  });

});



