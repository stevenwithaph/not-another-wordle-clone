import { GuessType } from '$lib/stores/game.svelte';
import wordsLists from './valid-words.txt?raw';

interface Feedback {
	correct: number[];
	incorrect: number[];
	valid: number[];
}

//HACK: this gets import differently between production and server
let search = '\n';

if (wordsLists.indexOf('\r') !== -1) {
	search = '\r\n';
}

const list = wordsLists.split(search);

const validWords = new Set<string>();

for (const word of list) {
	validWords.add(word);
}

export function isValidWord(word: string) {
	return validWords.has(word);
}

export function getRandomWord() {
	const random = ~~(Math.random() * list.length);

	return list[random];
}

export function validateGuess(word: string, guess: string) {
	const wordle = new Map<string, number>();
	const guessTypes: GuessType[] = new Array<GuessType>(word.length);

	for (const letter of word) {
		let amount = wordle.get(letter) ?? 0;
		wordle.set(letter, ++amount);
	}

	const feedback: Feedback = {
		correct: [],
		incorrect: [],
		valid: []
	};

	for (let i = 0; i < guess.length; i++) {
		if (word[i] === guess[i]) {
			feedback.correct.push(i);
		} else if (word.includes(guess[i])) {
			feedback.valid.push(i);
		} else {
			feedback.incorrect.push(i);
		}
	}

	for (const correctIndex of feedback.correct) {
		const letter = guess.charAt(correctIndex);
		guessTypes[correctIndex] = GuessType.Correct;

		wordle.set(letter, (wordle.get(letter) ?? 0) - 1);
	}

	for (const inWordIndex of feedback.valid) {
		const letter = guess.charAt(inWordIndex);

		const instances = wordle.get(letter) ?? 0;

		if (instances !== 0) {
			guessTypes[inWordIndex] = GuessType.Valid;
			wordle.set(letter, (wordle.get(letter) ?? 1) - 1);
		} else {
			guessTypes[inWordIndex] = GuessType.Incorrect;
		}

		wordle.set(letter, wordle.get(letter) ?? 0 - 1);
	}

	for (const incorrectIndex of feedback.incorrect) {
		guessTypes[incorrectIndex] = GuessType.Incorrect;
	}

	return guessTypes;
}
