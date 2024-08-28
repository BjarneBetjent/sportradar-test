import Game from './game';
export default class Scoreboard {
	runningGames: Game[];

	constructor() {
		this.runningGames = [];
	}

	getGames() {
		return this.runningGames;
	}

	addGame(gameToAdd: Game) {
		this.runningGames.push(gameToAdd);
	}

	removeGame(gameToRemove: Game) {
		this.runningGames = this.runningGames.filter(
			(game) => game.getTimeStarted() != gameToRemove.getTimeStarted()
		);
	}
}
