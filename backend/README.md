# 🖥️ Backend - Dragon Ball Characters App

This is the Node.js + Express backend for the Dragon Ball Characters App. It acts as a proxy middleware between the frontend and the Dragon Ball API.

## 🚀 Features

- **Express + TypeScript**
- **CORS enabled**
- **Environment-based configurations**
- **Middleware proxy for API calls**
- **Error handling & logging**
- **Jest for testing**

## 📁 Backend Structure

```plaintext
backend/
│── src/
│   ├── controllers/       # API controllers
│   ├── routes/            # Express routes
│   ├── services/          # Business logic
│   ├── app.ts             # Express app setup
│   ├── server.ts          # Server entry point
│── package.json
│── tsconfig.json
│── .env
```

## 🚀 Running the Server

### Development Mode:

```sh
npm run dev
```

### Production Build:

```sh
npm run build
npm start
```

## ✅ Running Tests

```sh
npm test
```

# 🔥 API Proxy Middleware

The backend acts as a middleware proxy, forwarding frontend requests to the Dragon Ball API.
