<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import '../app.css';

	interface Props {
		children: Snippet;
		data: any;
	}

	const { children, data }: Props = $props();
</script>

<svelte:head>
	<title>Not Another Wordle Clone</title>
</svelte:head>

{@render children()}
