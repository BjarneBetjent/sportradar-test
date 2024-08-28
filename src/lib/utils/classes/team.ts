export default class Team {
	private teamName: string;
	private score: number;

	constructor(teamName: string) {
		if (typeof teamName != 'string' || teamName.length < 2) {
			throw new Error('Invalid team name');
		}
		this.teamName = teamName;
		this.score = 0;
	}

	getScore(): number {
		return this.score;
	}

	getTeamName(): string {
		return this.teamName;
	}

	updateScore(newScore: number) {
		if (typeof newScore != 'number' || newScore < 0) {
			throw new Error('Invalid score');
		}
		this.score = newScore;
	}
}
