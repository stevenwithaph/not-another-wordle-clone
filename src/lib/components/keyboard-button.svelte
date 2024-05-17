<script context="module" lang="ts">
	export enum KeySize {
		Medium,
		Large
	}
</script>

<script lang="ts">
	import keyboardJS from 'keyboardjs';
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	import { GuessType } from '$lib/stores/game.svelte';
	import { BackgroundColour } from '$lib/utils/background-colours';

	const dispatch = createEventDispatcher();

	export let key: string;
	export let displayKey: string = key;
	export let size: KeySize = KeySize.Medium;
	export let type: GuessType;
	export let enabled: boolean;

	let node: HTMLElement;

	let pressed: boolean = false;
	let timeout: NodeJS.Timeout;
	let background: string = '';

	$: {
		if (type === GuessType.None) {
			background = 'bg-gray-500';
		} else {
			background = BackgroundColour[type];
		}
	}

	function onKeyboard() {
		emitKey();
	}

	function onPointerDown() {
		emitKey();
	}

	function emitKey() {
		if (!enabled) return;

		dispatch('keyboard', key);
		beginFlash();
	}

	async function beginFlash() {
		endFlash();

		timeout = setTimeout(() => {
			pressed = true;
			node.addEventListener('transitionend', endFlash);
		});
	}

	function endFlash() {
		pressed = false;
		clearTimeout(timeout);
		node.removeEventListener('transitionend', endFlash);
	}

	onMount(() => {
		keyboardJS.setContext('keyboard');
		keyboardJS.bind(key, onKeyboard);
	});

	onDestroy(() => {
		keyboardJS.setContext('keyboard');
		keyboardJS.off(key, onKeyboard);

		clearTimeout(timeout);
	});
</script>

<button
	bind:this={node}
	on:pointerdown={onPointerDown}
	class={`transition-colors rounded h-14 text-white font-bold uppercase touch-manipulation ${size === KeySize.Medium ? 'flex-1' : 'flex-[1.5] '} ${pressed ? 'bg-gray-300' : background}`}
>
	{displayKey}
</button>
