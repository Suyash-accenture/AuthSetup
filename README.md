# Auth System

A full-stack authentication system with React frontend and Node.js Express backend.

## Features

- User signup and login
- JWT-based authentication
- Protected routes
- Credentials stored in filesystem (for demo purposes)

## Setup

### Backend

1. Navigate to `server` directory
2. Run `npm install`
3. Run `npm start` to start the server on port 5000

### Frontend

1. Navigate to `client` directory
2. Run `npm install`
3. Run `npm run dev` to start the Vite dev server on port 5173

## Usage

- Go to http://localhost:5173
- Signup or login
- Access protected page after login
- Logout from protected page

## Notes

- Credentials are stored in `server/users.json`
- JWT secret is hardcoded (use env in production)
- No database, just filesystem for simplicity