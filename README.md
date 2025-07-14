# 🕸️ Sykell Web Crawler Dashboard

A modern full-stack **demo web application** for crawling and managing URLs. Built to demonstrate clean architectural patterns, authentication, and an interactive dashboard interface.

> **Note:** This project is intended for **demo and learning purposes** only. It is not production-hardened.

---

## ✨ Features

- 🔐 Simple authentication via username and JWT tokens
- 🌐 Add URLs to be crawled and extract page titles
- 📈 Track crawl status (`queued`, `running`, `done`, `error`, `stopped`)
- 📊 Interactive dashboard with filtering, sorting, and pagination
- 📦 Modular frontend built with [ShadCN UI](https://ui.shadcn.com/)
- ⚡ Full TypeScript support, real-time polling, responsive UI
- 🧪 Tests via Vitest and React Testing Library
- 🚀 Easy setup using Docker for MySQL

---

## 🛠️ Tech Stack

| Frontend               | Backend           | Infrastructure |
|------------------------|-------------------|----------------|
| React (Vite)           | Go (Gin)          | MySQL (Docker) |
| TypeScript + Tailwind  | GORM ORM          | Docker Compose |
| ShadCN + TanStack Table| JWT Auth          |                |
| React Query            | RESTful API       |                |

---

## 📂 Project Structure

```txt
.
├── backend/               # Go API server
│   ├── internal/
│   │   ├── api/           # Handlers (auth, URL)
│   │   ├── db/            # DB connection
│   │   └── models/        # GORM models
│   └── main.go
├── frontend/              # Vite + React + Tailwind
│   ├── components/
│   ├── pages/
│   └── lib/api/           # useAuth, axios client
└── README.md
```
## 🚀 Getting Started
### Prerequisites
- Go 1.20+
- Node.js 18+
- Docker

## ⚙️ Backend Setup
### 1. Configure Environment
Create a `.env` file in the `backend/` directory:

```plaintext
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpass
DB_NAME=sykell
JWT_SECRET=your_secret_key
```

### 2. Install Go Modules
```bash
cd backend
go mod tidy
```

### 3. Run project and MySQL via Docker
```bash
docker-compose up --build
```
This will start the MySQL container and the Go API server. Your API will be available at `http://localhost:8080`.

### 4. Frontend Setup
#### 1. Install Node Modules
```bash
cd frontend
yarn install
```

#### 2. Create `.env` file
Create a `.env` file in the `frontend/` directory:
```plaintext
VITE_API_URL=http://localhost:8080
```

#### 3. Start Development Server
```bash
yarn dev
```
This will start the Vite development server. Your app will be available at `http://localhost:5173`.

### 5. Run Tests
#### Frontend Tests
```bash
cd frontend
yarn test
```

## 🔐 Authentication Flow
1. Visit /login and enter any name (e.g. Alice)
2. If the user doesn't exist, a new one is created
3. A JWT token is returned and saved in localStorage
4. Token is sent with every API request using Axios interceptor
5. Token expires in 24 hours

## 💡 Developer Notes
- You must be logged in to create or view URLs
- Only the URLs created by a user are shown in their dashboard
- Crawling is done asynchronously and status is updated over time
- JWT middleware checks auth on every protected endpoint

## 📚 Useful Resources
- [Gin Framework Docs](https://gin-gonic.com/en/docs/)
- [GORM Docs](https://gorm.io/docs/)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [ShadCN UI Docs](https://ui.shadcn.com/)
- [TanStack Table Docs](https://tanstack.com/table/v8/docs/overview)

## 🧪 Default User Examples
For demo purposes, just type any name like:
- Alice
- Bob
- Charlie

## ❗ License
This project is open-sourced and free to use for educational and demo purposes.


## ✍️ Author
Made with ❤️ by [Kamran](https://github.com/kammiii)