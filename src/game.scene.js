import { Scene } from "phaser";
import { sizes, speedDown } from "./constants";
  
  export class GameScene extends Scene {
    constructor() {
      super('GameScene')
      this.player;
      this.cursor;
      this.playerSpeed = speedDown + 50;
      this.targetSpeed = speedDown;
      this.remainingLives = 3;
      this.points = 0;
      this.textScore;
      this.textTime;
      this.coinFx;
      this.bgMusic;
      this.emitter;
    }
  
    preload() {
      this.load.image('bg', '/assets/bg.png');
      this.load.image('basket', '/assets/basket.png');
      this.load.image('apple', '/assets/apple.png');
      this.load.image('money', '/assets/money.png');
      this.load.audio('coin', '/assets/coin.mp3');
      this.load.audio('bgMusic', '/assets/bgMusic.mp3');
    }
    
    create() {
      this.coinFx = this.sound.add('coin');
      this.bgMusic = this.sound.add('bgMusic');
      this.bgMusic.play();
  
      this.add.image(0, 0, 'bg').setOrigin(0, 0);
      this.player = this.physics.add.image(0, sizes.height - 100, 'basket').setOrigin(0, 0);
      this.player.setImmovable(true);
      this.player.body.allowGravity = false;
      this.player.setCollideWorldBounds(true);
      this.player
      .setSize(this.player.width * 3/4, this.player.height *1/20)
      .setOffset(this.player.width * 1/8, 30);
  
      this.target = this.physics.add.image(0, 0, 'apple').setOrigin(0, 0);
      this.target.setMaxVelocity(0, this.targetSpeed);
      this.target.setSize(this.target.width, this.target.height*2/7).setOffset(0, this.target.height * 2 / 3)
  
      this.killZone = this.physics.add.image(0, sizes.height, 'killZone');
      this.killZone.setSize(1000, 30);
      this.killZone.setImmovable(true);
      this.killZone.body.allowGravity = false;
      this.killZone.setVisible(false);

      this.physics.add.overlap(this.target, this.player, this.targetHit, null, this)
      this.physics.add.overlap(this.target, this.killZone, this.targetMiss, null, this)

      this.cursor = this.input.keyboard.createCursorKeys();
  
      this.textScore = this.add.text(sizes.width -120, 10, 'Score: 0', {
        font: '25px Arial',
        fill: "#000000",
      })
  
      this.textTime = this.add.text(10, 10, 'Remaining lives: 3', {
        font: '25px Arial',
        fill: "#000000",
      })
  
      this.time.addEvent({
        delay: 1000,
        callback: () => {
         this.targetSpeed += 5;
         this.target.setMaxVelocity(0, this.targetSpeed);
         this.target.setGravity(this.targetSpeed);
         this.playerSpeed = this.targetSpeed + 50;
        },
        loop: true,
      })

      this.emitter = this.add.particles(0, 0, 'money', {
        speed: 100,
        gravityY: speedDown - 200,
        scale: 0.04,
        duration: 100,
        emitting: false,
      });
      this.emitter.startFollow(this.player, this.player.width / 2, this.player.width / 2, true)
    }
  
    update() {
      const {left, right} = this.cursor;
  
      this.textTime.setText(`Lives remaining ${this.remainingLives}`)
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
  
    targetMiss() {
      console.log({lives: this.remainingLives});
      this.target.setY(0); // Reset Y position
      this.target.setX(this.getRandomX());
      this.remainingLives--; 
      if(this.remainingLives === 0) this.gameOver();
    }

    targetHit() {
      this.emitter.start();
      this.target.setY(0);
      this.target.setX(this.getRandomX());
      this.points++;
      this.coinFx.play();
      this.textScore.setText(`Score: ${this.points}`)
    }
  
    gameOver() {
        console.log('game over')
        this.scene.stop();
        this.scene.start('RestartScene', { score: this.points})
        document.querySelectorAll('.gameUI').forEach(el => {
            el.classList.remove('displayNone');
            el.classList.add('displayFlex');
        })
        this.points = 0;
    }
  }