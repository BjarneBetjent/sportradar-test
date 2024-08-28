<script lang="ts">
	import Scoreboard from '$lib/utils/classes/scoreboard';
	import Game from '$lib/utils/classes/game';
	import { activeGamesStore, summaryStore } from '$lib/utils/stores';

	let homeTeam: string = '';
	let awayTeam: string = '';
	let addError: boolean = false;

	$: if ($activeGamesStore) {
		updateSummary();
	}

	const scoreboard = new Scoreboard();

	function addGame() {
		const game = new Game(homeTeam, awayTeam);
		const added = scoreboard.addGame(game);
		if (!added) {
			addError = true;
			return;
		}
		addError = false;
		activeGamesStore.set(scoreboard.getGames());
	}

	function updateSummary() {
		summaryStore.set(scoreboard.getSummary());
	}
</script>

<div class="w-screen h-screen bg-red-50 flex justify-center">
	<div class="bg-blue-50 w-7/12 flex flex-col items-center pt-20 gap-10">
		<!-- Add team -->
		<div class="w-full flex flex-col h-20 justify-center gap-2 px-20">
			<div class="flex gap-2">
				<div class="flex flex-1 flex-col w-5/12">
					<label for="hometeam"> Home Team </label>
					<input id="hometeam" type="text" class="border" bind:value={homeTeam} />
				</div>
				<div class="flex flex-1 flex-col w-5/12">
					<label for="hometeam"> Away Team </label>
					<input id="hometeam" type="text" class="border" bind:value={awayTeam} />
				</div>
			</div>
			<button class="border bg-slate-200" on:click={addGame}>Add to scoreboard</button>
			{#if addError}
				<div class="">
					<p class="text-red-600">Failed to add this game</p>
				</div>
			{/if}
		</div>
		<!-- Scoreboard -->
		<div class="flex flex-col w-full px-20">
			{#each $activeGamesStore as game (game.getTimeStarted())}
				<div class="bg-green-50">{game.getAwayTeam().getTeamName()}</div>
			{/each}
		</div>

		<!-- Summary -->
		<div class="flex flex-col w-full px-20">
			{#each $summaryStore as game (game.getTimeStarted())}
				<div class="bg-green-50">{game.getAwayTeam().getTeamName()}</div>
			{/each}
		</div>
	</div>
</div>
