export default class ScoreSystem {

    constructor({game, difficultySystem}) {
        this.game = game;

        // Keeps updating the score for each second elapsed
        this.scoreTimer = this.game.time.create();
        this.scoreTimer.loop(Phaser.Timer.SECOND, this.updateScore, this, difficultySystem);
    }

    createScoreText() {
		let scoreText = 'Pontuação: 0';
		let scoreStyle = { font: 'bold 18px Arial', fill: '#DED125', stroke: '#000000', strokeThickness: 3 };
		this.score = this.game.add.text(this.game.world.width -150, 3, scoreText, scoreStyle);
		this.scorePoints = 0;
	}

    createBestScoreText() {
		let bestScorePoints = this.getBestScore();
		let bestScoreText = 'Melhor Pontuação: ' + bestScorePoints;
		let bestScoreStyle = { font: 'bold 18px Arial', fill: '#DED125', stroke: '#000000', strokeThickness: 3 };
		this.bestScore = this.game.add.text(this.game.world.centerX - 90, this.game.world.height - 30, bestScoreText, bestScoreStyle);
	}

    updateScore(difficultySystem) {
		this.scorePoints++;
		this.score.text = 'Pontuação: ' + this.scorePoints;
		difficultySystem.increaseDifficulty(this.scorePoints);
	}

    start() {
		this.bestScore.destroy();

		if (!this.score) {
			this.createScoreText();
		}

		if (this.scoreTimer.paused) {
			this.score.text = 'Pontuação: 0';
			this.score.alpha = 1;
			this.scoreTimer.resume();
		}
		if (!this.scoreTimer.running) {
			this.scoreTimer.start();
		}
	}

    pause() {
		let bestScore = this.getBestScore();

		if (this.scorePoints > bestScore) {
			this.saveBestScore(this.scorePoints);
		}

		this.score.alpha = 0;
		this.scorePoints = 0;
		this.scoreTimer.pause();
		this.createBestScoreText();
	}

    getBestScore() {
		if (window.localStorage) {
			let bestScore = window.localStorage.getItem('bestScore');

			if (bestScore) {
				return window.localStorage.getItem('bestScore');
			} else {
				return 0;
			}
		}
        
		return 0;
	}

    saveBestScore(bestScore) {
		if (window.localStorage) {
			window.localStorage.setItem('bestScore', bestScore);
		}
	}
}