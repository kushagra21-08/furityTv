import { GROUND_HEIGHT } from './constants.js';
export class Ground {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.height = GROUND_HEIGHT; // Height of the ground in pixels
        this.upper=this.canvas.height - this.height; // Y-coordinate of the upper edge of the ground
    }

    draw() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, this.upper, this.canvas.width, this.height);
    }
}