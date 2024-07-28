import { TRANSITION_DELAY, TRANSITION_DURATION } from '$lib/components/grid-item.svelte';
import { CHARACTERS_PER_ROW } from '$lib/stores/game.svelte';

export function setTransitionTimeout(fn: Function) {
	setTimeout(fn, TRANSITION_DURATION + TRANSITION_DELAY * CHARACTERS_PER_ROW);
}
