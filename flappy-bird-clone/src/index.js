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
const PIPES_TO_RENDER = 4;

let flapVelocity = 250;
let bird;
let pipes = null;

let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [500, 550];

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

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    //create pipe sprite and add it to groups
    const upperPipe = pipes.create(0, 0, "pipe").setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, "pipe").setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

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

const placePipe = (uPipe, lPipe) => {
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(
    ...pipeVerticalDistanceRange
  );
  const pipeVerticalPosition = Phaser.Math.Between(
    0 + 20,
    config.height - 20 - pipeVerticalDistance
  );
  const pipeHorizontalDistance = Phaser.Math.Between(
    ...pipeHorizontalDistanceRange
  );

  uPipe.x = rightMostX + pipeHorizontalDistance;
  uPipe.y = pipeVerticalPosition;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
};

const flap = () => {
  bird.body.velocity.y = -flapVelocity;
};

function getRightMostPipe() {
  let rightMostX = 0;
  debugger;
  pipes.getChildren().forEach(function (pipe) {
    debugger;
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

const restartBirdPosition = () => {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
};

new Phaser.Game(config);
