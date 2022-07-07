import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function checkIfRealWord(word: string) {
  return await fetch(`${DICTIONARY_API}${word}`).then(
    (response) => response.ok
  );
}

// 'b': bull - correct letter and correct place
// 'c': cow - correct letter and incorrect place
// 'i': incorrect letter
export type LetterFeedback = "b" | "c" | "i" | null;

export interface Feedback {
  letter: string;
  feedback: LetterFeedback;
}

export interface Guess {
  word: string;
  feedback: Array<Feedback>;
}

function calculateFeedback(word: string, guess: string): Array<Feedback> {
  const wordLetters = word.split("").map((letter) => {
    return { letter: letter, marked: false };
  });
  const guessLetters = guess.split("").map((letter) => {
    return {
      letter: letter,
      marked: false,
      feedback: "i" as LetterFeedback,
    };
  });

  // Parse for bulls
  for (let index = 0; index < guessLetters.length; ++index) {
    const actual = wordLetters[index];
    const guess = guessLetters[index];

    if (actual.letter === guess.letter) {
      actual.marked = true;
      guess.marked = true;
      guess.feedback = "b";
    }
  }

  // Parse for cows
  for (let guessIndex = 0; guessIndex < guessLetters.length; ++guessIndex) {
    if (guessLetters[guessIndex].marked) continue;
    for (let actualIndex = 0; actualIndex < wordLetters.length; ++actualIndex) {
      if (wordLetters[actualIndex].marked) continue;

      const actual = wordLetters[actualIndex];
      const guess = guessLetters[guessIndex];

      if (actual.letter === guess.letter) {
        actual.marked = true;
        guess.marked = true;
        guess.feedback = "c";
      }
    }
  }

  return guessLetters.map((letter) => {
    return {
      letter: letter.letter,
      feedback: letter.feedback,
    };
  });
}

export const useVuerdleStore = defineStore("vuerdle", {
  state: () => {
    return {
      WORD_LENGTH: 5,
      MAX_GUESSES: 6,
      word: useStorage("word", ""),
      guesses: useStorage("guesses", [] as Array<Guess>),
      result: useStorage("result", null as string | null),
      hardMode: useStorage("hardMode", false),
      darkTheme: useStorage("darkTheme", false),
      highContrast: useStorage("highContrast", false),
    };
  },
  actions: {
    async fetchWord() {
      fetch(
        `https://random-word-api.herokuapp.com/word?length=${this.WORD_LENGTH}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.word = data[0];
          this.guesses = [];
          this.result = null;
        });

      if (!checkIfRealWord(this.word)) {
        await this.fetchWord();
      }
    },
    async addGuess(guess: string) {
      if (guess.length !== this.WORD_LENGTH) {
        throw Error(`Guess must have a length of ${this.WORD_LENGTH}`);
      }
      if (this.guesses.some(({ word }) => guess === word)) {
        throw Error("Duplicate guess");
      }
      if (!(await checkIfRealWord(guess))) {
        throw Error("Invalid word");
      }
      if (this.hardMode) {
        const hints = [
          ...new Set(
            this.guesses
              .flatMap((guess) => guess.feedback)
              .filter((feedback) => feedback.feedback !== "i")
              .map((feedback) => feedback.letter)
          ),
        ];

        if (!hints.every((hint) => guess.includes(hint))) {
          throw Error("Must use all hints");
        }
      }

      const guessWithFeedback = {
        word: guess,
        feedback: calculateFeedback(this.word, guess),
      };
      this.guesses.push(guessWithFeedback);

      // End of game check
      if (this.word === guess) {
        this.result = "Congratulations! You won! 🥳";
      } else if (this.guesses.length >= this.MAX_GUESSES) {
        this.result = "Game Over! Try again! 😵";
      }
    },
  },
});
