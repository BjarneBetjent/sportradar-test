import Game from './game';

export default class Scoreboard {
	private runningGames: Game[];

	constructor() {
		this.runningGames = [];
	}

	/**
	 * Get a specific game from the scoreboard
	 * @param gameID ID of the gave to retrieve
	 * @returns The requested game, undefined if it doesn't exist in the scoreboard
	 */
	getGame(gameID: number): Game | undefined {
		return this.runningGames.find((game) => game.getTimeStarted() == gameID);
	}

	/**
	 * @returns The array of active games
	 */
	getGames() {
		return this.runningGames;
	}

	/**
	 * Add a new game to the scoreboard.
	 * @param gameToAdd Game to add to the scoreboard
	 * @returns The added game. If one of the teams are already represented on the scoreboard,
	 * or both team names are the same, returns undefined
	 */
	addGame(gameToAdd: Game): Game | undefined {
		// Check if the team is already playing
		if (
			this.teamExistsOnScoreboard(gameToAdd.getAwayTeam().getTeamName()) ||
			this.teamExistsOnScoreboard(gameToAdd.getHomeTeam().getTeamName())
		) {
			return undefined;
		}
		// Check if both teams in the game got the same name
		if (gameToAdd.getHomeTeam().getTeamName() == gameToAdd.getAwayTeam().getTeamName()) {
			return undefined;
		}
		// Check if both team names are the same
		this.runningGames.push(gameToAdd);
		return gameToAdd;
	}

	/**
	 * Remove a given game from the scoreboard.
	 * @param gameToRemove Game to remove from the scoreboard
	 * @returns The removed game. If game didn't exist in the scoreboard, returns undefined.
	 */
	removeGame(gameToRemoveID: number): Game | undefined {
		// Save current length to see if anything was removed
		const currentLength = this.runningGames.length;

		this.runningGames = this.runningGames.filter((game) => game.getTimeStarted() != gameToRemoveID);

		if (currentLength == this.runningGames.length) return undefined;
		return this.getGame(gameToRemoveID);
	}

	/**
	 * Update the score for a given game
	 * @param gameID ID of the game to update the score for
	 * @param homeScore New home score
	 * @param awayScore New away score
	 */
	updateGameScore(gameID: number, homeScore: number, awayScore: number) {
		const gameToUpdate = this.getGame(gameID);
		if (!gameToUpdate) throw new Error(`No game with ID: ${gameID} found in scoreboard`);
		gameToUpdate.updateGameScore(homeScore, awayScore);
	}

	/**
	 * Sorts active games based total score, if total score is the same,
	 * sorts by time the game started
	 * @returns The sorted array of games
	 */
	getSummary(): Game[] {
		return this.runningGames.sort((a, b) => {
			if (a.getTotalScore() == b.getTotalScore()) {
				return b.getTimeStarted() - a.getTimeStarted();
			} else {
				return b.getTotalScore() - a.getTotalScore();
			}
		});
	}

	/**
	 * Check if a given team is already represented in a game on the scoreboard
	 * @param teamName team to check for
	 * @returns true if team is already in a game, false otherwise
	 */
	private teamExistsOnScoreboard(teamName: string): boolean {
		const foundGame = this.runningGames.find((game) => {
			if (game.getAwayTeam().getTeamName() == teamName) return true;
			if (game.getHomeTeam().getTeamName() == teamName) return true;
			return false;
		});
		if (foundGame) return true;
		return false;
	}
}
