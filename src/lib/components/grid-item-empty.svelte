<script lang="ts">
	interface Props {
		character: string;
		index: number;
	}

	const { character, index }: Props = $props();
</script>

<div
	class:animate-pop={character !== ''}
	class:border-white={character !== ''}
	class:border-zinc-700={character === ''}
	class="w-full h-full flex justify-center items-center border-2 rounded transition-colors"
	id={`grid-item-${index}`}
>
	{character}
</div>
