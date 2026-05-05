# Notes Auth App

A full-stack web application with user authentication and personal notes management.  
Users can register, log in, receive a JWT token, and manage their own private notes.

## 🔗 Demo

Run the application locally using Docker:

```bash
docker compose up --build
```

---

## 🛠 Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)  
**Backend:** Python 3.12, FastAPI, Uvicorn, Pydantic  
**Database:** SQLite, SQLAlchemy  
**Authentication:** JWT (python-jose), bcrypt (passlib)  
**Testing:** Pytest, TestClient  
**Infrastructure:** Docker, Docker Compose  

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected API endpoints
- Create personal notes
- View only your own notes
- Delete notes
- Frontend connected to backend via REST API
- API tests with pytest
- Dockerized full-stack application

---

## 🚀 Quick Start

### 🐳 Run with Docker (recommended)

```bash
docker compose up --build
```

Frontend: http://localhost:3000  
Backend API: http://127.0.0.1:8000  
Swagger Docs: http://127.0.0.1:8000/docs  

---

## 💻 Run locally

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Frontend

```text
frontend/index.html
```

## 🔌 API Endpoints

### Auth

```text
POST /register
POST /login
```

### User

```text
GET /me
```

### Notes

```text
POST /notes
GET /notes
DELETE /notes/{note_id}
```

## 🔐 Authentication

- Uses JWT (JSON Web Token) for authentication
- Token is generated on login
- Client sends token in `Authorization: Bearer <token>` header
- Protected endpoints require valid token
- Backend decodes token and identifies current user

## 🧪 Testing

### Run tests:

```bash
python -m pytest backend/test_main.py -v
```

### Test Coverage

- Health endpoint
- User registration and login
- JWT authentication
- Protected routes
- Notes CRUD operations

## 📁 Project Structure
```text
notes-auth-app/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── Dockerfile
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── auth.py
│   ├── test_main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── README.md
```

## 📌 Notes

- SQLite is used for simplicity
- Passwords are hashed using bcrypt
- JWT is used for stateless authentication
- Token is stored in browser (localStorage)
- Simple UI without frameworks (Vanilla JS)

## 📈 Future Improvements

- Edit notes functionality
- UI improvements (React or Vue)
- Switch to PostgreSQL
- Refresh tokens and better auth flow
- User roles / permissions
- Deployment (Render / Railway / AWS)

## 🎯 Purpose

This project demonstrates:

- Full-stack application development  
- REST API design with FastAPI  
- JWT-based authentication implementation  
- Database integration with SQLAlchemy  
- Building protected routes and user-specific data access  
- Dockerized application setup  
- Writing API tests with pytest  