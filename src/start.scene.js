import { Scene } from "phaser";

export class StartScene extends Scene {
  constructor() {
      super({ key: 'StartScene' });
  }

  create() {
    let div = document.createElement('div');
    div.setAttribute('id', 'startMenu')
    div.classList.add('gameUI');
    div.classList.add('displayFlex');

    let h1 = document.createElement('h1')
    h1.textContent = 'Apple Catcher'

    let p1 = document.createElement('p');
    p1.textContent = 'You have 3 lives to catch apples!'

    let p2 = document.createElement('p');
    p2.textContent = 'If you catch more than 30 apples you win'

    let p3 = document.createElement('p');
    p3.textContent = 'Apples will fall faster with time, but don\'t worry - you will start moving faster as well'

    let p4 = document.createElement('p');
    p4.textContent = 'Click the start button to begin'

    let startButton = document.createElement('button');
    startButton.textContent = 'START'

    startButton.addEventListener('click', () => {     
        document.querySelectorAll('.gameUI').forEach(el => {
            el.classList.remove('displayFlex');
            el.classList.add('displayNone')
        })
        this.scene.start('GameScene');
    })

    div.appendChild(h1);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(startButton);

    this.add.dom(100, 100, div)

    div.parentElement.classList.add('gameUI')
  }
}