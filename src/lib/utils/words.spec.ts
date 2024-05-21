import { describe, it, expect } from 'vitest';
import { validateGuess } from './words';
import { GuessType } from '$lib/stores/game.svelte';

const correct = new Array(5).fill(GuessType.Correct);
const incorrect = new Array(5).fill(GuessType.Incorrect);
const valid = new Array(5).fill(GuessType.Valid);

const duplicates = [
	GuessType.Valid,
	GuessType.Correct,
	GuessType.Correct,
	GuessType.Valid,
	GuessType.Incorrect
];

describe('validate guess', () => {
	it('correct', () => {
		const types = validateGuess('hello', 'hello');
		expect(types).toEqual(correct);
	});

	it('incorrect', () => {
		const types = validateGuess('hello', 'qwmrt');
		expect(types).toEqual(incorrect);
	});

	it('valid', () => {
		const types = validateGuess('pastr', 'sprat');
		expect(types).toEqual(valid);
	});

	it('duplicates', () => {
		const types = validateGuess('hello', 'lelhp');
		expect(types).toEqual(duplicates);
	});
});
