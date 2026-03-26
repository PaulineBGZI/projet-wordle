export class InvalidWordError extends Error {
    constructor(word: string) {
        super(`"${word}" is not a valid 5-letter word`);
        this.name = "InvalidWordError";
    }
}