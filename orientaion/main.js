const orientationBox = document.getElementById("orientation");
const motionBox = document.getElementById("motion");
const screenBox = document.getElementById("screen");

const socket = new WebSocket("ws://192.168.1.4:8088");

const sensorData = {
    alpha: 0,
    beta: 0,
    gamma: 0,
    compass:0,
    absolute:null,


    ax: 0,
    ay: 0,
    az: 0,
    axg: 0,
    ayg:0,
    azg:0,

    rotationAlpha: 0,
    rotationBeta: 0,
    rotationGamma: 0,

    interval: 0,

    screenOrientation: 0,
    screenType: null
};


socket.onopen = () => {
    console.log("Connected!");

    function sendUpdate() {

        if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(sensorData));}
         else { console.log("WebSocket is not open. Ready state: " + socket.readyState); }

        setTimeout(sendUpdate, 1000); // Send updates every second
    }

        async function startSensors(){

            // iPhone permission
            if(typeof DeviceMotionEvent !== "undefined" &&
            typeof DeviceMotionEvent.requestPermission === "function"){

                const response = await DeviceMotionEvent.requestPermission();

                if(response !== "granted"){
                    alert("Permission denied");
                    return;
                }
            }

            if(typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"){

                await DeviceOrientationEvent.requestPermission();
            }


            window.addEventListener("deviceorientation", orientationHandler);

            window.addEventListener("devicemotion", motionHandler);

            updateScreen();

            screen.orientation.addEventListener("change", updateScreen);

            sendUpdate(); // Start sending updates to the server
        }

        document.getElementById("start").onclick = startSensors;

        function orientationHandler(e){

            sensorData.alpha = round(e.alpha);
            sensorData.beta = round(e.beta);
            sensorData.gamma = round(e.gamma);
            sensorData.compass = round(e.webkitCompassHeading);
            sensorData.absolute = e.absolute;

            orientationBox.textContent =

        `Alpha (Yaw)   : ${round(e.alpha)}°
        Beta (Pitch)  : ${round(e.beta)}°
        Gamma (Roll)  : ${round(e.gamma)}°

        Absolute : ${e.absolute}

        Compass :
        ${round(e.webkitCompassHeading)}`;

        }

        function motionHandler(e){

            sensorData.ax = round(e.acceleration.x);
            sensorData.ay = round(e.acceleration.y);
            sensorData.az = round(e.acceleration.z);
            sensorData.axg = round(e.accelerationIncludingGravity.x);
            sensorData.ayg = round(e.accelerationIncludingGravity.y);
            sensorData.azg = round(e.accelerationIncludingGravity.z);
            sensorData.interval = round(e.interval);
            sensorData.rotationAlpha = round(e.rotationRate.alpha);
            sensorData.rotationBeta = round(e.rotationRate.beta);
            sensorData.rotationGamma = round(e.rotationRate.gamma);


            motionBox.textContent =

        `Acceleration

        X : ${round(e.acceleration.x)}
        Y : ${round(e.acceleration.y)}
        Z : ${round(e.acceleration.z)}

        -------------------------

        Acceleration + Gravity

        X : ${round(e.accelerationIncludingGravity.x)}
        Y : ${round(e.accelerationIncludingGravity.y)}
        Z : ${round(e.accelerationIncludingGravity.z)}

        -------------------------

        Rotation Rate

        Alpha : ${round(e.rotationRate.alpha)}
        Beta  : ${round(e.rotationRate.beta)}
        Gamma : ${round(e.rotationRate.gamma)}

        -------------------------

        Interval

        ${round(e.interval)} ms`;

        }


        function updateScreen(){

            sensorData.screenAngle = round(screen.orientation.angle);
            sensorData.screenType = screen.orientation.type;

            screenBox.textContent =

        `Screen Angle

        ${screen.orientation.angle}

        Type

        ${screen.orientation.type}`;
        }

        function round(v){
            if(v == null) return "-";
            return Number(v).toFixed(5);
        }



};