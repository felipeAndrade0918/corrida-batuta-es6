import Phaser from 'phaser';

import GameState from './states/Game';

export default class MainGame extends Phaser.Game {

    constructor() {
        super(320, 240, Phaser.AUTO, 'gameContainer');

        this.state.add('Game', GameState, true);
    }
}

window.game = new MainGame();