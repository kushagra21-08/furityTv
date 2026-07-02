const paper = document.getElementById("canva");
const ctx = paper.getContext("2d");


function resizeCanvas() {
paper.width = window.innerWidth;
paper.height = window.innerHeight;
console.log("Canvas resized to: " + paper.width + "x" + paper.height);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

ctx.moveTo(0, 0);
ctx.lineTo(200, 100);

ctx.fillStyle = "red";
ctx.fillRect(0, 0, 150, 75);

var fruits = new Set(); 

class fruit{
    constructor(x, y, color, shape){
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
    }


    
}