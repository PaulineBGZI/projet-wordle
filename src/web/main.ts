import { WordleGame } from "../domain/WordleGame";
import { InMemoryDictionary } from "../infrastructure/dictionary/InMemoryDictionary";
import { GameStatus } from "../domain/models/GameStatus";
import { LetterFeedback } from "../domain/models/LetterFeedback";

const gridElement = document.getElementById("grid");
const formElement = document.getElementById("guess-form");
const inputElement = document.getElementById("guess-input");
const messageElement = document.getElementById("message");
const playAgainButtonElement = document.getElementById("play-again-button");
const appElement = document.getElementById("app");
const effectsCanvasElement = document.getElementById("effects-canvas");

if (
    !(gridElement instanceof HTMLDivElement) ||
    !(formElement instanceof HTMLFormElement) ||
    !(inputElement instanceof HTMLInputElement) ||
    !(messageElement instanceof HTMLParagraphElement) ||
    !(playAgainButtonElement instanceof HTMLButtonElement) ||
    !(appElement instanceof HTMLElement) ||
    !(effectsCanvasElement instanceof HTMLCanvasElement)
) {
    throw new Error("Web interface elements not found");
}

const grid: HTMLDivElement = gridElement;
const form: HTMLFormElement = formElement;
const input: HTMLInputElement = inputElement;
const message: HTMLParagraphElement = messageElement;
const playAgainButton: HTMLButtonElement = playAgainButtonElement;
const app: HTMLElement = appElement;
const effectsCanvas: HTMLCanvasElement = effectsCanvasElement;

const rawContext = effectsCanvas.getContext("2d");

if (!rawContext) {
    throw new Error("Canvas context not available");
}

const context: CanvasRenderingContext2D = rawContext;

type Particle = {
    x: number;
    y: number;
    size: number;
    velocityX: number;
    velocityY: number;
    gravity: number;
    life: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
};

const dictionary = new InMemoryDictionary();
const game = new WordleGame(dictionary);

let currentRow = 0;
let particles: Particle[] = [];
let animationFrameId = 0;

function resizeCanvas(): void {
    effectsCanvas.width = window.innerWidth;
    effectsCanvas.height = window.innerHeight;
}

function createEmptyGrid(): void {
    for (let index = 0; index < 30; index += 1) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
    }
}

function clearMessageClasses(): void {
    message.classList.remove("error", "success", "loss");
}

function renderGuess(word: string, feedback: LetterFeedback[]): void {
    for (let index = 0; index < 5; index += 1) {
        const cellIndex = currentRow * 5 + index;
        const cell = grid.children[cellIndex];

        if (!(cell instanceof HTMLDivElement)) {
            continue;
        }

        cell.textContent = word[index]?.toUpperCase() ?? "";

        setTimeout(() => {
            if (feedback[index] === LetterFeedback.CORRECT) {
                cell.classList.add("correct");
            } else if (feedback[index] === LetterFeedback.MISPLACED) {
                cell.classList.add("misplaced");
            } else {
                cell.classList.add("absent");
            }
        }, index * 120);
    }

    currentRow += 1;
}

/* PARTICLES ENGINE */

function startParticles(newParticles: Particle[]): void {
    particles = newParticles;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    animateParticles();
}

function animateParticles(): void {
    context.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);

    particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += particle.gravity;
        particle.rotation += particle.rotationSpeed;
        particle.life -= 1;

        context.fillStyle = particle.color;

        if (particle.rotationSpeed === 0) {
            // pluie verticale
            context.fillRect(
                particle.x,
                particle.y,
                particle.size,
                particle.size * 6
            );
        } else {
            // confettis
            context.save();
            context.translate(particle.x, particle.y);
            context.rotate(particle.rotation);
            context.fillRect(
                -particle.size / 2,
                -particle.size / 2,
                particle.size,
                particle.size * 0.6
            );
            context.restore();
        }
    });

    particles = particles.filter((particle) => particle.life > 0);

    if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animateParticles);
    } else {
        context.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);
    }
}

/* ANIMATIONS */

function launchConfetti(): void {
    const colors = ["#6a5cff", "#00c2a8", "#ffd166", "#ff4d6d", "#ffffff"];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.25;

    const confetti: Particle[] = [];

    for (let index = 0; index < 140; index += 1) {
        confetti.push({
            x: centerX,
            y: centerY,
            size: Math.random() * 10 + 6,
            velocityX: (Math.random() - 0.5) * 10,
            velocityY: Math.random() * -10 - 4,
            gravity: 0.18,
            life: 90 + Math.random() * 40,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.3,
        });
    }

    startParticles(confetti);
}

function launchLossAnimation(): void {
    const colors = ["#ff4d4d", "#ff6b6b", "#ff8e8e"];

    const drops: Particle[] = [];

    for (let index = 0; index < 120; index += 1) {
        drops.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * -window.innerHeight,
            size: Math.random() * 2 + 1,
            velocityX: 0,
            velocityY: Math.random() * 4 + 3,
            gravity: 0.05,
            life: 120,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: 0,
            rotationSpeed: 0,
        });
    }

    startParticles(drops);
}

/* GAME FLOW */

function endGame(text: string, result: "win" | "lose"): void {
    clearMessageClasses();
    message.textContent = text;
    input.disabled = true;
    playAgainButton.classList.remove("hidden");

    if (result === "win") {
        message.classList.add("success");
        app.classList.add("win");
        launchConfetti();
        return;
    }

    message.classList.add("loss");
    app.classList.add("lose");
    launchLossAnimation();
}

/* INIT */

resizeCanvas();
createEmptyGrid();
input.focus();

window.addEventListener("resize", resizeCanvas);

/* EVENTS */

form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const guess = input.value.trim();

    try {
        const result = game.play(guess);

        renderGuess(guess, result.getFeedback());
        input.value = "";
        input.focus();
        clearMessageClasses();
        message.textContent = "";

        if (game.getStatus() === GameStatus.WON) {
            endGame("You won!", "win");
            return;
        }

        if (game.getStatus() === GameStatus.LOST) {
            endGame(`You lost! The word was ${game.getSecretWord()}.`, "lose");
        }
    } catch (error: unknown) {
        clearMessageClasses();
        message.classList.add("error");

        if (error instanceof Error) {
            message.textContent = error.message;
        } else {
            message.textContent = "An unexpected error occurred";
        }
    }
});

playAgainButton.addEventListener("click", () => {
    window.location.reload();
});