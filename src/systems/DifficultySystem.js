import Person from '../models/Person';

export default class DifficultySystem {

    constructor({game, peopleNames}) {
        this.game = game;
        this.peopleNames = peopleNames;
        this.peopleGroup = this.game.add.group();

        this.backgroundSpeed = 3;
        this.personMaxRespawnTime = 7;

        // Keeps spawning people when the game is running
        this.personTimer = this.game.time.create(false);
        this.personTimer.loop(this.game.rnd.integerInRange(3, 7) * 1000, this.spawnPerson, this);
    }

    startSpawningPeople() {
        // If the personTimer is paused we resume it, otherwise we start it
        if (this.personTimer.paused) {
            this.personTimer.resume();
        }

        if (!this.personTimer.running) {
            this.personTimer.start();
        }
    }

    stopSpawningPeople() {
        this.personTimer.stop();
        this.personMaxRespawnTime = 7;
        this.personTimer.loop(this.game.rnd.integerInRange(3, 7) * 1000, this.spawnPerson, this);
    }

    spawnPerson() {
        let personPosition = this.game.rnd.integerInRange(0, this.peopleNames.length - 1);
        let person = new Person({
            game: this.game, 
            x: this.game.world.width, 
            y: this.game.world.height - 25, 
            asset: this.peopleNames[personPosition]
        });
        this.peopleGroup.add(person);
    }

    increaseDifficulty(scorePoints) {
        if (scorePoints % 14 == 0) {
            if (this.personMaxRespawnTime > 3) {
                this.personTimer.stop();
                this.personMaxRespawnTime -= 1;
                this.personTimer.loop(this.game.rnd.integerInRange(3, this.personMaxRespawnTime) * 1000, this.spawnPerson, this);
                this.personTimer.start();
            }
        }
    }
}