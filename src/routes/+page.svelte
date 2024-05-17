<script lang="ts">
	import Grid from '$lib/components/grid.svelte';
	import Keyboard from '$lib/components/keyboard.svelte';
	import { GameState, createGameStore } from '$lib/stores/game.svelte';
	import { fade, slide, blur } from 'svelte/transition';

	const store = createGameStore();

	let grid: Grid;

	function onKey(event: CustomEvent<string>) {
		store.add(event.detail);
	}

	function onSubmit() {
		if (!store.submit()) {
			grid.wiggleRow(store.row);
		}
	}

	function onDelete() {
		store.remove();
	}

	function onReset() {
		store.reset();
	}
</script>

<div class="relative min-h-dvh flex justify-center items-center">
	<div class="w-full max-w-[484px] px-2">
		<div class="px-2 md:px-16 mb-4">
			<Grid bind:this={grid} guesses={store.guesses} />
		</div>
		<Keyboard
			on:key={onKey}
			on:submit={onSubmit}
			on:delete={onDelete}
			keyboard={store.keyboard}
			enabled={store.state === GameState.Playing}
		/>
	</div>
	{#if store.state === GameState.Ended}
		<div transition:fade class="absolute inset-0 flex bg-black/50 justify-center items-center">
			<div transition:blur class="bg-white p-5 text-black space-y-4 rounded">
				{#if store.isWinner}
					<p>Winner!</p>
				{:else if !store.isWinner}
					<p>Whomp Whomp.</p>
					<p>The word was <span class="capitalize">{store.word}</span></p>
				{/if}
				<button
					class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
					on:click={onReset}>Play Again?</button
				>
			</div>
		</div>
	{/if}
</div>
