import Team from './team';

export default class Game {
	private homeTeam: Team;
	private awayTeam: Team;
	private timeStarted: number;
	private timeEnded: number | undefined = undefined;

	/**
	 * Create a new game
	 * @param homeTeam Name of home team
	 * @param awayTeam Name of away team
	 * @param startTime Start time of the game
	 */
	constructor(homeTeam: string, awayTeam: string, startTime?: number) {
		this.homeTeam = new Team(homeTeam);
		this.awayTeam = new Team(awayTeam);
		this.timeStarted = startTime ? startTime : Date.now();
	}

	/**
	 * Update the score of the game
	 * @param homeScore New home score
	 * @param awayScore New away score
	 */
	updateGameScore(homeScore: number, awayScore: number): void {
		this.homeTeam.updateScore(homeScore);
		this.awayTeam.updateScore(awayScore);
	}

	/**
	 * Finish the game
	 * @param finishTime What time the game finished. If no argument is provided, the time of function call will be used
	 */
	finishGame(finishTime?: number) {
		this.timeEnded = finishTime ? finishTime : Date.now();
	}

	/**
	 * @returns Game start time
	 */
	getTimeStarted(): number {
		return this.timeStarted;
	}

	/**
	 * @returns Game end time
	 */
	getEndTime(): number | undefined {
		return this.timeEnded;
	}

	/**
	 * Get the total score of the game. Home score + away score
	 * @returns Total game score
	 */
	getTotalScore(): number {
		return this.homeTeam.getScore() + this.awayTeam.getScore();
	}

	/**
	 * @returns Home team
	 */
	getHomeTeam(): Team {
		return this.homeTeam;
	}

	/**
	 * @returns Away team
	 */
	getAwayTeam(): Team {
		return this.awayTeam;
	}
}
