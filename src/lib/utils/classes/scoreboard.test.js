import { expect, test } from 'vitest';
import Scoreboard from './scoreboard';
import Game from './game';

test('Create a scoreboard', () => {
	const scoreboard = new Scoreboard();
	expect(scoreboard.getGames()).toEqual([]);
});

test('Add game to scoreboard', () => {
	const scoreboard = new Scoreboard();

	const game = new Game('RBK', 'MFK');
	scoreboard.addGame(game);

	expect(scoreboard.getGames().length).toBe(1);
	expect(scoreboard.getGames()[0]).toStrictEqual(game);
});

test('Add several games to scoreboard', () => {
	const scoreboard = new Scoreboard();

	const game1 = new Game('RBK', 'MFK');
	const gameAdded1 = scoreboard.addGame(game1);
	expect(gameAdded1).toStrictEqual(game1);

	const game2 = new Game('BOD', 'VIK');
	const gameAdded2 = scoreboard.addGame(game2);
	expect(gameAdded2).toStrictEqual(game2);

	expect(scoreboard.getGames().length).toBe(2);
	expect(scoreboard.getGames()[1]).toStrictEqual(game2);
});

test('Add several games to scoreboard, add the same team twice', () => {
	const scoreboard = new Scoreboard();

	const game1 = new Game('RBK', 'MFK');
	const gameAdded1 = scoreboard.addGame(game1);
	expect(gameAdded1).toStrictEqual(game1);

	const game2 = new Game('BOD', 'RBK');
	const gameAdded2 = scoreboard.addGame(game2);
	expect(gameAdded2).toBe(undefined);

	expect(scoreboard.getGames().length).toBe(1);
	expect(scoreboard.getGames()[0]).toStrictEqual(game1);
});

test('Finish game and remove game from scoreboard', () => {
	const scoreboard = new Scoreboard();

	// Making sure we get a unique timestamp
	const testStartTime = Date.now() - 1000;
	// game1 will have our known identifier
	const game1 = new Game('RBK', 'MFK', testStartTime);
	const game2 = new Game('BOD', 'VIK');

	scoreboard.addGame(game1);
	scoreboard.addGame(game2);

	// Expect to find a game with our fake timestamp identifier
	expect(
		scoreboard.getGames().find((game) => game.getTimeStarted() == testStartTime)
	).toStrictEqual(game1);

	scoreboard.removeGame(game1.getTimeStarted());

	// Expect we can no longer find a game with the fake timestamp
	expect(scoreboard.getGames().find((game) => game.getTimeStarted() == testStartTime)).toBe(
		undefined
	);
});

test('Update game score', () => {
	const scoreboard = new Scoreboard();
	const game = new Game('RBK', 'MFK');
	scoreboard.addGame(game);
	scoreboard.updateGameScore(game.getTimeStarted(), 1, 0);
	const scoreboardGame = scoreboard.getGame(game.getTimeStarted());
	expect(scoreboardGame?.getTotalScore()).toBe(1);
	expect(scoreboardGame?.getHomeTeam().getScore()).toBe(1);
	expect(scoreboardGame?.getAwayTeam().getScore()).toBe(0);
});

test('Update game score with invalid numbers', () => {
	const scoreboard = new Scoreboard();
	const game = new Game('RBK', 'MFK');
	scoreboard.addGame(game);
	expect(() => scoreboard.updateGameScore(game.getTimeStarted(), -1, 0)).toThrowError(
		'Invalid score'
	);
});

test('Get summary no changes to score', () => {
	const scoreboard = new Scoreboard();
	const fakeTimeStamp = Date.now() - 1000;
	const game1 = new Game('RBK', 'MFK', fakeTimeStamp);
	scoreboard.addGame(game1);
	const game2 = new Game('BOD', 'VIK');
	scoreboard.addGame(game2);

	const summary = scoreboard.getSummary();
	// Save score, expects most recent game to be first
	expect(summary[0]).toStrictEqual(game2);
});

test('Get summary, change score to test ordering', () => {
	const scoreboard = new Scoreboard();
	const mexCan = new Game('Mexico', 'Canada', Date.now() - 100);
	scoreboard.addGame(mexCan);
	scoreboard.updateGameScore(mexCan.getTimeStarted(), 0, 5);

	const spaBra = new Game('Spain', 'Brazil', Date.now() - 90);
	scoreboard.addGame(spaBra);
	scoreboard.updateGameScore(spaBra.getTimeStarted(), 10, 2);

	const gerFra = new Game('Germany', 'France', Date.now() - 80);
	scoreboard.addGame(gerFra);
	scoreboard.updateGameScore(gerFra.getTimeStarted(), 2, 2);

	const uruIta = new Game('Uruguay', 'Italy', Date.now() - 70);
	scoreboard.addGame(uruIta);
	scoreboard.updateGameScore(uruIta.getTimeStarted(), 6, 6);

	const argAus = new Game('Argentina', 'Australia', Date.now() - 60);
	scoreboard.addGame(argAus);
	scoreboard.updateGameScore(argAus.getTimeStarted(), 3, 1);

	const summary = scoreboard.getSummary();
	expect(summary[0]).toStrictEqual(uruIta);
	expect(summary[1]).toStrictEqual(spaBra);
	expect(summary[2]).toStrictEqual(mexCan);
	expect(summary[3]).toStrictEqual(argAus);
	expect(summary[4]).toStrictEqual(gerFra);
});
