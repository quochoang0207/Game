/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;
let score = 0
let gameOver = false

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 750;
canvas.height = 650;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady, lazerReady;
let bgImage, heroImage, monsterImage, lazerImage;


let startTime = Date.now();
const SECONDS_PER_ROUND = 1000;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/backgroundblack.png"
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/spaceship.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";

  lazerImage = new Image();
  lazerImage.onload = function () {
    // show the hero image
    lazerReady = true;
  };
  lazerImage.src = "images/lazer.png"

}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = 350
let heroY = 550

let monsterX = 250;
let monsterY = 100;

let lazerX = 400
let lazerY = 400

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  console.log(heroX, " lazer ", lazerX,);

  // Update the time.

  if ((SECONDS_PER_ROUND - elapsedTime) <= 0) {
    gameOver = true
    return
  }

  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  // if (38 in keysDown) { // Player is holding up key
  //   heroY -= 5;
  // }
  // if (40 in keysDown) { // Player is holding down key
  //   heroY += 5;
  // }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 10;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 10;
  }
  lazerY -= 30;

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  // if (
  //   // lazerX <= (monsterX + 32)
  //   // && monsterX <= (lazerX + 5)
  //    lazerY <= (monsterY + 32)
  //    && monsterY <= (lazerY + 20)
  // ) {
  //   // Pick a new location for the monster.
  //   // Note: Change this to place the monster at a new, random location.
  //   monsterX = Math.random() * canvas.width - 32;
  //   monsterY = Math.random() * 400;
  //   // score++
  // }
  if (
    heroX <= monsterX
    && monsterX <= heroX
    && lazerY <= monsterY
    && monsterY <= lazerY
  ) {
    monsterX = Math.random() * canvas.width - 32;
    monsterY = Math.random() * 400;
  }

  if (heroX > canvas.width - 80) {
    heroX = canvas.width - 80;
  }
  if (heroX < 0) {
    heroX = 0;
  }

  if (lazerY >= canvas.height) {
    lazerY = 550;
  }
  if (lazerY < 0) {
    lazerY = canvas.height + 550
  }

  // if(heroY >= canvas.height - 32){
  //   heroY = 0;
  // }
  // if(heroY < 0){
  //   heroY = canvas.height-32
  // }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }

  if (lazerReady) {
    ctx.drawImage(lazerImage, heroX + 46, lazerY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
  if (gameOver == true) {
    ctx.fillText(`GAME OVER!  `, 220, 250);
  }
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
  ctx.fillText(`Score:${score}`, 20, 120);

  ctx.font = "18px Arial";
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};



// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();