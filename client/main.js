import { fruit } from "./fruit.js";
import { updateBody } from "./physics.js";
import { GRAVITY, GROUND_HEIGHT } from "./constants.js";
import { Ground } from "./ground.js";

var fpsInms = 1000 / 60; // 30 fps

const paper = document.getElementById("canva");
const ctx = paper.getContext("2d");




function resizeCanvas() {
paper.width = window.innerWidth;
paper.height = window.innerHeight;
console.log("Canvas resized to: " + paper.width + "x" + paper.height);
}


function randposition(){
    var x = Math.random() * paper.width;
    //var y = Math.random() * paper.height;
    var y = paper.height + (Math.floor(Math.random() * 41) + 40);
    return {x: x, y: y};
    

}

function randVelocity(){
    var yy = Math.floor(Math.random() * 501) + 1000;
    var xx = Math.floor(Math.random() * 501) + 1000
    return yy
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var fruits = new Set(); 

function init() {
    //ground.draw();

    for (let i = 0; i < 5; i++) {
        const { x, y } = randposition();
        var tempfurit = new fruit(x, y, "red", ctx,50, randVelocity());
        fruits.add(tempfurit); //add and draw the fruit
        tempfurit.draw();

    }
}



function updatefruits() {   

        for (let f of fruits) {

            if (f.y > paper.height + f.radius) { // Check if the fruit is below the canvas
                fruits.delete(f); // Remove the fruit from the set
                const { x, y } = randposition(); // Generate a new random position
                var tempfurit = new fruit(x, y, "red", ctx,50, randVelocity()); // Create a new fruit
                fruits.add(tempfurit); // Add the new fruit to the set
            }
            else{
            console.log
            updateBody(f, fpsInms/1000); // Update physics with 30 fps
            f.draw();
            }
        }


}

function updateFrame() {
    //clear canvas
    ctx.clearRect(0, 0, paper.width, paper.height);

    //ground.draw(); // Draw the ground
    updatefruits();
    
//set frame rate using set time out to 30 fps
    setTimeout(updateFrame, fpsInms);
}


//const ground = new Ground(ctx, paper);
init(); // Initialize the game
updateFrame(); // Start the update loop
