<script lang="ts">
	import { GuessType } from '$lib/stores/game.svelte';
	import KeyboardButton, { KeySize } from './keyboard-button.svelte';

	interface Props {
		keyboard: Map<string, GuessType>;
		enabled: boolean;
		onKey: Function;
		onSubmit: Function;
		onDelete: Function;
	}

	const { keyboard, enabled, onKey, onSubmit, onDelete }: Props = $props();

	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
	];
</script>

<div>
	{#each keys as row}
		<div class="flex flex-row mb-2 space-x-1.5">
			{#each row as key}
				{#if key === ''}
					<div class="flex-[0.5] h-10"></div>
				{:else if key === 'enter'}
					<KeyboardButton
						onKey={onSubmit}
						displayKey={'ent'}
						size={KeySize.Large}
						type={GuessType.None}
						{key}
						{enabled}
					/>
				{:else if key === 'backspace'}
					<KeyboardButton
						onKey={onDelete}
						displayKey={'del'}
						size={KeySize.Large}
						type={GuessType.None}
						{key}
						{enabled}
					/>
				{:else}
					<KeyboardButton
						type={keyboard.get(key) ?? GuessType.None}
						size={KeySize.Medium}
						{onKey}
						{key}
						{enabled}
					/>
				{/if}
			{/each}
		</div>
	{/each}
</div>
