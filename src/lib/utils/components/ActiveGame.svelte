<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Game from '../classes/game';
	export let game: Game;

	const dispatch = createEventDispatcher();

	let homeScore = game.getHomeTeam().getScore();
	let awayScore = game.getAwayTeam().getScore();

	// Called when the input is changed
	function onScoreChanged() {
		// I'm assuming we already have a check for a valid number here
		dispatch('scoreChanged', {
			homeScore: +homeScore,
			awayScore: +awayScore,
			gameID: game.getTimeStarted()
		});
	}
</script>

<div class="flex w-96 justify-between odd:bg-slate-50">
	<div class="flex flex-1 p-1 items-center gap-2">
		<div class="flex-1">
			<p class="text-slate-600">Home</p>
			<p class="text-left">{game.getHomeTeam().getTeamName()}</p>
		</div>
		<input
			type="text"
			class="border w-10 h-10 text-center"
			bind:value={homeScore}
			on:input={onScoreChanged}
		/>
	</div>
	<div class="flex flex-1 p-1 items-center gap-2">
		<div class="flex-1">
			<input
				type="text"
				class=" border w-10 h-10 text-center"
				bind:value={awayScore}
				on:input={onScoreChanged}
			/>
		</div>
		<div class="">
			<p class="text-slate-600 text-right">Away</p>
			<p class="text-right">{game.getAwayTeam().getTeamName()}</p>
		</div>
	</div>
</div>
