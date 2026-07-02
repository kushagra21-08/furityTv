export class fruit{
    constructor(x, y, color,ctx){
        this.x = x;
        this.y = y;
        this.color = randomColor();
        this.ctx = ctx;
    }


    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
    }
    updatePosition(newX, newY){
        this.x = newX;
        this.y = newY;
    }
}

function randomColor() {
    const colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "purple",
        "pink"
    ];

    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}