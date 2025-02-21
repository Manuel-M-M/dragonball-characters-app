# 🖥️ Frontend - Dragon Ball Characters App

This is the React + TypeScript frontend for the Dragon Ball Characters App. It connects to a backend middleware proxy and displays cached data.

## 🚀 Features

- **React + TypeScript**
- **Webpack from scratch (no CRA)**
- **Zustand state management**
- **Caching with a 24-hour expiration**
- **Jest & React Testing Library for TDD**
- **Styled Components for UI**
- **Development & Production environment support**

## 📁 Frontend Structure

```plaintext
frontend/
│── src/
│   ├── application/      # Business logic services
│   ├── components/       # UI Components
│   ├── infrastructure/   # API calls, caching, repository
│   ├── pages/            # Page components
│   ├── store/            # Zustand state management
│   ├── styles/           # Styled components
│   ├── utils/            # Helper functions (cache.ts, etc.)
│   ├── index.tsx         # Entry point
│   ├── App.tsx           # Main component
│── webpack.common.js
│── webpack.dev.js
│── webpack.prod.js
│── package.json
│── tsconfig.json
│── .env.development
│── .env.production
```

## 🚀 Running the App

### Development Mode:

```sh
npm run start
```

### Production Build:

```sh
npm run build
serve -s dist
```

## ✅ Running Tests

```sh
npm test
```

## 🔥 Webpack Configurations

- `webpack.dev.js` → Dev environment
- `webpack.prod.js` → Production environment
