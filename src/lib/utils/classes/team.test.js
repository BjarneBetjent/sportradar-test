import { expect, test } from 'vitest';
import Team from './team';

test('Get a teams score', () => {
	const team = new Team('RBK');
	expect(team.getScore()).toBe(0);
});

test('Get a teams name', () => {
	const team = new Team('RBK');
	expect(team.getTeamName()).toBe('RBK');
});

test('Create a team with invalid name', () => {
	expect(() => new Team('B')).toThrowError('Invalid team name');
	expect(() => new Team(123)).toThrowError('Invalid team name');
});

test('Update a teams score with a valid value', () => {
	const team = new Team('RBK');
	team.updateScore(2);
	expect(team.getScore()).toBe(2);
});

test('Update a teams score with an invalid value', () => {
	const team = new Team('RBK');
	expect(() => team.updateScore(-1)).toThrowError('Invalid score');
});
