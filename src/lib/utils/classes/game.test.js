import { expect, test } from 'vitest';
import Game from './game';

test('Get total score at the start of game', () => {
	const game = new Game('RBK', 'MFK');
	expect(game.getTotalScore()).toBe(0);
});

test('Get time game started', () => {
	const startTime = Date.now();
	const game = new Game('RBK', 'MFK', startTime);
	expect(game.getTimeStarted()).toBe(startTime);
});

test('Update score with valid numbers, and get game total score', () => {
	const game = new Game('RBK', 'MFK');
	game.updateGameScore(1, 0);
	expect(game.getTotalScore()).toBe(1);
	game.updateGameScore(999, 1);
	expect(game.getTotalScore()).toBe(1000);
	game.updateGameScore(999, 1);
	expect(game.getTotalScore()).toBe(1000);
});

test('Update score with invalid number', () => {
	const game = new Game('RBK', 'MFK');
	expect(() => game.updateGameScore(1, -1)).toThrowError('Invalid score');
	expect(() => game.updateGameScore(-1, 0)).toThrowError('Invalid score');
	expect(() => game.updateGameScore('1', 0)).toThrowError('Invalid score');
});
