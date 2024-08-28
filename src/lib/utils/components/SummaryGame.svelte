<script lang="ts">
	import Game from '../classes/game';
	export let game: Game;
</script>

<div class="flex w-96 justify-between odd:bg-slate-50">
	<div class="flex flex-1 p-1 items-center gap-2">
		<p class="text-left">{game.getHomeTeam().getTeamName()}</p>
		<p class="text-right flex-1 mr-2">{game.getHomeTeam().getScore()}</p>
	</div>
	<div class="flex flex-1 p-1 items-center gap-2">
		<p class="text-left flex-1 ml-2">{game.getAwayTeam().getScore()}</p>
		<p class="text-right">{game.getAwayTeam().getTeamName()}</p>
	</div>
</div>
