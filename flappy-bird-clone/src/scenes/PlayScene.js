import Phaser from "phaser";
class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScence");
    this.config = config;

    this.bird = null;
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("bird", "assets/bird.png");
  }

  create() {
    //x asis, y axis, img key
    this.add.image(0, 0, "sky").setOrigin(0);
    // bird
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
      .setOrigin(0);

    this.bird.body.gravity.y = 400;
  }

  update() {}
}

export default PlayScene;