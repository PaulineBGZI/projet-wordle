import { Dictionary } from "../../domain/ports/Dictionary";
import { Word } from "../../domain/models/Word";
import { WORDS } from "./words";

export class InMemoryDictionary implements Dictionary {
    private readonly words: Word[];

    constructor() {
        this.words = WORDS.map((w) => new Word(w));
    }

    isValidWord(word: Word): boolean {
        return this.words.some((w) => w.equals(word));
    }

    getRandomWord(): Word {
        const index = Math.floor(Math.random() * this.words.length);
        return this.words[index];
    }
}