# Smart Attendance System

## 1. Project Definition
The Smart Attendance System is a web-based employee attendance management application that uses face recognition for attendance marking. It helps organizations track employee presence, manage shift settings, handle leave requests, generate reports, and monitor notifications.

The project combines:
- Frontend in React + Vite
- Backend in Node.js + Express
- Database in MongoDB
- Face recognition using face-api.js
- Role-based access for admin and employees

## 2. Project Objectives
- Replace manual attendance recording with automated face-based check-in/check-out
- Support employee registration and role management
- Manage daily shifts and attendance rules
- Allow employees to apply for leave
- Show attendance logs and reports to administrators
- Reduce time theft and improve accuracy

## 3. Main Features
### Admin Features
- Register employees
- Manage users and roles
- Configure shift settings
- View attendance logs
- Generate reports
- View notifications and leave requests
- Monitor employee activity

### Employee Features
- Login to personal dashboard
- View attendance records
- Submit leave requests
- Receive notifications
- Check personal attendance summary

### Attendance Kiosk
- Public kiosk route for face recognition check-in and check-out
- Camera-based face scanning
- Automatic action for morning check-in or after-lunch check-out
- Prevents duplicate or invalid attendance entries
- Handles early/late attendance status

## 4. System Architecture
### Frontend
Location: `frontEnd/`
- Built with React
- Uses React Router for page navigation
- Handles login, dashboard, attendance kiosk, reports, and settings
- Makes API calls to the backend

### Backend
Location: `backEnd/`
- Built with Express.js
- Exposes REST APIs under `/api`
- Handles auth, user management, attendance, leaves, shift settings, and notifications
- Uses Mongoose to connect with MongoDB

### Database
- MongoDB is the main database
- The backend falls back to an in-memory MongoDB instance if MongoDB is unavailable

### Face Recognition
- Uses `face-api.js`
- Employee face data is compared against registered face descriptors
- The kiosk verifies identities before marking attendance

## 5. Work Flow of the System
### User Registration
1. Admin adds employee information
2. Employee photo is captured or uploaded
3. Face model is generated and stored for comparison

### Attendance Process
1. Employee opens the kiosk page
2. Webcam captures their face
3. System compares the captured face with stored descriptors
4. If recognized, the system checks shift rules and attendance status
5. The system records check-in or check-out
6. The attendance result is displayed on the screen

### Daily Attendance Cycle
- Morning check-in
- Lunch break handling
- After-lunch check-out or auto checkout
- Attendance completion status and reporting

## 6. How to Run the Project
### 1. Install dependencies
Open the project root and run:

```bash
npm install
npm --prefix backEnd install
npm --prefix frontEnd install
```

### 2. Start backend
```bash
npm --prefix backEnd run dev
```

### 3. Start frontend
```bash
npm --prefix frontEnd run dev -- --host 0.0.0.0 --port 5173
```

### 4. Start both together
From the root project folder:

```bash
npm run dev
```

### 5. Open the app in browser
- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/health

## 7. Important Project Files
- Root project setup: `package.json`
- Backend server entry: `backEnd/server.js`
- Database config: `backEnd/config/db.js`
- API routes: `backEnd/routes/`
- Models: `backEnd/models/`
- Frontend app: `frontEnd/src/App.jsx`
- Attendance kiosk: `frontEnd/src/pages/MarkAttendance.jsx`
- Face recognition utils: `frontEnd/src/utils/faceApi.js`

## 8. Typical Use Case
A company can use this system to:
- register employees
- configure shift times and attendance rules
- install a kiosk at the office entrance
- let employees scan their faces before entering or leaving the office
- review logs and produce attendance reports quickly

## 9. Advantages
- Fast attendance recording
- Reduced human error
- Better monitoring of employee presence
- Supports biometrics-based verification
- Useful for office and company environments

## 10. Challenges / Things to Improve
- Secure face data storage and privacy protection
- Add stronger employee photo validation
- Improve report export features
- Add email/SMS notifications
- Add stronger role-based security and audit logs
- Deploy to production with proper environment variables and hosting

## 11. Short Project Summary
This project is a Smart Attendance Management System built for modern workplaces. It combines React-based frontend, Express-based backend, MongoDB data storage, and face recognition technology to automate attendance processing and improve accuracy for employee check-in and check-out.


