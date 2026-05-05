import { describe, expect, it } from "vitest";
import { FeedbackEvaluator } from "../../src/domain/services/FeedbackEvaluator";
import { LetterFeedback } from "../../src/domain/models/LetterFeedback";
import { Word } from "../../src/domain/models/Word";

describe("FeedbackEvaluator", () => {
    it("should return CORRECT for all letters when guess matches secret", () => {
        // Given
        const evaluator = new FeedbackEvaluator();
        const secretWordValue = "LIVRE";
        const secretWord = new Word(secretWordValue);
        const guessedWord = new Word(secretWordValue);

        // When
        const result = evaluator.evaluate(secretWord, guessedWord);

        // Then
        expect(result.getFeedback()).toEqual([
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
        ]);
    });

    it("should return ABSENT for all letters when none are present in the secret word", () => {
        // Given
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("CHANT");

        // When
        const result = evaluator.evaluate(secretWord, guessedWord);

        // Then
        expect(result.getFeedback()).toEqual([
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
        ]);
    });

    it("should return MISPLACED for letters present in the secret word but in the wrong position", () => {
        // Given
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("REVIL");

        // When
        const result = evaluator.evaluate(secretWord, guessedWord);

        // Then
        expect(result.getFeedback()).toEqual([
            LetterFeedback.MISPLACED,
            LetterFeedback.MISPLACED,
            LetterFeedback.CORRECT,
            LetterFeedback.MISPLACED,
            LetterFeedback.MISPLACED,
        ]);
    });

    it("should mark extra occurrences as ABSENT when a letter appears too many times", () => {
        // Given
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("RAMER");

        // When
        const result = evaluator.evaluate(secretWord, guessedWord);

        // Then
        expect(result.getFeedback()).toEqual([
            LetterFeedback.MISPLACED,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.MISPLACED,
            LetterFeedback.ABSENT,
        ]);
    });

    it("should prioritize CORRECT letters when handling duplicate letters", () => {
        // Given
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("BALAI");
        const guessedWord = new Word("AALAA");

        // When
        const result = evaluator.evaluate(secretWord, guessedWord);

        // Then
        expect(result.getFeedback()).toEqual([
            LetterFeedback.ABSENT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.ABSENT,
        ]);
    });
});
