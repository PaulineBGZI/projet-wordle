# Projet Wordle

## Description

Ce projet est une implémentation du jeu Wordle en TypeScript, réalisée en suivant les principes du Test Driven Development (TDD) et du Domain Driven Design (DDD).

---

## Fonctionnalités

- Jeu Wordle jouable via une interface web
- Jeu également disponible en CLI
- Validation des mots (5 lettres alphabétiques uniquement)
- Vérification via un dictionnaire
- Feedback des lettres :
  - CORRECT (vert)
  - MISPLACED (jaune)
  - ABSENT (gris)
- Gestion des tentatives
- Détection victoire / défaite
- Gestion des erreurs métier :
  - mot invalide
  - partie déjà terminée
- Animations visuelles :
  - Confettis lors de la victoire
  - Pluie rouge lors de la défaite

---

## Architecture

Le projet sépare le domaine métier de l'infrastructure et de l'affichage.

- `src/domain` contient les règles du jeu, les modèles métier et les ports.
- `src/domain/ports/Dictionary.ts` définit le contrat du dictionnaire.
- `src/infrastructure` contient l'implémentation concrète du dictionnaire.
- `src/web` contient l'interface web.
- `src/cli` contient l'interface en ligne de commande.
- `tests/doubles/FakeDictionary.ts` fournit une doublure déterministe pour les tests.

Le domaine ne dépend ni du DOM, ni de la console, ni d'un fichier ou d'une API externe. Le dictionnaire est injecté dans `WordleGame`, ce qui permet de contrôler le mot secret dans les tests.

---

## Règles métier testées

- Un mot valide est normalisé en majuscules.
- Un mot doit contenir exactement 5 lettres alphabétiques.
- Un mot absent du dictionnaire est rejeté.
- Une partie gagnée passe à l'état `WON`.
- Une partie perdue après le nombre maximum de tentatives passe à l'état `LOST`.
- Une tentative invalide ne consomme pas d'essai.
- Une partie terminée refuse toute nouvelle tentative.
- Les lettres multiples sont évaluées sans dépasser le nombre d'occurrences du mot secret.

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

### Lancer l'interface web
```bash
npm run dev
```

### Lancer la CLI
```bash
npm start
```

### Compiler l'interface web
```bash
npm run build:web
```
