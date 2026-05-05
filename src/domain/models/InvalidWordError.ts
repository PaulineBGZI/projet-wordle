export class InvalidWordError extends Error {
    constructor(word: string) {
        super(`"${word}" n'est pas un mot valide de 5 lettres`);
        this.name = "InvalidWordError";
    }
}
