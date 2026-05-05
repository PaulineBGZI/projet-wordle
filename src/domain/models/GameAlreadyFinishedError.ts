export class GameAlreadyFinishedError extends Error {
    constructor() {
        super("La partie est déjà terminée");
        this.name = "GameAlreadyFinishedError";
    }
}
