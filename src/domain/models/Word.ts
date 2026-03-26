import { InvalidWordError } from "./InvalidWordError";

export class Word {
    private readonly value: string;

    constructor(value: string) {
        const normalized = value.trim().toUpperCase();

        if (normalized.length !== 5) {
            throw new InvalidWordError(value);
        }

        if (!/^[A-Z]+$/.test(normalized)) {
            throw new InvalidWordError(value);
        }

        this.value = normalized;
    }

    getValue(): string {
        return this.value;
    }

    getLetterAt(index: number): string {
        return this.value[index];
    }

    equals(other: Word): boolean {
        return this.value === other.value;
    }
}