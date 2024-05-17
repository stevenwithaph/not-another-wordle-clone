<script lang="ts">
	export let character: string;
	export let background: string;
</script>

<div class={`w-full h-full flex justify-center items-center rounded ${background}`}>
	{character}
</div>
