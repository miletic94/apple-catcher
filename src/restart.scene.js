import { Scene } from "phaser";

export class RestartScene extends Scene {
  constructor() {
      super({ key: 'RestartScene' });
  }

  init(data) {
    this.finalScore = data.score;
  }

  create() {
    let div = document.createElement('div');
    div.setAttribute('id', 'restartMenu')
    div.classList.add('gameUI');
    div.classList.add('displayFlex');

    let p1 = document.createElement('p');
    p1.textContent = 'Game Over'

    let p2 = document.createElement('p');
    p2.textContent = `You ${this.finalScore >= 30 ? 'win!': 'lose...'}`

    let p3 = document.createElement('p');
    p3.textContent = `Final score: ${this.finalScore}`

    let restartButton = document.createElement('button');
    restartButton.textContent = 'RESTART'
    restartButton.addEventListener('click', () => {
        document.querySelectorAll('.gameUI').forEach(el => {
            el.classList.remove('displayFlex');
            el.classList.add('displayNone')
        })
      this.scene.start('GameScene');
    })

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(restartButton);

    this.add.dom(100, 100, div)

    div.parentElement.classList.add('gameUI')
  }
}
