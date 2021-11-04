import Phaser from "phaser";

const config = {
  // WebGL (Web Graphics Library) JS API for rendering 2d and 3d graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    //arcade physics default mode (physics plugin that manages physics simulation)
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const VELOCITY = 200;

let flapVelocity = 250;
let bird;

let upperPipe;
let lowerPipe;

const pipeVerticalDistanceRange = [150, 250];
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
let pipeVerticalPosition = Phaser.Math.Between(
  0 + 20,
  config.height - 20 - pipeVerticalDistance
);
const initialBirdPosition = {
  x: config.width * 0.1,
  y: config.height / 2,
};

// loading assets (music, images, animation)
function preload() {
  // this context is our scene and it
  // contains functions and properties  we can use
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

// initializing objects on the screen
function create() {
  //x asis, y axis, img key
  this.add.image(0, 0, "sky").setOrigin(0);
  // bird
  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, "bird")
    .setOrigin(0);

  bird.body.gravity.y = 400;
  upperPipe = this.physics.add
    .sprite(400, pipeVerticalPosition, "pipe")
    .setOrigin(0, 1);
  lowerPipe = this.physics.add
    .sprite(400, upperPipe.y + pipeVerticalDistance, "pipe")
    .setOrigin(0, 0);

  this.input.on("pointerdown", flap);

  this.input.keyboard.on("keydown_SPACE", flap);
}

// t0 = 0px/sec
// t1 = 200px/sec
// t2 = 400px/sec
// t3 = 600px/sec
console.log("test");
//60fps s
// 60 times / second
// 16 * 60ms = around 1000ms
function update(time, delta) {
  if (
    bird.body.position.y <= 0 - bird.body.height ||
    bird.body.position.y >= config.height
  ) {
    restartBirdPosition();
  }
}

const flap = () => {
  bird.body.velocity.y = -flapVelocity;
};

const restartBirdPosition = () => {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
};

new Phaser.Game(config);
