import { fruit } from "./fruit.js";
import { updateBody } from "./physics.js";
import { GRAVITY, GROUND_HEIGHT } from "./constants.js";
import { Ground } from "./ground.js";

var fpsInms = 1000 / 30; // 30 fps

const paper = document.getElementById("canva");
const ctx = paper.getContext("2d");

const ground = new Ground(ctx, paper);


function resizeCanvas() {
paper.width = window.innerWidth;
paper.height = window.innerHeight;
console.log("Canvas resized to: " + paper.width + "x" + paper.height);
}


function randposition(){
    var x = Math.random() * paper.width;
    var y = Math.random() * paper.height;
    return {x: x, y: y};
    

}


resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var fruits = new Set(); 

function init() {
    ground.draw();

    for (let i = 0; i < 5; i++) {
        const { x, y } = randposition();
        var tempfurit = new fruit(x, y, "red", ctx);
        fruits.add(tempfurit); //add and draw the fruit
        tempfurit.draw();

    }
}


function updatefruits() {   

        for (let f of fruits) {

            updateBody(f, fpsInms/1000); // Update physics with 30 fps


            f.draw();
            }
    }


function updateFrame() {
    //clear canvas
    ctx.clearRect(0, 0, paper.width, paper.height);

    ground.draw(); // Draw the ground
    updatefruits();
    
//set frame rate using set time out to 30 fps
    setTimeout(updateFrame, fpsInms);
}

init(); // Initialize the game
updateFrame(); // Start the update loop
