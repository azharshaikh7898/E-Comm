# Backend API Documentation

## Overview

This document provides comprehensive API documentation for the E-Commerce Backend. All endpoints require proper authentication headers (JWT token) unless otherwise specified.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.yourdomain.com`

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer {token}
```

## Response Format

### Success Response (2xx)
```json
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
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## API Endpoints

### Authentication Module (`/auth`)

#### 1. Register
- **Method**: `POST`
- **Path**: `/auth/register`
- **Auth**: Not Required
- **Rate Limit**: 5 requests per 15 minutes

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "phone": "+1234567890"
}
```

**Response (201)**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "customer",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login
- **Method**: `POST`
- **Path**: `/auth/login`
- **Auth**: Not Required
- **Rate Limit**: 5 requests per 15 minutes

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Profile
- **Method**: `GET`
- **Path**: `/auth/profile`
- **Auth**: Required (JWT)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile fetched successfully",
  "data": { /* user object */ }
}
```

#### 4. Update Profile
- **Method**: `PUT`
- **Path**: `/auth/profile`
- **Auth**: Required (JWT)

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe Updated",
  "phone": "+9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Product Module (`/products`)

#### 1. Get All Products
- **Method**: `GET`
- **Path**: `/products`
- **Auth**: Not Required
- **Rate Limit**: 30 requests per minute

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20, max: 100) |
| search | string | Search products by name/description |
| category | string | Filter by category |
| minPrice | number | Minimum price |
| maxPrice | number | Maximum price |

**Example**:
```
GET /products?page=1&limit=20&category=Electronics&minPrice=10&maxPrice=500
```

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Wireless Headphones",
      "description": "Premium wireless headphones with ANC",
      "price": 199.99,
      "discountPrice": 149.99,
      "category": "Electronics",
      "sku": "WHP-001",
      "stock": 50,
      "images": [{ "url": "...", "altText": "..." }],
      "ratings": { "average": 4.5, "count": 120 },
      "isFeatured": true
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

#### 2. Get Single Product
- **Method**: `GET`
- **Path**: `/products/{productId}`
- **Auth**: Not Required

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product fetched successfully",
  "data": { /* product object */ }
}
```

#### 3. Get Featured Products
- **Method**: `GET`
- **Path**: `/products/featured`
- **Auth**: Not Required

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Featured products fetched successfully",
  "data": [ /* array of featured products */ ]
}
```

#### 4. Create Product (Admin Only)
- **Method**: `POST`
- **Path**: `/products`
- **Auth**: Required (JWT, Admin role)

**Request Body**:
```json
{
  "name": "New Headphones",
  "description": "High-quality headphones with noise cancellation",
  "price": 199.99,
  "discountPrice": 149.99,
  "category": "Electronics",
  "subCategory": "Audio",
  "sku": "WHP-NEW-001",
  "stock": 100,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "altText": "Headphones"
    }
  ],
  "tags": ["electronics", "audio", "wireless"],
  "specifications": [
    { "name": "Color", "value": "Black" },
    { "name": "Battery Life", "value": "30 hours" }
  ]
}
```

**Response (201)**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Product created successfully",
  "data": { /* created product object */ }
}
```

#### 5. Update Product (Admin Only)
- **Method**: `PUT`
- **Path**: `/products/{productId}`
- **Auth**: Required (JWT, Admin role)

**Request Body**: Same as create (partial updates allowed)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product updated successfully",
  "data": { /* updated product object */ }
}
```

#### 6. Delete Product (Admin Only)
- **Method**: `DELETE`
- **Path**: `/products/{productId}`
- **Auth**: Required (JWT, Admin role)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product deleted successfully",
  "data": { /* soft-deleted product object */ }
}
```

### Cart Module (`/cart`)

#### 1. Get Cart
- **Method**: `GET`
- **Path**: `/cart`
- **Auth**: Required (JWT)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cart fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439012",
        "quantity": 2,
        "price": 199.99,
        "discountPrice": 149.99,
        "addedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "totalItems": 2,
    "totalPrice": 299.98,
    "couponCode": null,
    "discount": 0
  }
}
```

#### 2. Add to Cart
- **Method**: `POST`
- **Path**: `/cart/add`
- **Auth**: Required (JWT)

**Request Body**:
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2
}
```

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product added to cart",
  "data": { /* updated cart object */ }
}
```

#### 3. Update Cart Item
- **Method**: `PUT`
- **Path**: `/cart/{productId}`
- **Auth**: Required (JWT)

**Request Body**:
```json
{
  "quantity": 5
}
```

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cart item updated",
  "data": { /* updated cart object */ }
}
```

#### 4. Remove from Cart
- **Method**: `DELETE`
- **Path**: `/cart/{productId}`
- **Auth**: Required (JWT)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product removed from cart",
  "data": { /* updated cart object */ }
}
```

#### 5. Clear Cart
- **Method**: `DELETE`
- **Path**: `/cart`
- **Auth**: Required (JWT)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cart cleared",
  "data": { /* empty cart object */ }
}
```

### Order Module (`/orders`)

#### 1. Create Order
- **Method**: `POST`
- **Path**: `/orders`
- **Auth**: Required (JWT)

**Request Body**:
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "payment": {
    "method": "credit_card",
    "token": "tok_visa"
  }
}
```

**Response (201)**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "orderNumber": "ORD-1705312200000-00001",
    "userId": "507f1f77bcf86cd799439011",
    "items": [ /* order items */ ],
    "pricing": {
      "subtotal": 299.98,
      "shippingCost": 10.00,
      "tax": 31.00,
      "discount": 0,
      "total": 340.98
    },
    "status": "pending",
    "payment": {
      "method": "credit_card",
      "status": "completed",
      "transactionId": "txn_1234567890",
      "paidAt": "2024-01-15T10:30:00Z"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 2. Get Orders
- **Method**: `GET`
- **Path**: `/orders`
- **Auth**: Required (JWT)
- **Query Parameters**: `page`, `limit`, `status`

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Orders fetched successfully",
  "data": [ /* array of order objects */ ],
  "pagination": { /* pagination info */ }
}
```

#### 3. Get Single Order
- **Method**: `GET`
- **Path**: `/orders/{orderId}`
- **Auth**: Required (JWT)

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Order fetched successfully",
  "data": { /* order object */ }
}
```

#### 4. Update Order Status (Admin Only)
- **Method**: `PUT`
- **Path**: `/orders/{orderId}/status`
- **Auth**: Required (JWT, Admin role)

**Request Body**:
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456789"
}
```

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Order status updated",
  "data": { /* updated order object */ }
}
```

#### 5. Cancel Order
- **Method**: `POST`
- **Path**: `/orders/{orderId}/cancel`
- **Auth**: Required (JWT)

**Request Body**:
```json
{
  "reason": "Changed my mind"
}
```

**Response (200)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Order cancelled",
  "data": { /* cancelled order object */ }
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

## Rate Limiting

- General: 100 requests per 15 minutes
- Auth: 5 requests per 15 minutes
- API: 30 requests per minute

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=20" \
  -H "Content-Type: application/json"
```

### Create Order (with token)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "items": [
      {
        "productId": "PRODUCT_ID",
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "payment": {
      "method": "credit_card",
      "token": "tok_visa"
    }
  }'
```

---

For more information, see [README.md](../README.md) and [SYSTEM_DESIGN.md](../SYSTEM_DESIGN.md)
