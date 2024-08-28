import { expect, test } from 'vitest';
import Scoreboard from '../scoreboard';
import Game from './game';

test('Create a scoreboard', () => {
	const scoreboard = new Scoreboard();
	expect(scoreboard.getGames()).toBe([]);
});

test('Add game to scoreboard', () => {
	const scoreboard = new Scoreboard();

	const game = new Game('RBK', 'MFK');
	scoreboard.addGame(game);

	expect(scoreboard.getGames().length).toBe(1);
	expect(scoreboard.getGames()[0]).toBe(game);
});

test('Add several games to scoreboard', () => {
	const scoreboard = new Scoreboard();

	const game1 = new Game('RBK', 'MFK');
	scoreboard.addGame(game1);
	const game2 = new Game('BOD', 'VIK');
	scoreboard.addGame(game2);

	expect(scoreboard.getGames().length).toBe(2);
});

test('Finish game and remove game from scoreboard', () => {
	const scoreboard = new Scoreboard();

	const testStartTime = Date.now();
	const game1 = new Game('RBK', 'MFK');
	const game2 = new Game('BOD', 'VIK', testStartTime);

	scoreboard.addGame(game1);
	scoreboard.addGame(game2);

	expect(scoreboard.getGames().find((game) => game.startTime == testStartTime)).toBe(game2);

	scoreboard.removeGame(game2);

	expect(scoreboard.getGames().find((game) => game.startTime == testStartTime)).toBe(undefined);
});

test('Get summary', () => {
	// Check if games are correctly ordered
});

test('Adding a new game with a team already included on the scoreboard', () => {
	// Don't allow if team is already included on scoreboard
});
