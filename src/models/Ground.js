import Phaser from 'phaser';

export default class Ground extends Phaser.Sprite {

    constructor({game, x, y, asset}) {
        super(game, x, y);

        // Regular properties
        this.width = this.game.world.width;

        // Physics properties
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
    }
}