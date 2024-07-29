<script lang="ts">
	import { GuessType } from '$lib/stores/game.svelte';
	import { BackgroundColour } from '$lib/utils/background-colours';
	import { TRANSITION_DELAY, TRANSITION_DURATION } from '$lib/utils/timing';
	import GridItemEmpty from './grid-item-empty.svelte';
	import GridItemGuessed from './grid-item-guessed.svelte';

	interface Props {
		front: string;
		back: string;
		type: GuessType;
		index: number;
		flipped: boolean;
	}

	const { front, back, type, index, flipped }: Props = $props();
</script>

<div
	class:flipped
	class="relative aspect-square text-white font-bold uppercase flex justify-center items-center text-4xl rounded transition-transform preserve-3d"
	style={`transition: transform ${TRANSITION_DURATION}ms ${TRANSITION_DELAY * index}ms`}
>
	<div class="absolute inset-0 backface-hidden">
		<GridItemEmpty {index} character={front} />
	</div>
	<div class="absolute inset-0 backface-hidden backcard">
		<GridItemGuessed {index} character={back} background={BackgroundColour[type]} />
	</div>
</div>
