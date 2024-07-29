import { CHARACTERS_PER_ROW } from '$lib/stores/game.svelte';
import { TRANSITION_DELAY, TRANSITION_DURATION } from './timing';

export function setTransitionTimeout(fn: Function) {
	setTimeout(fn, TRANSITION_DURATION + TRANSITION_DELAY * (CHARACTERS_PER_ROW - 1));
}
