import { GuessFeedback } from "../models/GuessFeedback";
import { LetterFeedback } from "../models/LetterFeedback";
import { Word } from "../models/Word";

export class FeedbackEvaluator {
    evaluate(secretWord: Word, guessedWord: Word): GuessFeedback {
        const secret = secretWord.getValue().split("");
        const guess = guessedWord.getValue().split("");

        const feedback: LetterFeedback[] = Array(5).fill(LetterFeedback.ABSENT);
        const remainingLetters: string[] = [];

        for (let index = 0; index < 5; index += 1) {
            if (guess[index] === secret[index]) {
                feedback[index] = LetterFeedback.CORRECT;
            } else {
                remainingLetters.push(secret[index]);
            }
        }

        for (let index = 0; index < 5; index += 1) {
            if (feedback[index] === LetterFeedback.CORRECT) {
                continue;
            }

            const misplacedLetterIndex = remainingLetters.indexOf(guess[index]);

            if (misplacedLetterIndex !== -1) {
                feedback[index] = LetterFeedback.MISPLACED;
                remainingLetters.splice(misplacedLetterIndex, 1);
            }
        }

        return new GuessFeedback(feedback);
    }
}