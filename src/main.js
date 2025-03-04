import './style.css'
import { Game, WEBGL } from 'phaser'
import { StartScene } from './start.scene'
import { GameScene } from './game.scene'
import { RestartScene } from './restart.scene'
import { sizes, speedDown } from './constants'


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
  parent: "phaserGame",
  dom: {
    createContainer: true
  },
  scene: [StartScene, GameScene, RestartScene]
}

const game = new Game(config);