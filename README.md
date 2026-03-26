# Projet Wordle

## Description

Ce projet est une implémentation du jeu Wordle en TypeScript, réalisée en suivant les principes du Test Driven Development (TDD) et du Domain Driven Design (DDD).

---

## Fonctionnalités

- Jeu Wordle avec une interface
- Validation des mots (5 lettres uniquement)
- Vérification via un dictionnaire
- Feedback des lettres :
  - CORRECT (vert)
  - MISPLACED (jaune)
  - ABSENT (gris)
- Gestion des tentatives
- Détection victoire / défaite 
- Animations visuelles :
  - Confettis lors de la victoire
  - Pluie rouge lors de la défaite

---

## Technologies utilisées

- TypeScript
- Vitest (tests unitaires)
- Vite (interface web)
- HTML / CSS

---

## Lancer le projet

### Installation
```bash
npm install
```

### Lancer les tests
```bash
npm test
```

### Lancer le jeu
```bash
npm run dev
```