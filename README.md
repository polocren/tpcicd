# vuecalculator

Calculatrice Vue 3 avec Vite (TP)

Objectif
- Petite calculatrice à deux champs (`a`, `b`) avec 4 opérations: addition, soustraction, multiplication, puissance.
- Tests unitaires (Vitest) sur les fonctions de calcul.
- Lint (ESLint) et CI/CD GitHub Actions avec déploiement par SSH.

Scripts utiles
- Développement: `npm run dev`
- Lint (local): `npm run lint`
- Tests unitaires: `npm run test:unit`
- Build prod: `npm run build` puis `npm run preview`

Structure
- `src/utils/calculs.js`: fonctions `add`, `sub`, `mul`, `pow` réutilisées par l'UI et les tests.
- `src/App.vue`: interface avec deux champs number et 4 boutons d'opérations.
- `src/__tests__/App.spec.js`: tests unitaires des fonctions.

CI/CD (GitHub Actions)
- Workflow: `.github/workflows/ci.yml`
  - À chaque push/PR sur `main`: installe, lint, teste et build.
  - Déploie automatiquement sur push vers `main` en copiant `dist/` sur un serveur SSH.

Secrets requis (Repo Settings → Secrets and variables → Actions)
- `SSH_HOST`: IP ou domaine du serveur.
- `SSH_USER`: utilisateur SSH (ex: `deploy`).
- `SSH_KEY`: clé privée SSH (contenu de `~/.ssh/id_rsa` ou clé dédiée).
- `SSH_PORT`: port SSH (optionnel, défaut 22).
- `DEPLOY_PATH`: dossier cible sur le serveur (ex: `/var/www/vuecalculator`).

Serveur cible (exemple)
- Configurer Nginx/Apache pour servir le dossier `DEPLOY_PATH` comme site statique.
- Exemple Nginx: `root /var/www/vuecalculator; try_files $uri /index.html;`.

Notes
- Le thème est forcé en sombre pour un rendu uniforme.
- Le test d'exemple d'origine a été remplacé par des tests sur `src/utils/calculs.js`.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
