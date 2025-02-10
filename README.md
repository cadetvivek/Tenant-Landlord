# 🏠 RentEasy - Smart Tenant-Landlord Platform

## 📌 Overview
**RentEasy** is an intelligent, AI-powered **Tenant-Landlord Communication Platform** designed to simplify property management. It provides a centralized system for handling **maintenance requests, real-time messaging, AI-assisted interactions, rent payment tracking, and property management**—enhancing transparency, efficiency, and user convenience.

## 🚀 Features

### 🔧 **Smart Maintenance Request System**
- Interactive form for reporting maintenance issues with category and urgency selection.
- Drag-and-drop support for uploading images/videos.
- Auto-suggestions for common maintenance problems.
- Real-time status tracking with visual indicators.
- **🔥 Powered by Firebase** for seamless maintenance request management.

### 🤖 **AI-Powered Assistance**
- **Chat with AI** to get answers related to **RentEasy's services, property management, and tenant rights**.
- **Solve Your Doubts Instantly** using the **AI-powered chat icon**, trained to provide quick and accurate responses.

### 🔎 **Property Search - Google API Integration**
- **Search Properties** effortlessly using **Google API**, allowing users to explore available rental listings with ease.
- Get detailed property information including location, price, and amenities.

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
- **Secure payment processing using Razorpay Payment Gateway**.

### 📱 **Responsive & Mobile-Optimized UI**
- **Mobile-first approach** ensuring seamless experience on all devices.
- Adaptive UI for larger screens with an enhanced dashboard.

### 🔒 **Security & Scalability**
- Authentication & role-based access using **Firebase Authentication**.
- **Maintenance Data stored in Firebase**.
- **Property Listings stored in MongoDB** for high performance.
- Optimized API calls and queries for better performance.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** (Vite) | Frontend UI development |
| **Redux** | State management |
| **Firebase Firestore** | Real-time database for maintenance requests |
| **MongoDB** | Database for property listings |
| **Google API** | Property search and recommendations |
| **AI Chat System** | Tenant assistance and query resolution |
| **Firebase Cloud Functions** | Automating backend processes |
| **Tailwind CSS** | Modern and responsive styling |
| **Razorpay** | Secure payment gateway |

## 🎯 Project Goals
✅ Seamless tenant-landlord communication  
✅ AI-driven assistance for user convenience  
✅ Efficient maintenance request tracking  
✅ Transparent rent payment management  
✅ Scalable and secure architecture  

## 🚀 Getting Started
### Prerequisites
- **Node.js** (v16+)
- **Firebase CLI** installed globally (`npm install -g firebase-tools`)
- **MongoDB database setup**

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/cadetvivek/RentEasy.git
cd Tenant-Landlord
cd cd project 

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Firebase & MongoDB Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** and **Authentication**.
3. Set up a **MongoDB database** for property listings.
4. Create a `.env` file and add required API credentials:
   ```plaintext
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_MONGODB_URI=your_mongodb_uri
   VITE_GOOGLE_API_KEY=your_google_api_key
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=

## 🤝 Contribution Guidelines
1. **Fork the repository** and create a feature branch.
2. Follow **clean code principles** and **write meaningful commit messages**.
3. Submit a **pull request** with a clear description of changes.

## 📜 License
This project is licensed under the **MIT License**.

## 📬 Contact
- **GitHub:** [cadetvivek](https://github.com/cadetvivek)
- **Email:** (kushwah.vivek805@gmail.com)

---
⭐ If you found this project useful, **consider giving it a star!** ⭐