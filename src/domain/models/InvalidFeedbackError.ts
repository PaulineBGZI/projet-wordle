export class InvalidFeedbackError extends Error {
    constructor() {
        super("Le feedback doit contenir exactement 5 lettres");
        this.name = "InvalidFeedbackError";
    }
}
