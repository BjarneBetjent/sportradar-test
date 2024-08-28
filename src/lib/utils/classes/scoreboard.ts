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

	/**
	 * Remove a given game from the scoreboard.
	 * @param gameToRemove Game to remove from the scoreboard
	 * @returns Returns the removed game. If game didn't exist in the scoreboard, returns undefined.
	 */
	removeGame(gameToRemove: Game): Game | undefined {
		const currentLength = this.runningGames.length;
		this.runningGames = this.runningGames.filter(
			(game) => game.getTimeStarted() != gameToRemove.getTimeStarted()
		);
		if (currentLength == this.runningGames.length) return undefined;
		return gameToRemove;
	}
}
