const Phaser = require("phaser");
const Snake = require("./Snake");
var config = {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  backgroundColor: "#bfcc00",
  parent: "phaser-example",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var snake;
var cursors;

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("food", "assets/games/snake/food.png");
  this.load.image("body", "assets/games/snake/body.png");
}

function create() {
  snake = new Snake(this, 8, 8);

  //  Create our keyboard controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  if (!snake.alive) {
    return;
  }

  /**
   * Check which key is pressed, and then change the direction the snake
   * is heading based on that. The checks ensure you don't double-back
   * on yourself, for example if you're moving to the right and you press
   * the LEFT cursor, it ignores it, because the only valid directions you
   * can move in at that time is up and down.
   */
  if (cursors.left.isDown) {
    snake.faceLeft();
  } else if (cursors.right.isDown) {
    snake.faceRight();
  } else if (cursors.up.isDown) {
    snake.faceUp();
  } else if (cursors.down.isDown) {
    snake.faceDown();
  }

  snake.update(time);
}
