<script lang="ts">
	interface Props {
		character: string;
		background: string;
		index: number;
	}

	const { character, background, index }: Props = $props();
</script>

<div
	class={`w-full h-full flex justify-center items-center rounded ${background}`}
	id={`grid-item-back-${index}`}
>
	{character}
</div>
