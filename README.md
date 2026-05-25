# Amazon Clone Backend

# deployed on railway (link) . https://amazon-clone-backend-production-0d92.up.railway.app/

## 1. Project Overview

This project is the backend of a scalable e-commerce platform inspired by Amazon. It is built using Node.js, Express.js, Prisma ORM, and PostgreSQL. The backend provides APIs for authentication, product management, cart operations, orders, and user-related functionalities.

---

## 2. Core Functionalities

### 2.1 Authentication System
- User registration and login
- JWT-based authentication
- Middleware for route protection

---

### 2.2 Product Management
- Create product
- Get all products
- Get product by ID
- Get products created by a user

---

### 2.3 Image Handling
- Supports multiple images per product
- Uses relational model (ProductImage)
- Stores Cloudinary URLs received from frontend

---

### 2.4 Cart System
- Add items to cart
- Update quantity
- Fetch cart data

---

### 2.5 Order Management
- Place order
- Store order items
- Link orders with user and address
- Track order status

---

### 2.6 Address Management
- Add user addresses
- Link addresses with orders

---

## 3. Database Design

### Product
- Stores product details
- Linked to Category and User
- Contains multiple images

### ProductImage
- Stores image URLs
- One-to-many relationship with Product

### Cart & CartItem
- Handles user cart functionality

### Order & OrderItem
- Stores order data and purchased items

---

## 4. Platforms and Services Used

- Backend Framework: Node.js with Express.js
- ORM: Prisma ORM
- Database: PostgreSQL (hosted on Neon)
- Deployment: Railway
- Authentication: JWT (JSON Web Tokens)
- Image Hosting: Cloudinary (via frontend integration)

---

## 5. Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT

---

## 6. System Design Approach

- Modular architecture (controller, service, repository)
- Separation of concerns
- API-driven communication
- Relational database design using Prisma

---

## 7. Challenges Faced and Solutions

### 7.1 Multiple Image Storage Issue
- Problem: Prisma requires relational format for nested data
- Solution: Used createMany() for inserting product images

---

### 7.2 Frontend-Backend Data Mismatch
- Problem: Image data structure mismatch
- Solution: Standardized API contract between frontend and backend

---

### 7.3 Database Connection Issues
- Problem: Errors in connecting PostgreSQL during deployment
- Solution: Correct environment variable configuration

---

### 7.4 Deployment Issues
- Problem: Build failures on Railway
- Solution: Fixed configuration and environment setup

---

## 8. Environment Variables

DATABASE_URL=your_postgres_url  
JWT_SECRET=your_secret  

---

## 9. Running Locally

npm install  
npx prisma generate  
npx prisma migrate dev  
npm run dev  

---

## 10. Deployment

- Hosted on Railway
- Connected with Neon PostgreSQL database

---

## 11. Future Enhancements

- Payment gateway integration
- Product reviews and ratings
- Advanced filtering and search
- Admin dashboard

---

## 12. Author

Sahil Singh  
Full Stack Developer
