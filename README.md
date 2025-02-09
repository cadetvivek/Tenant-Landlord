# 🏠 Tenant-Landlord Communication Platform

## 📌 Overview
The **Tenant-Landlord Communication Platform** is a modern web application designed to streamline interactions between landlords and tenants. It provides a centralized system for handling **maintenance requests, real-time messaging, rent payment tracking, and property management**—enhancing transparency and efficiency.

## 🚀 Features

### 🔧 **Maintenance Request System**
- Interactive form for reporting maintenance issues with category and urgency selection.
- Drag-and-drop support for uploading images/videos.
- Auto-suggestions for common maintenance problems.
- Real-time status tracking with visual indicators.

### 💬 **Real-Time Messaging**
- One-to-one tenant-landlord chat with message history.
- Status indicators: "Sent," "Delivered," and "Read".
- Push notifications for new messages and updates.

### 📊 **Issue Tracking Dashboard**
- **Tenant Dashboard**: View status of submitted maintenance requests.
- **Landlord Dashboard**: Filter issues by property, urgency, or status.
- Timeline for each request showing progress and updates.

### 💰 **Rent Payment Tracking**
- Tenants can view **past payments, due dates, and reminders**.
- Landlords get a dashboard to **track payment statuses across properties**.
- Interactive rent reminders and notifications.

### 📱 **Responsive & Mobile-Optimized UI**
- **Mobile-first approach** ensuring seamless experience on all devices.
- Adaptive UI for larger screens with an enhanced dashboard.

### 🔒 **Security & Scalability**
- Authentication & role-based access using **Firebase Authentication**.
- Secure real-time database with **Firestore security rules**.
- Optimized API calls and Firestore queries for better performance.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** (Vite) | Frontend UI development |
| **Redux** | State management |
| **Firebase Firestore** | Real-time database & authentication |
| **Firebase Cloud Functions** | Automating backend processes |
| **Tailwind CSS** | Modern and responsive styling |
| **Razorpay** | Secure payment gateway |

## 🎯 Project Goals
✅ Seamless tenant-landlord communication  
✅ Efficient maintenance request tracking  
✅ Transparent rent payment management  
✅ Scalable and secure architecture  

## 🚀 Getting Started
### Prerequisites
- **Node.js** (v16+)
- **Firebase CLI** installed globally (`npm install -g firebase-tools`)

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/cadetvivek/tenant-landlord-platform.git
cd tenant-landlord-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** and **Authentication**.
3. Create a `.env` file and add Firebase credentials:
   ```plaintext
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

## 🤝 Contribution Guidelines
1. **Fork the repository** and create a feature branch.
2. Follow **clean code principles** and **write meaningful commit messages**.
3. Submit a **pull request** with a clear description of changes.

## 📜 License
This project is licensed under the **MIT License**.

## 📬 Contact
- **GitHub:** [cadetvivek](https://github.com/cadetvivek)
- **Email:** (your email here)

---
⭐ If you found this project useful, **consider giving it a star!** ⭐
