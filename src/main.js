import './style.css'
import { Game, Scene, WEBGL } from 'phaser'

const sizes = {
  width: 500,
  height: 500,
}

const speedDown = 300;

class GameScene extends Scene {
  constructor() {
    super('scene-game')
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 50;
    this.points = 0;
  }

  preload() {
    this.load.image('bg', '/assets/bg.png');
    this.load.image('basket', '/assets/basket.png');
    this.load.image('apple', '/assets/apple.png');
  }
  
  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.player = this.physics.add.image(0, sizes.height - 100, 'basket').setOrigin(0, 0);
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.player
    .setSize(this.player.width, this.player.height *3/4)
    .setOffset(0, 40);

    this.target = this.physics.add.image(0, 0, 'apple').setOrigin(0, 0);
    this.target.setMaxVelocity(0, speedDown);

    this.physics.add.overlap(this.target, this.player, this.targetHit, null, this)

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update() {
    const {left, right} = this.cursor;

    if(this.target.y >= sizes.height) {
      this.target.setY(50);
      this.target.setX(this.getRandomX())
    }

    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed)
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed)
    } else {
      this.player.setVelocityX(0);
    }
  }

  getRandomX() {
    return Math.floor(Math.random() * sizes.width - 20)
  }

  targetHit() {
    this.target.setY(0);
    this.target.setX(this.getRandomX());
    this.points++;
  }
}

const config = {
  type: WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: speedDown
      },
      debug: true
    }
  },
  scene: [GameScene]
}

const game = new Game(config);