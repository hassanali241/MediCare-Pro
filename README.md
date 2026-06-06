# MediCare Pro — Comprehensive Hospital Management System

**MediCare Pro** is a modern, full-stack Hospital Management System designed to streamline healthcare operations. Built from the ground up using the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides two distinct interfaces: a **Patient Portal** for user interactions and an **Admin Dashboard** for hospital staff and management.

---

## 📑 Table of Contents
1. [System Architecture](#system-architecture)
2. [Features & Modules](#features--modules)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Installation & Setup](#installation--setup)
8. [Usage & Testing](#usage--testing)

---

## 🏗 System Architecture

The application follows a standard Client-Server architecture with a decoupled frontend and backend.

- **Backend (Node/Express)**: Acts as a RESTful API serving both the Patient Portal and Admin Dashboard. It handles business logic, authentication (via JWT), and data persistence in MongoDB.
- **Frontend (Client)**: A React application tailored for patients to view departments, learn about the hospital, and book appointments.
- **Frontend (Admin)**: A separate React application secured via role-based access control, allowing administrators to manage doctors, view inquiries, and process appointment statuses.

### Authentication Flow
Authentication is managed via an `HttpOnly` cookie containing a JSON Web Token (JWT).
1. When a user logs in, the server signs a JWT with their `id` and `role`.
2. The token is sent back as an `HttpOnly` cookie (`session`), preventing XSS attacks.
3. Every subsequent request checks this cookie. Admin routes have an additional role check (`verify-session.js` middleware) to ensure unauthorized access is blocked.

---

## ✨ Features & Modules

### 1. Patient Portal (Client)
- **User Authentication**: Secure Registration and Login.
- **Department Catalog**: View 9 specialized medical departments (Pediatrics, Cardiology, Neurology, etc.).
- **Appointment Booking**: Select a department, dynamically filter available doctors, and book an appointment with specific date/time constraints.
- **Contact/Inquiry Form**: Send direct messages or inquiries to hospital administrators.
- **Responsive Design**: Modern white/grey professional theme, fully responsive across all devices.

### 2. Admin Dashboard (Admin)
- **Role-Based Access Control**: Protected routes that restrict access solely to verified administrators.
- **Analytics Dashboard**: Overview of total appointments, pending/confirmed status counts, and registered doctors.
- **Appointment Management**: View all patient bookings and manually update their statuses (`Pending`, `Confirmed`, `Cancelled`).
- **Doctor Management**: Register new doctors with their profile photos (using Cloudinary or local storage), details, and specialties. Ability to remove doctors.
- **Admin Management**: Create new administrator accounts.
- **Inquiry Management**: Read messages sent by patients via the contact form.

---

## 🛠 Technology Stack

### Backend
- **Node.js & Express.js**: Server framework and routing.
- **MongoDB & Mongoose**: NoSQL Database and Object Data Modeling (ODM).
- **JWT (JSON Web Tokens)**: Secure, stateless authentication.
- **Bcrypt.js**: Password hashing and encryption.
- **Express-FileUpload / Cloudinary**: Handling doctor profile image uploads.

### Frontend (Client & Admin)
- **React.js 19**: UI component library.
- **Vite**: Ultra-fast frontend build tool and development server.
- **React Router DOM**: Client-side routing.
- **Axios**: Promise-based HTTP client customized to send credentials (cookies).
- **React-Toastify**: Notification and alert popups.
- **React-Icons**: Lightweight SVG icons.
- **Context API (with useReducer)**: Complex global state management for user sessions.

---

## 📂 Project Structure

```text
medicare-pro/
├── server/                    # Node.js REST API
│   ├── config/                # Environment variables and DB connection
│   ├── handlers/              # Controllers containing business logic
│   ├── helpers/               # Utility functions (e.g., create JWT)
│   ├── middleware/            # Express middlewares (Auth, Error Handling)
│   ├── models/                # Mongoose Database Schemas
│   ├── routes/                # API endpoint definitions
│   ├── app.js                 # Express application setup
│   ├── index.js               # Main server entry point
│   └── seed.js                # Database seeder for initial Admin account
│
├── client/                    # Patient Portal (React)
│   └── src/
│       ├── components/        # Reusable UI elements (Header, Forms, Grids)
│       ├── context/           # AppContext for global patient state
│       ├── pages/             # Route-level components (Home, Book, Auth)
│       └── services/          # Axios instance configurations
│
└── admin/                     # Admin Dashboard (React)
    └── src/
        ├── components/        # Admin UI elements (Sidebar, Tables, Stats)
        ├── context/           # AdminContext for global admin state
        └── services/          # Axios instance configurations
```

---

## 🔌 API Documentation

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register a new patient account | Public |
| POST | `/sign-in` | Authenticate patient or admin | Public |
| GET | `/profile` | Get current logged-in user details | Private |
| GET | `/sign-out` | Clear session cookie | Private |

### Staff Management (`/api/staff`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/doctor` | Register a new doctor | Admin |
| POST | `/admin` | Register a new admin | Admin |
| GET | `/doctors` | Retrieve list of all doctors | Public |
| DELETE | `/doctor/:id`| Remove a doctor from the system | Admin |

### Bookings (`/api/bookings`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Create a new appointment booking | Patient |
| GET | `/` | Retrieve all appointments | Admin |
| PATCH | `/:id` | Update appointment status | Admin |
| DELETE | `/:id` | Delete an appointment | Admin |

### Inquiries (`/api/inquiries`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/` | Submit a new contact message | Public |
| GET | `/` | Retrieve all inquiries | Admin |

---

## 🗄 Database Schema

The database utilizes Mongoose schemas to ensure data integrity:
1. **Account**: Stores `fullName`, `email`, `password`, `cnic`, `role` (patient, admin, doctor), and `specialty` (if doctor).
2. **Booking**: Stores `patientName`, `department`, `doctorId` (reference to Account), `scheduledDate`, and `status` (enum: pending, confirmed, cancelled).
3. **Inquiry**: Stores `senderName`, `senderEmail`, `subject`, and `body`.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16.0.0 or higher)
- MongoDB (Local installation or MongoDB Atlas cluster)

### 1. Database & Environment Setup
Navigate to the server directory, install dependencies, and setup your environment variables.
```bash
cd server
npm install
```
Copy the example environment file and update it with your credentials:
```bash
cp config/.env.example config/.env
```
Your `server/config/.env` file should contain:
```env
# Database
MONGO_URI=mongodb://localhost:27017/medicare_pro

# Session / JWT
SESSION_SECRET=medicare-pro-super-secret-key-2025
SESSION_LIFETIME=7d
COOKIE_DAYS=7

# Server
PORT=4000

# Client URLs
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# Cloudinary (for doctor profile images — optional)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 2. Verify Environment Variables
Run the following command to confirm the system can access all environment variables:
```bash
node check-env.js
```
You should see all variables printed to the console.

### 3. Seed the Default Admin
To access the Admin Dashboard initially, run the seed script to create the master admin.
```bash
npm run seed
```
*(Default Admin: `admin@medicare.com` / `admin1234`)*

### 4. Start the Backend Server
```bash
npm run dev
```
*(Server runs on http://localhost:4000)*

### 5. Start the Patient Portal
Open a new terminal.
```bash
cd client
npm install
npm run dev
```
*(Client runs on http://localhost:5173)*

### 6. Start the Admin Dashboard
Open another new terminal.
```bash
cd admin
npm install
npm run dev
```
*(Admin runs on http://localhost:5174)*

---

## 💻 Usage & Testing

1. **Admin Login**: Go to `http://localhost:5174/sign-in` and log in with the seeded admin credentials.
2. **Add Doctors**: In the Admin Dashboard, navigate to "Add Doctor" and create a few doctors for different departments.
3. **Patient Registration**: Go to `http://localhost:5173/sign-up` and create a patient account.
4. **Book Appointment**: Log in as a patient, click "Book Appointment", select a department, and the doctors you created in step 2 will populate the dropdown.
5. **Manage Appointment**: Return to the Admin Dashboard to see the new booking and change its status to "Confirmed".

---
*Developed for Academic Purposes — 2025*
