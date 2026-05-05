import { expect, it } from "vitest";
import { InvalidWordError } from "../../src/domain/models/InvalidWordError";
import { Word } from "../../src/domain/models/Word";

it("should normalize lower-case words", () => {
        // Given
        const playerInput = "livre";

        // When
        const word = new Word(playerInput);

        // Then
        expect(word.getValue()).toBe("LIVRE");
});

it("should reject words containing non-letter characters", () => {
        // Given
        const invalidInput = "L1VRE";

        // When / Then
        expect(() => new Word(invalidInput)).toThrow(InvalidWordError);
});
