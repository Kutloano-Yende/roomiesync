# RoomieSync Mobile

React Native (Expo) mobile application foundation for RoomieSync.

## Scope of this foundation

This sets up the basic application skeleton only:
- Application entry point (`index.ts` → `App.tsx`)
- Navigation container with a single placeholder screen
- A `HomeScreen` confirming the app is running
- An API service layer skeleton (`src/services/apiClient.ts`) that can reach
  the backend's `GET /health` endpoint
- Environment configuration for the API base URL
- Test setup

**Not included yet** (pending architecture decisions on currently unresolved
requirements — see project `docs/`): authentication, Firebase/Supabase
integration, Stripe, chat, the AI/ML matching UI, or any of the 15 product
screens defined in the RoomieSync UI prototype.

## Requirements

- Node.js 18+
- npm

Running on a simulator/device additionally requires either:
- Expo Go (easiest, no native toolchain needed), or
- Xcode (iOS) / Android Studio (Android) for native builds

## Local Setup

```bash
cd mobile
npm install
cp .env.example .env
```

## Run the app

```bash
npm start
```

This starts the Expo development server. From there you can:
- Press `w` to open in a web browser
- Press `i` to open in the iOS simulator (requires Xcode)
- Press `a` to open in the Android emulator (requires Android Studio)
- Scan the QR code with the Expo Go app on a physical device

## Run tests

```bash
npm test
```

## Type-check

```bash
npm run typecheck
```

## Structure

```
mobile/
├── App.tsx                        # App entry component
├── index.ts                       # Expo root registration
├── src/
│   ├── screens/
│   │   └── HomeScreen.tsx         # Placeholder "app is running" screen
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Root navigation stack
│   ├── services/
│   │   └── apiClient.ts           # Backend API client skeleton
│   └── config/
│       └── env.ts                 # Environment/config handling
├── __tests__/
│   └── HomeScreen.test.tsx
├── app.json                       # Expo app configuration
├── package.json
├── tsconfig.json
└── .env.example
```

## Connecting to the backend

The API base URL is read from `EXPO_PUBLIC_API_BASE_URL` (see `.env.example`).
By default it points to `http://localhost:8000`, matching the local FastAPI
backend in `../backend`. When running on a physical device, replace
`localhost` with your machine's local network IP address.
