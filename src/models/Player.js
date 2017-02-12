import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
    
    constructor({ game, x, y, asset, jumpFx, hitFx }) {
        super(game, x, y, asset);

        // Regular properties
        this.animations.add('running', [6, 7, 8, 7], 8, true);
        this.anchor.set(0.5, 0.7);
        this.scale.set(1.5, 1.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        // When extending Phaser.Sprite we need to set this property explicitly
        this.alive = true;

        // Physics properties
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = 1000;
        this.body.setSize(17, 35, 8, 10);
        this.body.bounce.set(0.3);

        // Custom properties
        this.health = 3;
        this.jumpFx = jumpFx;
        this.hitFx = hitFx;

        this.animations.play('running');
        this.game.add.existing(this);
    }

    // This function handles the input for either the mouse or mobile devices
    handleInput () {
        if ((this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) && this.body.touching.down) {
            this.body.velocity.y = -400;
            //this.jumpFx.play();
        }
    };

    damagePlayer() {
        // If the player is not invincible then we can damage him
        if (!this.invincibility) {
            //this.hitFx.play();
            this.damage(1);

            // We remove the last heart since we took damage
            this.hearts[this.hearts.length -1].kill();
            this.hearts.splice(this.hearts.length - 1, 1);
            
            // Now the player is invincible for the next 2 seconds
            this.invincibility = true;
            this.game.time.events.add(2000, this.toggleInvincibility, this, this);

            // Animations for the invicibility frames
            this.playerIsInvencible = this.game.add.tween(this);
            this.playerIsInvencible.to({ alpha: 0.3 }, 500);
            this.playerIsInvencible.to({ alpha: 1 }, 500);
            this.playerIsInvencible.to({ alpha: 0.3 }, 500);
            this.playerIsInvencible.to({ alpha: 1 }, 500);

            this.playerIsInvencible.start();
            this.playerIsInvencible.onComplete.removeAll();
        }
    };

    toggleInvincibility() {
        this.invincibility = false;
    };

    // Creates some heart sprites which will act as the player's health
    setupHealth() {
        this.hearts = [];
        this.hearts.push(this.game.add.sprite(10, 10, 'heart'));
        this.hearts.push(this.game.add.sprite(25, 10, 'heart'))
        this.hearts.push(this.game.add.sprite(40, 10, 'heart'))
    };
}