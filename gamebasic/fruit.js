export class fruit{
    constructor(x, y, color,ctx, vx = 0, vy = 0, ax = 0, ay = 0){
        this.x = x;
        this.y = y;
        this.radius = 40;
        this.color = randomColor();
        this.ctx = ctx;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
    }


    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
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