<script lang="ts">
	import type { Guess } from '$lib/stores/game.svelte';
	import GridItem from './grid-item.svelte';

	import { ROWS, CHARACTERS_PER_ROW } from '../stores/game.svelte';

	interface Props {
		guesses: Guess[];
		currentRow: number;
	}

	const { guesses, currentRow }: Props = $props();

	let wiggle = $state(-1);

	export function wiggleRow() {
		wiggle = -1;

		setTimeout(() => {
			wiggle = currentRow;
		});
	}
</script>

<div class="grid grid-rows-6 gap-y-2">
	{#each { length: ROWS } as _, i}
		<div id={`grid-${i}`} class:animate-wiggle={wiggle === i} class="grid grid-cols-5 gap-x-2">
			{#each { length: CHARACTERS_PER_ROW } as _, j}
				<GridItem
					front={guesses[j + i * 5].front}
					back={guesses[j + i * 5].back}
					type={guesses[j + i * 5].type}
					index={j}
					flipped={currentRow > i}
				/>
			{/each}
		</div>
	{/each}
</div>
