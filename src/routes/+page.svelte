<script lang="ts">
	import { activeGamesStore, summaryStore } from '$lib/utils/stores';
	import Scoreboard from '$lib/utils/classes/scoreboard';
	import Game from '$lib/utils/classes/game';

	// Components
	import ActiveGame from '$lib/utils/components/ActiveGame.svelte';
	import SummaryGame from '$lib/utils/components/SummaryGame.svelte';

	// Input fields for home and away team
	let homeTeam: string = '';
	let awayTeam: string = '';
	// Error if adding a team failed
	let addError: boolean = false;

	// Update summary when activeGamesStore changes
	$: if ($activeGamesStore) {
		updateSummary();
	}

	const scoreboard = new Scoreboard();

	// Add a new game to the scoreboard.
	// Called by the "Add to scoreboard button"
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

	function handleScoreUpdated({ detail }) {
		scoreboard.updateGameScore(detail.gameID, detail.homeScore, detail.awayScore);
		updateSummary();
	}

	function handleGameFinished({ detail }) {
		scoreboard.removeGame(detail.gameID);
		activeGamesStore.set(scoreboard.getGames());
	}

	// Update the summary
	function updateSummary() {
		summaryStore.set(scoreboard.getSummary());
	}
</script>

<div class="w-screen h-screen flex justify-center">
	<div class="w-96 flex flex-col items-center pt-20 gap-10">
		<!-- Add team -->
		<div class="w-full flex flex-col h-20 justify-center gap-2">
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
					<p class="text-red-600">Duplicates not allowed</p>
				</div>
			{/if}
		</div>
		<!-- Scoreboard -->
		{#if $activeGamesStore.length}
			<div class="flex flex-col w-full px-20 items-center gap-2">
				<h2 class="font-bold">Scoreboard</h2>
				{#each $activeGamesStore as game (game.getTimeStarted())}
					<ActiveGame
						{game}
						on:scoreChanged={handleScoreUpdated}
						on:gameFinished={handleGameFinished}
					/>
				{/each}
			</div>

			<!-- Summary -->
			<div class="flex flex-col w-full px-20 items-center gap-2">
				<h2 class="font-bold">Summary</h2>
				{#each $summaryStore as game (game.getTimeStarted())}
					<SummaryGame {game} />
				{/each}
			</div>
		{/if}
	</div>
</div>
