# MERN Stack CRUD with JWT Authentication

This is a web application built using the MERN stack (MongoDB, Express, React, Node.js) with JWT-based authentication. The authentication flow ensures secure user login and registration, token management, and protected routes.

## 📌 Authentication Flow

- Users can sign up or log in via dedicated forms.
- Form data is validated using Zod schemas.
- Upon successful authentication:
  - The server generates a JWT token.
  - The token is stored in an HTTP-only cookie for enhanced security.
  - User data is stored in the authentication context.
  - Protected routes check authentication status before granting access.
  - The token is automatically verified when the app loads.
  - Users can update their profile or log out at any time.

## 🛠️ Technologies Used

- **JWT (JSON Web Tokens)** → Stateless authentication.
- **HTTP-only Cookies** → Secure token storage.
- **Zod** → Schema validation for form data.
- **React Context** → Global state management for authentication.
- **React Router** → Route protection and access control.

### MERN Stack CRUD with JWT

This is a web application project using React, with a Nodejs Backend using Express and Mongodb as Database (MERN Stack)

## 🚀 Installation with Docker-Compose (Recommended)

```sh
docker-compose up -d
npm run dev


### Deployment

```sh
git clone https://github.com/MiliINM/project.git
cd mern-tasks-auth
npm i
npm run build
npm start
```

> You need to have a Mongodb database running
