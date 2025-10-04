# Next.js E-commerce Application

A modern, full-featured e-commerce website built with Next.js 15, featuring product listings, user authentication, shopping cart, and order management.

## 🎯 Project Overview

This application successfully implements all the required features for a complete e-commerce platform, including user authentication, product management, shopping cart functionality, and order tracking.

## ✅ Requirements Implementation

### **Framework & Architecture**
- ✅ **Next.js (App Router)**: Built with Next.js 15.5.4 using the modern App Router architecture
- ✅ **Responsive Design**: Implemented with Tailwind CSS for clean, mobile-first responsive design
- ✅ **State Management**: Redux Toolkit for comprehensive state management (authentication, cart, products, wishlist)
- ✅ **API Integration**: Axios for robust API calls with proper error handling and interceptors

### **Pages & Functionality**

#### **Public Pages**
- ✅ **Homepage (`/`)**: 
  - Displays all products with name, price, and optimized images
  - Clicking products navigates to detailed product pages
  - Responsive product grid layout
  - Gadget-focused content and branding

- ✅ **Product Details (`/products/[id]`)**: 
  - Comprehensive product information display
  - High-quality product images with Next.js Image optimization
  - "Add to Cart" functionality with duplicate prevention
  - Responsive design for all screen sizes

- ✅ **Login (`/login`)**: 
  - Secure user authentication form
  - Form validation and error handling
  - Social login options (Facebook, Google)
  - Responsive design with proper UX

- ✅ **Register (`/register`)**: 
  - New user registration form
  - Form validation and password confirmation
  - Social registration options
  - Mobile-optimized interface

#### **Authenticated Pages**
- ✅ **Cart (`/cart`)**: 
  - Complete cart management (view, update quantities, remove items)
  - Real-time price calculations and totals
  - "Proceed to Checkout" functionality
  - Mobile-responsive design with touch-friendly controls

- ✅ **Orders (`/orders`)**: 
  - Comprehensive order history display
  - Order status tracking (Processing, Shipped, Delivered)
  - Order details with itemized breakdowns
  - Delivery address information
  - Mobile-optimized layout

### **Authentication System**
- ✅ **Secure Token Management**: JWT tokens stored in localStorage and cookies
- ✅ **Protected Routes**: Middleware protection for authenticated pages
- ✅ **Automatic Redirects**: Unauthenticated users redirected to login
- ✅ **Session Persistence**: Maintains login state across browser sessions
- ✅ **Logout Functionality**: Complete session cleanup and token removal

### **User Interface Features**
- ✅ **Dynamic Navigation**: 
  - Responsive header with authentication-aware navigation
  - Login/Logout links that change based on authentication status
  - Cart and wishlist counters with dropdown previews
  - Mobile hamburger menu with full navigation

- ✅ **Error Handling**: 
  - Comprehensive error boundaries
  - API error handling with user-friendly messages
  - Loading states for all async operations
  - Network error recovery

- ✅ **Loading States**: 
  - Skeleton loading for products
  - Loading spinners for API calls
  - Smooth transitions and animations

### **Advanced Features**
- ✅ **Wishlist Functionality**: Save products for later
- ✅ **Product Search**: Search functionality across products
- ✅ **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- ✅ **Image Optimization**: Next.js Image component for optimal performance
- ✅ **SEO Ready**: Proper meta tags and structured data
- ✅ **Performance Optimized**: Code splitting, lazy loading, and bundle optimization

## 🚀 Technical Stack

### **Frontend**
- **Framework**: Next.js 15.5.4 (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: React Icons (Feather Icons)
- **Image Optimization**: Next.js Image

### **Backend Integration**
- **API Routes**: Next.js API routes for backend proxy
- **Authentication**: JWT token-based authentication
- **Environment Variables**: Secure configuration management
- **CORS Handling**: Proper cross-origin request handling

### **Development Tools**
- **Linting**: ESLint with Next.js configuration
- **Code Quality**: Clean, maintainable code with no linting errors
- **Version Control**: Git-ready with proper .gitignore
- **Build System**: Next.js built-in build system

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-First**: Optimized for mobile devices (320px+)
- **Tablet Support**: Enhanced layouts for tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Touch-Friendly**: Optimized touch targets and gestures

## 🔒 Security Features

- **Authentication**: Secure JWT token management
- **Route Protection**: Middleware-based route protection
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Built-in Next.js security features
- **CSRF Protection**: API route protection

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd task-ecom

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints

# Run development server
npm run dev
```

### Environment Variables
```bash
# E-commerce API Configuration
NEXT_PUBLIC_API_BASE_URL=https://globosoft.co.uk/ecommerce-api

# API Endpoints
NEXT_PUBLIC_API_PRODUCTS_LIST=/api/products/list.php
NEXT_PUBLIC_API_PRODUCTS_DETAILS=/api/products/details.php
NEXT_PUBLIC_API_AUTH_LOGIN=/api/auth/login.php
NEXT_PUBLIC_API_AUTH_REGISTER=/api/auth/register.php
NEXT_PUBLIC_API_CART_ADD=/api/cart/add.php
NEXT_PUBLIC_API_CART_VIEW=/api/cart/view.php
NEXT_PUBLIC_API_CHECKOUT=/api/checkout/checkout.php
NEXT_PUBLIC_API_ORDERS_LIST=/api/orders/list.php

# ... other endpoints
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Image Optimization**: Automatic WebP/AVIF serving
- **Code Splitting**: Automatic route-based splitting
- **Bundle Size**: Optimized bundle with tree shaking

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional e-commerce interface
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages

## 📈 Scalability

- **Component Architecture**: Reusable, maintainable components
- **State Management**: Scalable Redux architecture
- **API Design**: RESTful API integration
- **Performance**: Optimized for high traffic

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

### Project Structure