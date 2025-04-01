# Coupon Holder

A modern web application for managing and redeeming digital coupons, built with React, TypeScript, and Firebase.

## Features

### Authentication & Authorization

- Secure user authentication with Firebase
- Protected routes
- Persistent session management

### Campaign Management

- View campaign listings
- Track campaign progress
- Set expiration dates
- Manage campaign states

### Coupon System

- View available coupons
- Redeem coupons
- Track coupon states:
  - Active
  - Blocked
  - Redeemed
- Real-time status updates

### User Interface

- Responsive design
- Loading states
- Error handling
- Smooth animations
- Accessibility support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/coupon-holder.git
cd coupon-holder
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start Development Server**

```bash
npm run dev
```

### Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State:** React Query
- **Backend:** Firebase
- **Routing:** React Router DOM
