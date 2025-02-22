# 🐉 Dragon Ball Characters App

A full-stack web application that displays Dragon Ball characters using a React frontend and a Node.js backend as a middleware proxy. The application is fully configured with Webpack, TypeScript, Jest (for TDD), caching, and a development/production mode switch.

## 🚀 Features

- **React + TypeScript frontend**
- **Node.js + Express backend (proxy middleware)**
- **Global caching mechanism with a 24-hour expiration**
- **Development & Production environments**
- **Webpack custom build**
- **Comprehensive testing with Jest & React Testing Library**
- **Styled Components for styling**
- **ESLint & Prettier configuration**
- **Error handling & logging**

## 📁 Project Structure

```plaintext
dragonball-characters-app/
│── backend/                 # Backend service
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── server.ts
│   │   ├── app.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
│── frontend/                # Frontend application
│   ├── src/
│   │   ├── application/
│   │   ├── components/
│   │   ├── infrastructure/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── index.tsx
│   │   ├── App.tsx
│   ├── public/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   ├── webpack.prod.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
│── README.md                # General project documentation
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/Manuel-M-M/dragonball-characters-app.git
cd dragonball-characters-app
```

### 2️⃣ Install dependencies

```sh
cd backend
npm install

cd ../frontend
npm install
```

### 3️⃣ Environment Configuration

Create `.env.development` and `.env.production` in `frontend/` and `backend/` directories.

#### Example `.env` file:

```ini
API_URL=http://localhost:5000/api  # For frontend
PORT=5000  # For backend
```

## 4️⃣ Run the project

### Development mode:

```sh
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run start
```

### Production mode:

```sh
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd ../frontend
npm run build
serve -s dist
```

## ✅ Testing

###Run tests for both frontend and backend:

```sh
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📌 Technical Flow (High-Level Overview)

```sql
User ---> Frontend (React + TS)
         ---> Backend (Node.js Proxy)
         ---> Dragon Ball API
         ---> Cache System (24h Expiration)
```

## 🏗️ Architecture and Best Practices

This application follows **Hexagonal Architecture**, ensuring a clear separation of concerns between the domain, application, and infrastructure layers. It is built with a strong adherence to **SOLID principles** and **Clean Code** best practices, promoting maintainability, scalability, and testability.

By implementing these principles, the project achieves:

- **Encapsulation of business logic** to avoid unnecessary dependencies.
- **Decoupling between layers**, allowing flexibility in adapting new technologies.
- **High testability**, ensuring a reliable and robust application.
- **Readability and maintainability**, making it easier for developers to contribute and extend functionality.
