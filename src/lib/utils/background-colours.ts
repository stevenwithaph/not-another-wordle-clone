import { GuessType } from '$lib/stores/game.svelte';

export const BackgroundColour = {
	[GuessType.None]: '',
	[GuessType.Correct]: 'bg-green-500',
	[GuessType.Valid]: 'bg-yellow-500',
	[GuessType.Incorrect]: 'bg-zinc-900'
};
