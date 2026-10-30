# Finance Dashboard
A clean and interactive finance dashboard built using React and Tailwind CSS.  
This project focuses on UI/UX design, component structure, and frontend state management to simulate real-world financial tracking.

## Live Demo
https://finance-dashboard-one-ebon.vercel.app

## Overview
This dashboard allows users to:
- View overall financial summary
- Explore transactions
- Analyze spending patterns through charts
- Interact with role-based UI (Admin / Viewer)

The goal of this project was to demonstrate frontend development skills including UI design, state management, and user interaction handling.

## Features
### Dashboard Overview
- Summary cards (Total Balance, Income, Expenses)
- Time-based visualization (Balance Trend - Line Chart)
- Category-based visualization (Expense Breakdown - Pie Chart)

### Transactions Section
- List of transactions with:
  - Date
  - Amount
  - Category
  - Type (Income / Expense)
- Features:
  - Search by category
  - Filter by type
  - Edit & Delete transactions (Admin only)

### Role-Based UI
- Viewer → Can only view data
- Admin → Can edit and delete transactions
- Role switching via dropdown

### Insights
- Highest spending category
- Total expenses calculation
- Category-based filtering insights

## State Management
State is handled using React hooks:
- Transactions data
- Search & filter state
- Selected role (Admin / Viewer)

Data is also stored in **localStorage** for persistence.

## UI & UX
- Clean and modern dark theme
- Responsive layout (mobile + desktop)
- Smooth hover effects and transitions
- Icon-based actions (Edit/Delete)
- Custom dropdowns (no default browser UI issues)
- Handles empty states gracefully

## Tech Stack
- React.js
- Tailwind CSS
- Recharts (Charts)
- Framer Motion (Animations)

---

## Installation
```bash
git clone https://github.com/khushiitomarr/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
