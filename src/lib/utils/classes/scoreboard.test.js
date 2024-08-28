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
	scoreboard.addGame(game1);
	const game2 = new Game('BOD', 'VIK');
	scoreboard.addGame(game2);

	expect(scoreboard.getGames().length).toBe(2);
	expect(scoreboard.getGames()[1]).toStrictEqual(game2);
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

	scoreboard.removeGame(game1);

	// Expect we can no longer find a game with the fake timestamp
	expect(scoreboard.getGames().find((game) => game.getTimeStarted() == testStartTime)).toBe(
		undefined
	);
});

test('Get summary', () => {
	// Check if games are correctly ordered
});

test('Adding a new game with a team already included on the scoreboard', () => {
	// Don't allow if team is already included on scoreboard
});
