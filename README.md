# Fruit Clicker 🍎

A mobile-first clicker/idle game built with vanilla JavaScript. Tap fruits, build your garden, and unlock new fruits to create your fruit empire!

## Features

- Tap to earn coins with satisfying particles and sounds
- 10 fruit types with increasing costs and income
- Passive income from purchased fruits
- Offline earnings
- Prestige system with permanent multipliers
- Auto-save with progressive web app support
- Fully responsive — works on all phones

## Development

### Setup

```bash
npm install
npx cap add android
npx cap sync android
```

### Build APK (Debug)

```bash
cd android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Build APK (Release)

```bash
cd android
./gradlew assembleRelease
```

## GitHub Actions

Push to `main` or `master` to automatically build a debug APK. Upload the artifact from the workflow run.

## Game Objects

| Fruit | Emoji | Click Value | Income/sec | Base Cost |
|-------|-------|-------------|------------|-----------|
| Apple | 🍎 | 1 | 0.5 | Free |
| Orange | 🍊 | 2 | 2 | 50 |
| Lemon | 🍋 | 5 | 6 | 200 |
| Grapes | 🍇 | 10 | 18 | 800 |
| Strawberry | 🍓 | 20 | 50 | 3,000 |
| Peach | 🍑 | 40 | 150 | 12,000 |
| Cherry | 🍒 | 80 | 500 | 40,000 |
| Kiwi | 🥝 | 160 | 1,500 | 150,000 |
| Pineapple | 🍍 | 320 | 5,000 | 500,000 |
| Watermelon | 🍉 | 640 | 15,000 | 2,000,000 |

## Tech Stack

- Vanilla JavaScript
- HTML5 + CSS3 (Glassmorphism design)
- Capacitor for Android APK build
- LocalStorage for saves

## License

MIT