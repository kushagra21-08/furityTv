import { fruit } from "./fruit.js";


const paper = document.getElementById("canva");
const ctx = paper.getContext("2d");


function resizeCanvas() {
paper.width = window.innerWidth;
paper.height = window.innerHeight;
console.log("Canvas resized to: " + paper.width + "x" + paper.height);
}


resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var fruits = new Set(); 


for (let i = 0; i < 5; i++) {
   //fruits.add(new fruit(100 + i * 40, 200 + i * 40, "red", ctx));
    fruits.add(new fruit(100 + i * 40, 200 + i * 40, "red", ctx));
}

console.log(fruits);

for (let f of fruits) {
    f.draw();
    }