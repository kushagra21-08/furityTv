import { GRAVITY } from './constants.js';

export function updateBody(body, dt) {

    body.ay += GRAVITY; // Gravity acceleration (pixels/s^2)

    body.vx += body.ax * dt;
    body.vy += body.ay * dt;

    body.x += body.vx * dt;
    body.y += body.vy * dt;
}