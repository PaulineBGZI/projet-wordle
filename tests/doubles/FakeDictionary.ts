import { Dictionary } from "../../src/domain/ports/Dictionary";
import { Word } from "../../src/domain/models/Word";

export class FakeDictionary implements Dictionary {
    private readonly words: Word[];
    private readonly randomWord: Word;

    constructor(words: string[], randomWord?: string) {
        this.words = words.map(w => new Word(w));
        this.randomWord = randomWord
            ? new Word(randomWord)
            : this.words[0];
    }

    isValidWord(word: Word): boolean {
        return this.words.some(w => w.equals(word));
    }

    getRandomWord(): Word {
        return this.randomWord;
    }
}