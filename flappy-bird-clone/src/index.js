import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";

const WIDTH = 800;
const HEIHGT = 600;
const BIRD_POSITION = {
  x: WIDTH * 0.1,
  y: HEIHGT / 2,
};
const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIHGT,
  startPosition: BIRD_POSITION,
};
const config = {
  // WebGL (Web Graphics Library) JS API for rendering 2d and 3d graphics
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    //arcade physics default mode (physics plugin that manages physics simulation)
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [new MenuScene(SHARED_CONFIG), new PlayScene(SHARED_CONFIG)],
};

new Phaser.Game(config);
