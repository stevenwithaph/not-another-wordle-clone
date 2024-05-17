<script lang="ts">
	import { fade } from 'svelte/transition';

	export let character: string;
	export let background: string;
</script>

<div transition:fade class={`w-full h-full flex justify-center items-center rounded ${background}`}>
	{character}
</div>
