import Phaser from 'phaser';

export default class Person extends Phaser.Sprite {

    constructor({game, x, y, asset}) {
        super(game, x, y, asset);

        // Regular properties
        this.animations.add('walking', [6, 7, 8, 7], 4, true);
        this.anchor.set(0.5, 0.7);
        this.scale.set(1.5, 1.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.bringToTop();

        // When extending Phaser.Sprite we need to set this property explicitly
        this.alive = true;
        this.events.onKilled.add(this.removePerson, this);

        // Physics properties
        this.game.physics.arcade.enable(this);
        this.body.setSize(13, 28, 7, 15);
        this.body.velocity.x = -200;

        this.animations.play('walking');   
    }

    removePerson(person) {
        if (person.parent) {
            person.parent.removeChild(person);
        }
        
        person.destroy;
    };
}