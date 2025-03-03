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
  }

  preload() {
    this.load.image('bg', '/assets/bg.png');
  }
  
  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
  }

  update() {

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