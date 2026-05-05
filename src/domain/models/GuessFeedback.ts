import { LetterFeedback } from "./LetterFeedback";
import { InvalidFeedbackError } from "./InvalidFeedbackError";

export class GuessFeedback {
    private readonly feedback: LetterFeedback[];

    constructor(feedback: LetterFeedback[]) {
        if (feedback.length !== 5) {
            throw new InvalidFeedbackError();
        }

        this.feedback = [...feedback];
    }

    getFeedback(): LetterFeedback[] {
        return [...this.feedback];
    }

    isWin(): boolean {
        return this.feedback.every((value) => value === LetterFeedback.CORRECT);
    }
}
