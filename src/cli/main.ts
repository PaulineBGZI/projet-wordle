import readline from "readline";
import { InMemoryDictionary } from "../infrastructure/dictionary/InMemoryDictionary";
import { WordleGame } from "../domain/WordleGame";
import { GameStatus } from "../domain/models/GameStatus";
import { LetterFeedback } from "../domain/models/LetterFeedback";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dictionary = new InMemoryDictionary();
const game = new WordleGame(dictionary);

function translateFeedback(feedback: LetterFeedback): string {
    if (feedback === LetterFeedback.CORRECT) {
        return "BIEN PLACE";
    }

    if (feedback === LetterFeedback.MISPLACED) {
        return "MAL PLACE";
    }

    return "ABSENT";
}

function askGuess() {
    rl.question("Entre un mot de 5 lettres : ", (input: string) => {
        try {
            const feedback = game.play(input);

            console.log(
                feedback.getFeedback().map(translateFeedback).join(" | ")
            );

            if (game.getStatus() === GameStatus.WON) {
                console.log("Bravo, tu as gagné !");
                rl.close();
                return;
            }

            if (game.getStatus() === GameStatus.LOST) {
                console.log(`Perdu ! Le mot était ${game.getSecretWord()}.`);
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

console.log("Bienvenue dans Wordle !");
askGuess();
