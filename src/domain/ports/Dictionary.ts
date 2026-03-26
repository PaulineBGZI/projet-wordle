import { Word } from "../models/Word";

export interface Dictionary {
    isValidWord(word: Word): boolean;
    getRandomWord(): Word;
}