const orientationBox = document.getElementById("orientation");
const motionBox = document.getElementById("motion");
const screenBox = document.getElementById("screen");

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
}

document.getElementById("start").onclick = startSensors;

function orientationHandler(e){

    orientationBox.textContent =

`Alpha (Yaw)   : ${round(e.alpha)}°
Beta (Pitch)  : ${round(e.beta)}°
Gamma (Roll)  : ${round(e.gamma)}°

Absolute : ${e.absolute}

Compass :
${round(e.webkitCompassHeading)}
`;

}

function motionHandler(e){

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