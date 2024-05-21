<script lang="ts">
	import { GuessType } from '$lib/stores/game.svelte';
	import { BackgroundColour } from '$lib/utils/background-colours';
	import GridItemEmpty from './grid-item-empty.svelte';
	import GridItemGuessed from './grid-item-guessed.svelte';

	interface Props {
		character: string;
		type: GuessType;
		index: number;
	}

	const { character, type, index }: Props = $props();
</script>

<div
	class={`aspect-square text-white font-bold uppercase flex justify-center items-center text-4xl rounded transition-colors relative`}
>
	{#if type === GuessType.None}
		<GridItemEmpty {index} {character} />
	{:else}
		<GridItemGuessed {index} {character} background={BackgroundColour[type]} />
	{/if}
</div>
