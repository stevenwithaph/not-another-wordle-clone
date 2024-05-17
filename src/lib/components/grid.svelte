<script lang="ts">
	import type { Guess } from '$lib/stores/game.svelte';
	import GridItem from './grid-item.svelte';

	interface Props {
		guesses: Guess[];
	}

	const { guesses }: Props = $props();

	let wiggle = $state(-1);

	export function wiggleRow(row: number) {
		wiggle = -1;

		setTimeout(() => {
			wiggle = row;
		});
	}
</script>

<div class="grid grid-rows-6 gap-y-2">
	{#each { length: 6 } as _, i}
		<div class:animate-wiggle={wiggle === i} class="grid grid-cols-5 gap-x-2">
			{#each { length: 5 } as _, j}
				<GridItem character={guesses[j + i * 5].character} type={guesses[j + i * 5].type} />
			{/each}
		</div>
	{/each}
</div>
