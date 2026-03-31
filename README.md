# LuminaBlog - Full Stack Blog Platform

## Overview
A modern, responsive mini-blog platform built with React (Vite) and Node.js (Express + SQLite) featuring a custom dark-mode aesthetic with smooth animations.

## Structure
- `blog-frontend`: React application (Vite paradigm) handling the user interface and interactions.
- `blog-backend`: Node.js API that uses an SQLite database (`database.sqlite`) to securely store users and blog posts.

## How to Run

### 1. Start the Backend
Open a terminal here and start the express server:
\`\`\`bash
cd blog-backend
npm install
node server.js
\`\`\`
The backend will run on http://localhost:5000

### 2. Start the Frontend
Open a **new** terminal here and start the React app:
\`\`\`bash
cd blog-frontend
npm install
npm run dev
\`\`\`
It will automatically connect to the backend API. Open the local address provided by Vite (e.g. http://localhost:5173).

## Features
- Fully responsive custom design system without generic frameworks
- Daily story board (Homepage)
- Read individual stories
- User registration and login (JWT)
- Protected 'Create Story' functionality
