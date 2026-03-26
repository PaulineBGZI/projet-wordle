import { describe, expect, it } from "vitest";
import { FeedbackEvaluator } from "../../src/domain/services/FeedbackEvaluator";
import { LetterFeedback } from "../../src/domain/models/LetterFeedback";
import { Word } from "../../src/domain/models/Word";

describe("FeedbackEvaluator", () => {
    it("should return CORRECT for all letters when guess matches secret", () => {
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("LIVRE");

        const result = evaluator.evaluate(secretWord, guessedWord);

        expect(result.getFeedback()).toEqual([
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
            LetterFeedback.CORRECT,
        ]);
    });

    it("should return ABSENT for all letters when none are present in the secret word", () => {
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("CHANT");

        const result = evaluator.evaluate(secretWord, guessedWord);

        expect(result.getFeedback()).toEqual([
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
        ]);
    });

    it("should return MISPLACED for letters present in the secret word but in the wrong position", () => {
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("REVIL");

        const result = evaluator.evaluate(secretWord, guessedWord);

        expect(result.getFeedback()).toEqual([
            LetterFeedback.MISPLACED,
            LetterFeedback.MISPLACED,
            LetterFeedback.CORRECT,
            LetterFeedback.MISPLACED,
            LetterFeedback.MISPLACED,
        ]);
    });

    it("should mark extra occurrences as ABSENT when a letter appears too many times", () => {
        const evaluator = new FeedbackEvaluator();
        const secretWord = new Word("LIVRE");
        const guessedWord = new Word("RAMER");

        const result = evaluator.evaluate(secretWord, guessedWord);

        expect(result.getFeedback()).toEqual([
            LetterFeedback.MISPLACED,
            LetterFeedback.ABSENT,
            LetterFeedback.ABSENT,
            LetterFeedback.MISPLACED,
            LetterFeedback.ABSENT,
        ]);
    });
});