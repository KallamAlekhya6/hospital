# Hospital Management System - Implementation Plan

## 1. Project Initialization & Structure
- Root Directory: `c:\pro`
- **Backend**: `server/` (Node.js + Express)
- **Frontend**: `client/` (React + Vite + Tailwind CSS)

## 2. Backend Implementation (Node.js + Express + MongoDB)
### Phase 2.1: Setup & Configuration
- Initialize `server` directory.
- Install dependencies: `express`, `mongoose`, `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`.
- Configure `server/server.js` (Entry point).
- Configure Database connection (`server/config/db.js`).

### Phase 2.2: Models (Mongoose Schemas)
- **User Model**: Handles auth for everyone (Patient, Doctor, Admin) with a `role` field. Profile details can be embedded or linked.
- **DoctorProfile Model**: Specific details for doctors (specialization, availability).
- **PatientProfile Model**: Specific details for patients (history).
- **Appointment Model**: Links Patient, Doctor, Status, Date.
- **Report/Prescription Model**: Medical records.

### Phase 2.3: Authentication & Security
- Implement JWT generation and verification.
- Create Middleware: `authMiddleware` (verify token), `roleMiddleware` (verify role).
- **Routes**:
    - `POST /api/auth/register` (Patient only usually, Admin creates Doctors).
    - `POST /api/auth/login`.

### Phase 2.4: Core Features & APIs
- **Patient APIs**:
    - `GET /api/me` (Profile).
    - `POST /api/appointments` (Book).
    - `GET /api/my-appointments`.
- **Doctor APIs**:
    - `GET /api/doctor/appointments`.
    - `PUT /api/appointments/:id` (Approve/Reject/Prescribe).
- **Admin APIs**:
    - `POST /api/admin/create-doctor`.
    - `GET /api/admin/stats`.

## 3. Frontend Implementation (React + Vite + Tailwind)
### Phase 3.1: Setup and Design
- Initialize `client` with Vite + React.
- Install `tailwindcss`, `postcss`, `autoprefixer`.
- Setup Router (`react-router-dom`).
- Create `api.js` (Axios instance with interceptors for token).

### Phase 3.2: Universal Pages & Components
- **Components**: Navbar, Sidebar, ProtectedRoute, Layout.
- **Pages**: Landing Page, Login, Register.

### Phase 3.3: Patient Portal
- Dashboard: View history, upcoming appointments.
- Book Appointment Form: Select Doctor, Date.
- Profile View/Edit.

### Phase 3.4: Doctor Portal
- Dashboard: Schedule, Requests.
- Appointment Management: Accept/Reject, Add Notes.

### Phase 3.5: Admin Portal
- Dashboard: Analytics.
- User Management: Add Doctors, View Patients.

## 4. Integration & Polish
- Connect Frontend forms to Backend APIs.
- Handle loading states and errors (Toasts).
- Ensure Responsive Design.
