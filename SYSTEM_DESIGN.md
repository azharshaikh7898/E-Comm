# E-Commerce Web Application - System Design & Architecture

## 1. High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Angular SPA (Single Page Application)                   │   │
│  │  - Responsive UI (Desktop/Mobile/Tablet)                │   │
│  │  - Component-Based Architecture                          │   │
│  │  - State Management & Local Storage                     │   │
│  │  - HTTP Client for API Communication                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                             ↓ HTTPS/REST
┌──────────────────────────────────────────────────────────────────┐
│                        API GATEWAY LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express.js Gateway                                      │   │
│  │  - CORS Handling                                         │   │
│  │  - Request Validation                                   │   │
│  │  - Rate Limiting & Security Headers                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER (Backend)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Node.js + Express Server                               │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Route Layer                                     │   │   │
│  │  │  - /auth, /products, /cart, /orders, /users    │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │           ↓                                             │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Middleware Layer                               │   │   │
│  │  │  - JWT Authentication                           │   │   │
│  │  │  - Error Handling                               │   │   │
│  │  │  - Logging & Monitoring                         │   │   │
│  │  │  - Input Validation                             │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │           ↓                                             │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Controller Layer                               │   │   │
│  │  │  - Request Processing                           │   │   │
│  │  │  - Response Formatting                          │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │           ↓                                             │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Service Layer                                  │   │   │
│  │  │  - Business Logic                               │   │   │
│  │  │  - Data Transformation                          │   │   │
│  │  │  - External Service Integration                 │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │           ↓                                             │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Data Access Layer (Repository)                 │   │   │
│  │  │  - MongoDB Query Builder                        │   │   │
│  │  │  - Caching Logic                                │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                             ↓ Mongoose ODM
┌──────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  MongoDB (NoSQL Database)                               │   │
│  │  - Collections: Users, Products, Carts, Orders, Reviews │   │
│  │  - Indexes on frequently queried fields                 │   │
│  │  - Replica Sets for high availability                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Redis Cache (Optional - for scaling)                   │   │
│  │  - Session Storage                                      │   │
│  │  - Product Catalog Cache                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                              │
│  - Payment Gateway (Stripe Mock)                                 │
│  - Email Service (SendGrid Mock)                                 │
│  - Cloud Storage (S3 Mock)                                       │
└──────────────────────────────────────────────────────────────────┘
```

## 2. Project Folder Structure

### Frontend (Angular)
```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── api.service.ts
│   │   │   │   └── logger.service.ts
│   │   │   └── core.module.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   ├── pagination/
│   │   │   │   └── loading-spinner/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   ├── models/
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── features/
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.module.ts
│   │   │   ├── products/
│   │   │   │   ├── product-list/
│   │   │   │   ├── product-detail/
│   │   │   │   ├── product-filter/
│   │   │   │   └── products.module.ts
│   │   │   ├── cart/
│   │   │   │   ├── cart.component.ts
│   │   │   │   └── cart.module.ts
│   │   │   ├── checkout/
│   │   │   │   ├── checkout.component.ts
│   │   │   │   ├── payment/
│   │   │   │   └── checkout.module.ts
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── auth.module.ts
│   │   │   ├── orders/
│   │   │   │   ├── order-list/
│   │   │   │   ├── order-detail/
│   │   │   │   └── orders.module.ts
│   │   │   ├── wishlist/
│   │   │   │   └── wishlist.module.ts
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       ├── product-management/
│   │   │       └── admin.module.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   │
│   ├── assets/
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── responsive.css
│   └── main.ts
│
├── angular.json
├── package.json
└── README.md
```

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── env.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Wishlist.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── userController.js
│   │   ├── reviewController.js
│   │   └── wishlistController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── orderService.js
│   │   ├── emailService.js
│   │   └── paymentService.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── products.routes.js
│   │   ├── cart.routes.js
│   │   ├── orders.routes.js
│   │   ├── users.routes.js
│   │   ├── reviews.routes.js
│   │   └── wishlist.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── logger.middleware.js
│   │   └── rateLimiter.middleware.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── productValidator.js
│   │   ├── orderValidator.js
│   │   └── userValidator.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── seeders/
│   │   ├── seedDatabase.js
│   │   └── sampleData.js
│   │
│   └── app.js
│
├── tests/
│   ├── unit/
│   │   ├── auth.test.js
│   │   ├── product.test.js
│   │   └── cart.test.js
│   └── integration/
│       └── api.integration.test.js
│
├── .env.example
├── .env.development
├── package.json
├── server.js
└── README.md
```

## 3. Design Decisions & Justifications

### Architecture Principles

| Principle | Justification | Benefits |
|-----------|---------------|----------|
| **Modular Design** | Separate concerns (core, shared, features) | Easy testing, reusability, maintainability |
| **Layered Backend** | Routes → Controllers → Services → DAL | Clean separation of concerns, easier to scale |
| **JWT Authentication** | Stateless auth mechanism | Scalable, mobile-friendly, no session overhead |
| **RESTful APIs** | Standard HTTP methods & conventions | Language-agnostic, easy to understand & test |
| **NoSQL (MongoDB)** | Flexible schema, JSON-like documents | Rapid prototyping, handles unstructured data |
| **Component-Based UI** | Reusable Angular components | Code reuse, easier testing & maintenance |

### Scalability Considerations

1. **Horizontal Scaling**: Stateless backend allows running multiple instances
2. **Caching**: Redis for frequently accessed data (products, categories)
3. **Database Indexing**: Indexes on `userId`, `productId`, `status` for query optimization
4. **API Pagination**: Limit results to prevent memory overload
5. **CDN for Static Assets**: Offload images & CSS to CDN
6. **Load Balancing**: Use Nginx/HAProxy to distribute traffic

### Performance Optimizations

1. **Lazy Loading**: Angular feature modules loaded on demand
2. **Pagination**: Products, orders paginated (20 items per page default)
3. **Database Indexing**: Compound indexes on frequently filtered fields
4. **Request Compression**: gzip compression for responses
5. **Caching**: Client-side caching for product data
6. **Debouncing**: Search input debounced to reduce API calls

## 4. Technology Stack Rationale

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Angular 15+ | Strong framework, TypeScript support, built-in tools |
| **Backend** | Node.js + Express | JavaScript on backend, lightweight, scalable |
| **Database** | MongoDB | Schema flexibility, native JSON support, easy scaling |
| **Auth** | JWT | Stateless, secure, supports mobile apps |
| **Validation** | Joi/Zod | Comprehensive schema validation |
| **Hashing** | bcrypt | Industry standard, slow hash for security |
| **Testing** | Jest | Fast, snapshot testing, good coverage reports |
| **Containerization** | Docker | Consistent environments, easy deployment |
| **CI/CD** | GitHub Actions | Native to GitHub, free for public repos |

## 5. Security Architecture

```
┌─ REQUEST FROM CLIENT ─┐
         ↓
    ┌─────────────┐
    │ CORS Check  │ ← Only allowed origins
    └─────────────┘
         ↓
    ┌──────────────┐
    │ Rate Limiter │ ← Prevent brute force attacks
    └──────────────┘
         ↓
    ┌────────────────────┐
    │ JWT Verification   │ ← Validate token signature
    │ (if protected      │
    │  endpoint)         │
    └────────────────────┘
         ↓
    ┌──────────────────┐
    │ Input Validation │ ← Sanitize inputs
    └──────────────────┘
         ↓
    ┌──────────────────┐
    │ Role-Based Access│ ← Check user permissions
    └──────────────────┘
         ↓
    ┌──────────────────┐
    │ Process Request  │
    └──────────────────┘
         ↓
    └─ SEND RESPONSE ──┘
```

## 6. Data Flow Examples

### User Registration Flow
```
1. User enters email & password in UI
2. Frontend validates locally
3. POST /auth/register sent to backend
4. Backend validates input (Joi schema)
5. Check if user already exists
6. Hash password with bcrypt (10 rounds)
7. Create user document in MongoDB
8. Generate JWT token
9. Return token & user data to frontend
10. Frontend stores token in localStorage
11. Redirect to home page
```

### Product Purchase Flow
```
1. User browses products (GET /products with pagination)
2. User adds product to cart (POST /cart)
3. Frontend stores cart items locally & in DB
4. User proceeds to checkout
5. Frontend shows cart summary
6. User enters shipping & payment details
7. Frontend validates payment info
8. POST /orders with cart items & payment token
9. Backend validates cart items exist & are in stock
10. Backend processes payment (mock Stripe)
11. Backend creates order document
12. Backend clears cart
13. Backend sends confirmation email
14. Backend returns order confirmation
15. Frontend redirects to order success page
```

## 7. API Response Format (Standardized)

```javascript
// Success Response
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { /* actual data */ },
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}

// Error Response
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 8. Database Indexing Strategy

```javascript
// Users Collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

// Products Collection
db.products.createIndex({ name: "text", description: "text" })
db.products.createIndex({ category: 1, price: 1 })
db.products.createIndex({ createdAt: -1 })

// Orders Collection
db.orders.createIndex({ userId: 1, createdAt: -1 })
db.orders.createIndex({ status: 1, createdAt: -1 })

// Carts Collection
db.carts.createIndex({ userId: 1 }, { unique: true })
db.carts.createIndex({ updatedAt: 1 }, { expireAfterSeconds: 604800 }) // TTL: 7 days
```

## 9. Deployment Architecture

### Local Development
- Frontend runs on http://localhost:4200 (ng serve)
- Backend runs on http://localhost:3000
- MongoDB runs in Docker container

### Docker Compose (Production-like)
- Nginx reverse proxy on port 80
- Frontend container (Node.js serving built Angular)
- Backend container (Node.js + Express)
- MongoDB container (persistent volume)

### Cloud Deployment (AWS Example)
- Frontend: S3 + CloudFront (CDN)
- Backend: EC2 with auto-scaling group
- Database: MongoDB Atlas
- Load Balancer: AWS ALB

---

This system design ensures scalability, security, and maintainability for a production-grade e-commerce platform.
