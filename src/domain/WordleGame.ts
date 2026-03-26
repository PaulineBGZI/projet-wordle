import { Dictionary } from "./ports/Dictionary";
import { FeedbackEvaluator } from "./services/FeedbackEvaluator";
import { GuessFeedback } from "./models/GuessFeedback";
import { GameStatus } from "./models/GameStatus";
import { Word } from "./models/Word";
import { InvalidWordError } from "./models/InvalidWordError";

export class WordleGame {
    private readonly secretWord: Word;
    private readonly dictionary: Dictionary;
    private readonly evaluator: FeedbackEvaluator;
    private readonly maxAttempts: number;

    private attempts: number = 0;
    private status: GameStatus = GameStatus.IN_PROGRESS;

    constructor(dictionary: Dictionary, maxAttempts: number = 6) {
        this.dictionary = dictionary;
        this.secretWord = dictionary.getRandomWord();
        this.evaluator = new FeedbackEvaluator();
        this.maxAttempts = maxAttempts;
    }

    play(guess: string): GuessFeedback {
        if (this.status !== GameStatus.IN_PROGRESS) {
            throw new Error("Game is already finished");
        }

        const word = new Word(guess);

        if (!this.dictionary.isValidWord(word)) {
            throw new InvalidWordError(guess);
        }

        const feedback = this.evaluator.evaluate(this.secretWord, word);

        this.attempts++;

        if (feedback.isWin()) {
            this.status = GameStatus.WON;
        } else if (this.attempts >= this.maxAttempts) {
            this.status = GameStatus.LOST;
        }

        return feedback;
    }

    getStatus(): GameStatus {
        return this.status;
    }

    getAttempts(): number {
        return this.attempts;
    }

    getMaxAttempts(): number {
        return this.maxAttempts;
    }
}