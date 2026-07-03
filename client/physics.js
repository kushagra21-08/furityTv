import { GRAVITY } from './constants.js';

export function updateBody(body, dt ,ground = null, des = false) {

    body.ay = GRAVITY; // Gravity acceleration (pixels/s^2)

    body.vx += body.ax * dt;
    body.vy += body.ay * dt;

    body.x += body.vx * dt;
    body.y -= body.vy * dt;

   
   if(des==true){
    if ((body.y + body.radius >= ground.upper) && (body.vy > 0)) { // Check if the fruit is on the ground
        body.vy *= -1; // Bounce off the ground
    }
   }

}