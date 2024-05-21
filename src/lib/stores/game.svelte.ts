import { Map } from 'svelte/reactivity';
import { validateGuess, getRandomWord, isValidWord } from '$lib/utils/words';

export enum GuessType {
	None,
	Incorrect,
	Valid,
	Correct
}

export enum GameState {
	Playing,
	Ended
}

export interface Guess {
	character: string;
	type: GuessType;
}

const CHARACTERS_PER_ROW = 5;
const ROWS = 6;

export function createGameStore() {
	let idx = 0;

	const guesses = $state<Guess[]>([]);

	for (let i = 0; i < CHARACTERS_PER_ROW * ROWS; i++) {
		guesses.push({
			character: '',
			type: GuessType.None
		});
	}

	const keyboard = $state(new Map<string, GuessType>());
	let state = $state<GameState>(GameState.Playing);
	let row = $state(0);
	let isWinner = $state(false);
	let word = $state(getRandomWord());

	function reset() {
		word = getRandomWord();
		idx = 0;
		row = 0;
		state = GameState.Playing;
		keyboard.clear();

		for (let i = 0; i < CHARACTERS_PER_ROW * ROWS; i++) {
			guesses[i].character = '';
			guesses[i].type = GuessType.None;
		}
	}

	function add(character: string) {
		if (idx !== 5) {
			getCurrentGuessAtIndex(idx).character = character;
			idx++;
		}
	}

	function remove() {
		if (idx !== 0) {
			idx--;
			getCurrentGuessAtIndex(idx).character = '';
		}
	}

	function verifyWord() {
		const guess = getCurrentGuess();

		return isValidWord(guess);
	}

	function submit() {
		if (idx !== 5 || !verifyWord()) return false;

		const feedback = validateGuess(word, getCurrentGuess());

		for (let i = 0; i < CHARACTERS_PER_ROW; i++) {
			const guess = getCurrentGuessAtIndex(i);
			guess.type = feedback[i];
			updateKeyboard(guess);
		}

		if (word === getCurrentGuess()) {
			isWinner = true;
			state = GameState.Ended;
		} else {
			idx = 0;
			row++;

			if (row === ROWS) {
				state = GameState.Ended;
			}
		}

		return true;
	}

	function getCurrentGuessAtIndex(index: number) {
		return guesses[index + row * CHARACTERS_PER_ROW];
	}

	function getCurrentGuess() {
		let guess = '';
		for (let i = 0; i < CHARACTERS_PER_ROW; i++) {
			guess += getCurrentGuessAtIndex(i).character;
		}

		return guess;
	}

	function updateKeyboard(guess: Guess) {
		const currentGuessType = keyboard.get(guess.character) ?? GuessType.None;

		if (guess.type > currentGuessType) {
			keyboard.set(guess.character, guess.type);
		}
	}

	return {
		guesses,
		keyboard,
		get state() {
			return state;
		},
		get row() {
			return row;
		},
		get word() {
			return word;
		},
		get isWinner() {
			return isWinner;
		},
		add,
		remove,
		submit,
		reset
	};
}
