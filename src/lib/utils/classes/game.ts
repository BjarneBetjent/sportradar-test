import Team from './team';

export default class Game {
	homeTeam: Team;
	awayTeam: Team;
	timeStarted: number;
	timeEnded: number | undefined = undefined;

	constructor(homeTeam: string, awayTeam: string, startTime?: number) {
		this.homeTeam = new Team(homeTeam);
		this.awayTeam = new Team(awayTeam);
		this.timeStarted = startTime ? startTime : Date.now();
	}

	updateGameScore(homeScore: number, awayScore: number): void {
		this.homeTeam.updateScore(homeScore);
		this.awayTeam.updateScore(awayScore);
	}

	finishGame(finishTime?: number) {
		this.timeEnded = finishTime ? finishTime : Date.now();
	}

	getTimeStarted(): number {
		return this.timeStarted;
	}

	getEndTime(): number | undefined {
		return this.timeEnded;
	}

	getTotalScore(): number {
		return this.homeTeam.getScore() + this.awayTeam.getScore();
	}
}
