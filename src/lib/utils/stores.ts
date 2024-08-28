import { writable } from 'svelte/store';
import Game from './classes/game';

export const activeGamesStore = writable<Game[]>([]);
export const summaryStore = writable<Game[]>([]);
