import Game from './game';
export default class Scoreboard {
	private runningGames: Game[];

	constructor() {
		this.runningGames = [];
	}

	getGames() {
		return this.runningGames;
	}

	/**
	 * Add a new game to the scoreboard.
	 * @param gameToAdd Game to add to the scoreboard
	 * @returns The added game. If one of the teams are already represented on the scoreboard, returns undefined
	 */
	addGame(gameToAdd: Game): Game | undefined {
		if (
			this.teamExistsOnScoreboard(gameToAdd.awayTeam.getTeamName()) ||
			this.teamExistsOnScoreboard(gameToAdd.homeTeam.getTeamName())
		) {
			return undefined;
		}
		this.runningGames.push(gameToAdd);
		return gameToAdd;
	}

	/**
	 * Remove a given game from the scoreboard.
	 * @param gameToRemove Game to remove from the scoreboard
	 * @returns The removed game. If game didn't exist in the scoreboard, returns undefined.
	 */
	removeGame(gameToRemove: Game): Game | undefined {
		const currentLength = this.runningGames.length;
		this.runningGames = this.runningGames.filter(
			(game) => game.getTimeStarted() != gameToRemove.getTimeStarted()
		);
		if (currentLength == this.runningGames.length) return undefined;
		return gameToRemove;
	}

	/**
	 * Check if a given team is already represented in a game on the scoreboard
	 * @param teamName team to check for
	 * @returns true if team is already in a game, false otherwise
	 */
	private teamExistsOnScoreboard(teamName: string): boolean {
		const foundGame = this.runningGames.find((game) => {
			if (game.awayTeam.getTeamName() == teamName) return true;
			if (game.homeTeam.getTeamName() == teamName) return true;
			return false;
		});
		if (foundGame) return true;
		return false;
	}
}
