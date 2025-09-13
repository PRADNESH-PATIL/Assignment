# School Payments & Dashboard Application

This repository contains the **frontend** and **backend** code for a School Payments and Dashboard application.  
The frontend is built with **React / Next.js / TypeScript / TailwindCSS**, and the backend is built with **NestJS / TypeScript / MongoDB**.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Endpoints](#api-endpoints)


---

## Project Structure

my-project/
├── backend/ # NestJS backend
│ ├── src/
│ ├── package.json
│ └── tsconfig.json
├── frontend/ # React / Next.js frontend
│ ├── src/
│ ├── package.json
│ └── tsconfig.json
└── README.md

yaml
Copy code

---

## Technologies Used

**Frontend**
- React 18
- Next.js
- TypeScript
- TailwindCSS
- Axios

**Backend**
- NestJS
- TypeScript
- MongoDB / Mongoose
- Class-validator & Class-transformer
- JWT Authentication

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in backend with environment variables:

ini
Copy code
MONGO_URI=mongodb://localhost:27017/school-payments
JWT_SECRET=your_jwt_secret
PORT=3000
Run the backend server:

bash
Copy code
npm run start:dev
Backend should now be running at http://localhost:3000.

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env.local file in frontend:

ini
Copy code
NEXT_PUBLIC_API_URL=http://localhost:3000
Run the frontend:

bash
Copy code
npm run dev
Frontend should now be running at http://localhost:5791 (or default Next.js port).

Running the Application
Start backend: npm run start:dev (from backend/)

Start frontend: npm run dev (from frontend/)

Open browser at http://localhost:3001 to use the app.

Features
Dashboard with transactions filtered by school

JWT-based authentication

Create and manage orders

Real-time data fetching with Axios

Status indicators for transactions: Paid, Pending, Failed

API Endpoints (Backend)
Method	Endpoint	Description
POST	/auth/login	Login and get JWT token
GET	/transactions	Fetch all transactions
POST	/orders	Create a new order