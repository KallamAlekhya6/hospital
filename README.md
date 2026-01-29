# Hospital Management System (MERN)

A complete Hospital Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS v4
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT, Bcrypt

## Features
- **Roles**: Patient, Doctor, Admin
- **Authentication**: Secure Login/Register
- **Patients**: Book appointments, view history, profile.
- **Doctors**: View appointments (Backend ready).
- **Admin**: Dashboard stats (Backend ready).

## Setup & Run

### 1. Backend
```bash
cd server
npm install
# Create .env file with MONGO_URI, JWT_SECRET
npm run dev
```
Runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## default Login (After registration)
- Register a new patient account to test the flow.
- Admin/Doctor accounts need to be created via API or Database directly (role: 'admin' | 'doctor').
