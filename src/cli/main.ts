import readline from "readline";
import { InMemoryDictionary } from "../infrastructure/dictionary/InMemoryDictionary";
import { WordleGame } from "../domain/WordleGame";
import { GameStatus } from "../domain/models/GameStatus";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dictionary = new InMemoryDictionary();
const game = new WordleGame(dictionary);

function askGuess() {
    rl.question("Enter a 5-letter word: ", (input: string) => {
        try {
            const feedback = game.play(input);

            console.log(
                feedback.getFeedback().map((f) => f).join(" | ")
            );

            if (game.getStatus() === GameStatus.WON) {
                console.log("You won!");
                rl.close();
                return;
            }

            if (game.getStatus() === GameStatus.LOST) {
                console.log("You lost!");
                rl.close();
                return;
            }

            askGuess();
        } catch (error: any) {
            console.log(error.message);
            askGuess();
        }
    });
}

console.log("Welcome to Wordle!");
askGuess();