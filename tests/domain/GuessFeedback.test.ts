import { describe, expect, it } from "vitest";
import { GuessFeedback } from "../../src/domain/models/GuessFeedback";
import { InvalidFeedbackError } from "../../src/domain/models/InvalidFeedbackError";
import { LetterFeedback } from "../../src/domain/models/LetterFeedback";

describe("GuessFeedback", () => {
    it("should reject feedback that does not contain exactly five letters", () => {
        // Given
        const incompleteFeedback = [
            LetterFeedback.CORRECT,
            LetterFeedback.ABSENT,
        ];

        // When / Then
        expect(() => new GuessFeedback(incompleteFeedback)).toThrow(InvalidFeedbackError);
    });

    it("should protect its feedback from outside changes", () => {
        // Given
        const feedback = new GuessFeedback([
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
        ]);

        // When
        const exposedFeedback = feedback.getFeedback();
        exposedFeedback[0] = LetterFeedback.ABSENT;

        // Then
        expect(feedback.isWin()).toBe(true);
    });
});
