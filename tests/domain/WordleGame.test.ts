import { describe, expect, it } from "vitest";
import { WordleGame } from "../../src/domain/WordleGame";
import { FakeDictionary } from "../doubles/FakeDictionary";
import { GameStatus } from "../../src/domain/models/GameStatus";
import { InvalidWordError } from "../../src/domain/models/InvalidWordError";

describe("WordleGame", () => {
    it("should win the game when the correct word is guessed", () => {
        const dictionary = new FakeDictionary(["LIVRE"], "LIVRE");
        const game = new WordleGame(dictionary);

        const result = game.play("LIVRE");

        expect(result.isWin()).toBe(true);
        expect(game.getStatus()).toBe(GameStatus.WON);
    });

    it("should lose the game after reaching max attempts", () => {
        const dictionary = new FakeDictionary(["LIVRE", "ABCDE"], "LIVRE");
        const game = new WordleGame(dictionary, 2);

        game.play("ABCDE");
        game.play("ABCDE");

        expect(game.getStatus()).toBe(GameStatus.LOST);
    });

    it("should throw an error if the word is not in the dictionary", () => {
        const dictionary = new FakeDictionary(["LIVRE"], "LIVRE");
        const game = new WordleGame(dictionary);

        expect(() => game.play("XXXXX")).toThrow(InvalidWordError);
    });

    it("should not allow playing after the game is finished", () => {
        const dictionary = new FakeDictionary(["LIVRE"], "LIVRE");
        const game = new WordleGame(dictionary);

        game.play("LIVRE");

        expect(() => game.play("LIVRE")).toThrow();
    });
});