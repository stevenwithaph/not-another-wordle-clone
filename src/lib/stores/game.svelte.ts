import { SvelteMap } from 'svelte/reactivity';
import { validateGuess, getRandomWord, isValidWord } from '$lib/utils/words';
import { setTransitionTimeout } from '$lib/utils/transition-timeout';

export enum GuessType {
	None,
	Incorrect,
	Valid,
	Correct
}

export enum GameState {
	Resetting,
	Playing,
	Ended
}

export interface Guess {
	front: string;
	back: string;
	type: GuessType;
}

export const CHARACTERS_PER_ROW = 5;
export const ROWS = 6;

export function createGameStore() {
	let idx = 0;

	const guesses = $state<Guess[]>([]);

	for (let i = 0; i < CHARACTERS_PER_ROW * ROWS; i++) {
		guesses.push({
			front: '',
			back: '',
			type: GuessType.None
		});
	}

	const keyboard = $state(new SvelteMap<string, GuessType>());
	let state = $state<GameState>(GameState.Playing);
	let row = $state(0);
	let isWinner = $state(false);
	let word = $state(getRandomWord());

	function reset() {
		idx = 0;
		row = 0;

		keyboard.clear();
		state = GameState.Resetting;

		for (let i = 0; i < CHARACTERS_PER_ROW * ROWS; i++) {
			guesses[i].front = '';
		}

		setTransitionTimeout(() => {
			state = GameState.Playing;
			word = getRandomWord();

			for (let i = 0; i < CHARACTERS_PER_ROW * ROWS; i++) {
				guesses[i].back = '';
				guesses[i].type = GuessType.None;
			}
		});
	}

	function add(character: string) {
		if (idx !== CHARACTERS_PER_ROW) {
			getCurrentGuessAtIndex(idx).front = character;
			getCurrentGuessAtIndex(idx).back = character;
			idx++;
		}
	}

	function remove() {
		if (idx !== 0) {
			idx--;
			getCurrentGuessAtIndex(idx).front = '';
		}
	}

	function verifyWord() {
		const guess = getCurrentGuess();

		return isValidWord(guess);
	}

	function submit() {
		if (idx !== CHARACTERS_PER_ROW || !verifyWord()) return false;

		const feedback = validateGuess(word, getCurrentGuess());

		for (let i = 0; i < CHARACTERS_PER_ROW; i++) {
			const guess = getCurrentGuessAtIndex(i);
			guess.type = feedback[i];
			updateKeyboard(guess);
		}

		if (word === getCurrentGuess()) {
			isWinner = true;
			row++;
			endGame();
		} else {
			idx = 0;
			row++;
			if (row === ROWS) {
				endGame();
			}
		}

		return true;
	}

	function endGame() {
		setTransitionTimeout(() => {
			state = GameState.Ended;
		});
	}

	function getCurrentGuessAtIndex(index: number) {
		return guesses[index + row * CHARACTERS_PER_ROW];
	}

	function getCurrentGuess() {
		let guess = '';
		for (let i = 0; i < CHARACTERS_PER_ROW; i++) {
			guess += getCurrentGuessAtIndex(i).front;
		}

		return guess;
	}

	function updateKeyboard(guess: Guess) {
		const currentGuessType = keyboard.get(guess.front) ?? GuessType.None;

		if (guess.type > currentGuessType) {
			keyboard.set(guess.front, guess.type);
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
