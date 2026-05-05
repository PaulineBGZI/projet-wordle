import { expect, it } from "vitest";
import { WordleGame } from "../../src/domain/WordleGame";
import { FakeDictionary } from "../doubles/FakeDictionary";
import { GameStatus } from "../../src/domain/models/GameStatus";
import { InvalidWordError } from "../../src/domain/models/InvalidWordError";
import { GameAlreadyFinishedError } from "../../src/domain/models/GameAlreadyFinishedError";

it("should win the game when the correct word is guessed", () => {
        // Given
        const secretWord = "LIVRE";
        const dictionary = new FakeDictionary([secretWord], secretWord);
        const game = new WordleGame(dictionary);

        // When
        const result = game.play(secretWord);

        // Then
        expect(result.isWin()).toBe(true);
        expect(game.getStatus()).toBe(GameStatus.WON);
        expect(game.getAttempts()).toBe(1);
});

it("should lose the game after reaching max attempts", () => {
        // Given
        const secretWord = "LIVRE";
        const wrongGuess = "ABCDE";
        const maxAttempts = 2;
        const dictionary = new FakeDictionary([secretWord, wrongGuess], secretWord);
        const game = new WordleGame(dictionary, maxAttempts);

        // When
        game.play(wrongGuess);
        game.play(wrongGuess);

        // Then
        expect(game.getStatus()).toBe(GameStatus.LOST);
        expect(game.getAttempts()).toBe(maxAttempts);
});

it("should throw an error if the word is not in the dictionary", () => {
        // Given
        const secretWord = "LIVRE";
        const unknownWord = "XXXXX";
        const dictionary = new FakeDictionary([secretWord], secretWord);
        const game = new WordleGame(dictionary);

        // When / Then
        expect(() => game.play(unknownWord)).toThrow(InvalidWordError);
        expect(game.getAttempts()).toBe(0);
        expect(game.getStatus()).toBe(GameStatus.IN_PROGRESS);
});

it("should reject words with the wrong length", () => {
        // Given
        const secretWord = "LIVRE";
        const tooShortGuess = "CHAT";
        const dictionary = new FakeDictionary([secretWord], secretWord);
        const game = new WordleGame(dictionary);

        // When / Then
        expect(() => game.play(tooShortGuess)).toThrow(InvalidWordError);
        expect(game.getAttempts()).toBe(0);
});

it("should not allow playing after the game is finished", () => {
        // Given
        const secretWord = "LIVRE";
        const dictionary = new FakeDictionary([secretWord], secretWord);
        const game = new WordleGame(dictionary);
        game.play(secretWord);

        // When / Then
        expect(() => game.play(secretWord)).toThrow(GameAlreadyFinishedError);
});
