
let canvas;
let ctx;
let score = 0
let gameOver = false

canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
document.body.appendChild(canvas);



let bgReady, heroReady, monsterReady=[], monsterReady2=[], lazerReady;
let bgImage, heroImage, monsterImage, monsterImages2, lazerImage;



let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png"
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/spaceship.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = [true,true]
  };
  monsterImage.src = "images/monster1.png";

  monsterImage2 = new Image();
  monsterImage2.onload = function () {
    // show the monster image
    monsterReady2 = [true,true]
  };
  monsterImage2.src = "images/monster2.png";



  lazerImage = new Image();
  lazerImage.onload = function () {
    // show the hero image
    lazerReady = true;
  };
  lazerImage.src = "images/lazer.png"

}



let bgY = -400

let heroX = 360
let heroY = 580

let monsterX = [200,550,]
let monsterY = [150,40,]

let monster2X = [50,650,]
let monster2Y = [100,300,]

let lazerX = 400
let lazerY = 400


let keysDown = {};
function setupKeyboardListeners() {
  
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


let update = function () {
  

  if ((SECONDS_PER_ROUND - elapsedTime) <= 0) {
    gameOver = true
    return
  }

  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

 
  if (37 in keysDown) { // Player is holding left key
    heroX -= 10;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 10;
  }
  lazerY -= 25;

  bgY +=4

  //   // Pick a new location for the monster.
  //   // Note: Change this to place the monster at a new, random location.
  //   monsterX = Math.random() * canvas.width - 32;
  //   monsterY = Math.random() * 400;
  //   // score++
  // }

  for (let i=0; i<2; i++){
    if (
      heroX <= monsterX[i] &&
      monsterX[i] <= heroX + 40 &&
      lazerY <= monsterY[i] &&
      monsterY[i] <= lazerY + 30
    ) {
      // monsterReady[i] = false;
       monsterX[i] = Math.random() * canvas.width -50
       monsterY[i] = Math.random() * 400;
       score ++
      
    }
  }

  for (let x=0; x<2; x++){
    if (
      heroX <= monster2X[x] &&
      monster2X[x] <= heroX + 40 &&
      lazerY <= monster2Y[x] &&
      monster2Y[x] <= lazerY + 30
    ) {
      // monsterReady[i] = false;
       monster2X[x] = Math.random() * canvas.width -50
       monster2Y[x] = Math.random() * 400;
       score ++
      
    }
  }
  

  if (heroX > canvas.width - 80) {
    heroX = canvas.width - 80;
  }
  if (heroX < 0) {
    heroX = 0;
  }

  if (lazerY >= canvas.height) {
    lazerY = 540;
  }
  if (lazerY < 0) {
    lazerY = canvas.height + 540
  }

  if(bgY >= 0){
    bgY = -400
  }

  
};


var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, bgY);
    ctx.drawImage(bgImage, 0, bgY + 400);
    ctx.drawImage(bgImage, 0, bgY + 800);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }

  if (lazerReady) {
    ctx.drawImage(lazerImage, heroX + 35, lazerY);
  }
  for (let i=0; i<2; i++){
    if (monsterReady[i]) {
      ctx.drawImage(monsterImage, monsterX[i], monsterY[i]);
    }
  }
  for (let x=0; x<2; x++){
    if (monsterReady2[x]) {
      ctx.drawImage(monsterImage2, monster2X[x], monster2Y[x]);
    }
  }
  
  if (gameOver == true) {
    ctx.fillText(`GAME OVER!  `, 350, 350);
  }
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 10, 690);
  ctx.fillText(`Score:${score}`, 720, 690);

  ctx.font = "18px Arial";
  ctx.fillStyle = "black";
};


var main = function () {
  document.getElementById('startGame')
  update();
  render();
  requestAnimationFrame(main);
};


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Let's play this game!
loadImages();
setupKeyboardListeners();
main();