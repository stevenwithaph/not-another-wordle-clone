<script context="module" lang="ts">
	export enum KeySize {
		Medium,
		Large
	}
</script>

<script lang="ts">
	import keyboardJS from 'keyboardjs';

	import { GuessType } from '$lib/stores/game.svelte';
	import { BackgroundColour } from '$lib/utils/background-colours';

	interface Props {
		key: string;
		displayKey?: string;
		size: KeySize;
		type: GuessType;
		enabled: boolean;
		onKey: Function;
	}

	const { key, displayKey, size, type, enabled, onKey }: Props = $props();

	let node: HTMLElement;
	let timeout: NodeJS.Timeout;

	let pressed: boolean = $state(false);
	let background: string = $state('');

	$effect(() => {
		keyboardJS.setContext('keyboard');
		keyboardJS.bind(key, onKeyboard);

		return () => {
			keyboardJS.setContext('keyboard');
			keyboardJS.off(key, onKeyboard);

			clearTimeout(timeout);
		};
	});

	$effect(() => {
		if (type === GuessType.None) {
			background = 'bg-gray-500';
		} else {
			background = BackgroundColour[type];
		}
	});

	function onKeyboard() {
		emitKey();
	}

	function onPointerDown() {
		emitKey();
	}

	function emitKey() {
		if (!enabled) return;

		onKey(key);
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
</script>

<button
	bind:this={node}
	onpointerdown={onPointerDown}
	class={`transition-colors rounded h-14 text-white font-bold uppercase touch-manipulation ${size === KeySize.Medium ? 'flex-1' : 'flex-[1.5] '} ${pressed ? 'bg-gray-300' : background}`}
>
	{displayKey ? displayKey : key}
</button>
