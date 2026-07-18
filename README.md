# EcoTrack

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![JavaScript](https://img.shields.io/badge/JavaScript-Node.js%20%7C%20React%20Native-f7df1e.svg)

A full-stack carbon footprint and sustainability tracker built as an Express/MongoDB REST API paired with an Expo (React Native) mobile client.

## Overview

EcoTrack lets a user log their environmental impact and set goals to reduce it. Each user (identified by email) accumulates two running series of values:

- **Footprint**: carbon-emitting activities logged over time.
- **Handprint**: positive, emission-reducing actions logged over time.

Users can also create, list, and delete **sustainability goals**, each with a title, description, and an associated `carbonEmission` figure.

The repository has two parts:

- **`/` (root)** is the backend, a Node.js + Express REST API backed by MongoDB via Mongoose. User data is keyed by email; footprint and handprint are stored as arrays of numeric entries, and goals are stored as an embedded subdocument array (each goal gets a UUID).
- **`ecotrack_main2/`** is the frontend, an Expo / React Native app (React Native 0.71, Expo SDK 48) that talks to the API over HTTP, with Firebase authentication and Google Sign-In, drawer/stack navigation, and chart rendering for impact data.

## API endpoints

The server (`index.js`) mounts the following routes and listens on port `3000`:

| Method | Route | Purpose |
| ------ | ----- | ------- |
| POST   | `/addUser` | Register a user by email |
| POST   | `/getFootPrint` | Return a user's footprint entries |
| POST   | `/increaseFootPrint` | Append a footprint value |
| POST   | `/getHandPrint` | Return a user's handprint entries |
| POST   | `/increaseHandPrint` | Append a handprint value |
| POST   | `/addGoal` | Add a goal (`title`, `description`, `carbonEmission`) |
| POST   | `/getGoals` | List a user's goals |
| DELETE | `/deleteGoal/:goalId` | Delete a goal by its UUID |

All request bodies are JSON and identify the user by `email`.

## Tech stack

**Backend:** Node.js, Express, Mongoose (MongoDB), body-parser, dotenv, uuid, nodemon.

**Frontend:** Expo / React Native, React Navigation (drawer + native-stack), Firebase (Auth + Firestore), Google Sign-In, axios, NativeBase, `react-native-chart-kit`, `expo-camera`, `expo-notifications`.

## Run

### Backend

```bash
# from the repository root
npm install

# create a .env file with your MongoDB connection string
echo "mongo_URL=<your-mongodb-connection-string>" > .env

npx nodemon index.js   # or: node index.js
```

The API then listens on `http://localhost:3000`.

### Frontend (Expo)

```bash
cd ecotrack_main2
npm install
npm start          # then open in Expo Go, or use `npm run android` / `npm run ios`
```

## Scope & limitations

This is a student / exploratory project, and the repository is a partial snapshot rather than a fully runnable release:

- The backend `index.js` requires a Mongoose model at `./models/User`, which is **not included** in this repository. That model must be added before the API will start.
- The frontend `App.js` imports a `./navigation` module (screens and navigators) that is **not committed** here, so the Expo app as published is incomplete.
- A MongoDB instance and a `.env` file with a valid `mongo_URL` are required for the backend.
- There is no automated test suite, input validation is minimal, and there is no authentication/authorization layer on the API (requests are trusted by email alone).

## License

Released under the [MIT License](LICENSE).
