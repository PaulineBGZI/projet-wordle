import { LetterFeedback } from "./LetterFeedback";

export class GuessFeedback {
    private readonly feedback: LetterFeedback[];

    constructor(feedback: LetterFeedback[]) {
        if (feedback.length !== 5) {
            throw new Error("Feedback must contain exactly 5 letters");
        }

        this.feedback = feedback;
    }

    getFeedback(): LetterFeedback[] {
        return this.feedback;
    }

    isWin(): boolean {
        return this.feedback.every((value) => value === LetterFeedback.CORRECT);
    }
}