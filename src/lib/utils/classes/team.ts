export default class Team {
	private teamName: string;
	private score: number;

	/**
	 * Create a new team
	 * @param teamName Name of the team
	 */
	constructor(teamName: string) {
		if (typeof teamName != 'string' || teamName.length < 2) {
			throw new Error('Invalid team name');
		}
		this.teamName = teamName;
		this.score = 0;
	}

	/**
	 * @returns The team score
	 */
	getScore(): number {
		return this.score;
	}

	/**
	 * @returns The team name
	 */
	getTeamName(): string {
		return this.teamName;
	}

	/**
	 * Update the score of the score
	 * @param newScore The new score
	 */
	updateScore(newScore: number) {
		if (typeof newScore != 'number' || newScore < 0) {
			throw new Error('Invalid score');
		}
		this.score = newScore;
	}
}
