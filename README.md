# 💰 Aarthika – AI Financial Assistant

Aarthika is a multilingual AI-powered financial literacy and personal finance management application built using React Native (Expo), Firebase, and Python Flask.

The app helps users manage expenses, track budgets, monitor financial health, learn financial concepts, and perform basic banking operations.

---

## 🚀 Features

### 🔐 Authentication
- Phone Number Login
- OTP Verification
- Persistent Login using AsyncStorage

### 💳 Banking
- Account Balance
- Money Transfer
- Transaction History
- User-specific Banking Data

### 📊 Budget Tracker
- Add Expenses
- Expense Categories
- Expense Analytics
- Pie Chart Visualization
- Highest Expense Tracking

### 🤖 AI Financial Assistant
- Financial Queries
- Voice Support
- Multilingual Assistance

### ❤️ Financial Health Score
- Python Flask Backend
- Income vs Expense Analysis
- Health Score Calculation
- Financial Advice Generation

### 📚 Learn Section
- Financial Literacy Content
- Articles
- Quizzes
- Educational Resources

### 🛡 Fraud Detection
- Scam Awareness
- Fraud Prevention Tips
- Safe Banking Guidance

### 🌐 Multi-Language Support
- English
- Hindi
- Marathi

---

## 🛠 Tech Stack

### Frontend
- React Native
- Expo
- Expo Router
- React Navigation

### Backend
- Python
- Flask
- Flask-CORS

### Database
- Firebase Firestore

### Authentication
- Firebase Authentication

### Storage
- AsyncStorage

### Charts
- react-native-chart-kit

---

## 📂 Project Structure

```bash
Aarthika/
│
├── app/
├── screens/
├── navigation/
├── components/
├── context/
├── constants/
├── firebase/
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── api/
│   └── healthApi.js
│
├── assets/
├── package.json
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Aarthika.git
cd Aarthika
```

### Install Frontend Dependencies

```bash
npm install
```

### Start Expo

```bash
npx expo start
```

---

## ⚙ Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install flask flask-cors
```

Run backend:

```bash
python app.py
```

Server runs on:

```bash
http://localhost:5000
```

---

## 📈 Financial Health Score Formula

```text
Savings = Income - Expenses

Score = (Savings / Income) × 100
```

### Score Categories

| Score | Health Status |
|---------|-------------|
| 60+ | Excellent |
| 40-60 | Good |
| Below 40 | Needs Improvement |

---
---

## 🎯 Future Enhancements

- UPI Integration
- Loan Eligibility Checker
- Investment Recommendations
- Credit Score Analysis
- Expense Prediction using AI
- Personalized Financial Planning
- Voice Banking

---

## 📜 License

This project is developed for educational and learning purposes.

© 2026 Aarthika
