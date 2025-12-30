# MERN Admin–User Management System (UMS)

A full-stack **Admin–User Management System** built using the **MERN stack** with separate authentication for **Users** and **Admins**, secure JWT authentication using HTTP-only cookies, and role-based access control.

---

## 🔹 Project Overview

This application allows:
- **Users** to register, login, update profile, and upload profile images.
- **Admins** to securely login, view all users, update user details, and delete users.
- Secure authentication using **JWT stored in cookies**.
- Clean UI with separate **User** and **Admin** portals.

---

## 🔹 Tech Stack

### **Frontend**
- React (Vite)
- Redux Toolkit + RTK Query
- React Router DOM
- Bootstrap & React Bootstrap

### **Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cookie-Parser
- Multer (file upload)
- CORS

### **Deployment**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🔹 Setup Instructions (Local)

### 1. Backend Setup
Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
npm run server
