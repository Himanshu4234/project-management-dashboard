# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Project Management Dashboard

## Overview
The **Project Management Dashboard** is a web application built using React.js and Firebase. It enables users to efficiently manage projects, tasks, and team members with role-based access control.

## Features
- User authentication with Firebase
- Role-based access control (Admin, Manager, Member)
- Project and task management
- Real-time data storage using Firestore
- Responsive and user-friendly UI

## Installation
### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/Himanshu4234/project-management-dashboard.git
cd project-management-dashboard
```

### Install Dependencies
```bash
npm install
```

### Configure Firebase
1. Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore, Authentication, and necessary services.
3. Obtain your Firebase configuration and create a `.env` file in the root directory with:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### Run the Application Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment
### Deploying to Vercel (Recommended)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the prompts to configure your project.
4. Your project will be deployed, and you'll get a live link.

## Contributing
Feel free to fork the repository and submit pull requests with improvements.

## License
This project is licensed under the MIT License.

## Contact
For any queries or feedback, reach out via GitHub Issues.
