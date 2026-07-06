const socket = new WebSocket("ws://192.168.1.4:8088"); // Replace with your computer's IP

socket.onopen = () => {
    console.log("Connected!");

    socket.send("Hello from client!");
};

socket.onmessage = (event) => {
    console.log("Received:", event.data);
};

socket.onclose = () => {
    console.log("Disconnected");
};

socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
};

