<script lang="ts">
	import { GuessType } from '$lib/stores/game.svelte';
	import KeyboardButton, { KeySize } from './keyboard-button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let keyboard: Map<string, GuessType>;
	export let enabled: boolean;

	let focused: string | undefined;

	const dispatch = createEventDispatcher();

	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
	];

	function onKeyboard(event: CustomEvent<string>) {
		if (!enabled) return;

		dispatch('key', event.detail);
	}

	function onDelete() {
		if (!enabled) return;

		dispatch('delete');
	}

	function onSubmit() {
		if (!enabled) return;

		dispatch('submit');
	}
</script>

<div>
	{#each keys as row}
		<div class="flex flex-row mb-2 space-x-1.5">
			{#each row as key}
				{#if key === ''}
					<div class="flex-[0.5] h-10"></div>
				{:else if key === 'enter'}
					<KeyboardButton
						on:keyboard={onSubmit}
						displayKey={'ent'}
						size={KeySize.Large}
						type={GuessType.None}
						{key}
						{enabled}
					/>
				{:else if key === 'backspace'}
					<KeyboardButton
						on:keyboard={onDelete}
						displayKey={'del'}
						size={KeySize.Large}
						type={GuessType.None}
						{key}
						{enabled}
					/>
				{:else}
					<KeyboardButton
						on:keyboard={onKeyboard}
						type={keyboard.get(key) ?? GuessType.None}
						{key}
						{enabled}
					/>
				{/if}
			{/each}
		</div>
	{/each}
</div>
