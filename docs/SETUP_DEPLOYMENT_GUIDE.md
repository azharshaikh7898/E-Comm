# Complete Setup & Deployment Guide

## 📦 Project Overview

This is a complete, production-ready e-commerce web application with:
- **Frontend**: Angular SPA with modular architecture
- **Backend**: Node.js/Express REST API
- **Database**: MongoDB
- **Deployment**: Docker & Docker Compose
- **Documentation**: Comprehensive API docs and system design

## 🚀 Quick Start (5 Minutes)

### Option 1: Local Development

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd backend
npm install
npm run seed
npm run dev

# Terminal 3: Start Frontend
cd frontend
npm install
npm start
```

Visit:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- API Docs: See docs/API_DOCUMENTATION.md

### Option 2: Docker (Recommended)

```bash
# From project root
docker-compose up --build

# Services ready at:
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
# MongoDB: localhost:27017
```

**Demo Credentials** (after seeding):
- Email: john@example.com
- Password: password123

Admin Account:
- Email: admin@example.com
- Password: admin123

## 📁 Project Structure Overview

```
E-cOM/
├── 📂 frontend/                    # Angular Application
│   ├── src/app/
│   │   ├── core/                  # Services, Guards, Interceptors
│   │   ├── shared/                # Models, Components
│   │   └── features/              # Lazy-loaded modules
│   ├── package.json
│   └── Dockerfile
│
├── 📂 backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/                # Configuration
│   │   ├── models/                # Mongoose Schemas
│   │   ├── controllers/           # Request Handlers
│   │   ├── services/              # Business Logic
│   │   ├── routes/                # API Routes
│   │   └── middleware/            # Express Middleware
│   ├── tests/                     # Jest Tests
│   ├── package.json
│   └── Dockerfile
│
├── 📄 docker-compose.yml          # Container Orchestration
├── 📄 SYSTEM_DESIGN.md            # Architecture & Design
├── 📄 README.md                   # Project Overview
└── 📂 docs/
    ├── API_DOCUMENTATION.md       # Complete API Reference
    └── INTERVIEW_MATERIALS.md     # Interview Prep
```

## 🛠️ Manual Setup (Detailed)

### Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **MongoDB**: 6.x or higher
- **Git**: Latest version

### Step 1: Clone & Navigate
```bash
git clone <repository-url>
cd E-cOM
```

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key-change-in-production-12345
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:4200
LOG_LEVEL=debug
EOF

# Ensure MongoDB is running (in separate terminal)
mongod

# Seed database (if not running MongoDB locally, update MONGODB_URI first)
npm run seed

# Start development server
npm run dev

# Backend is now running on http://localhost:3000
```

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend opens automatically at http://localhost:4200
```

### Step 4: Testing
```bash
# Backend tests
cd backend
npm test
npm test -- --coverage

# Frontend tests (when added)
cd frontend
npm test
```

## 🐳 Docker Deployment

### Prerequisites
- **Docker**: 20.x or higher
- **Docker Compose**: 2.x or higher

### Quick Deploy
```bash
# Build and start all services
docker-compose up --build

# Services available at:
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
# Nginx (optional): http://localhost:80

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Container Management
```bash
# Build specific service
docker-compose build backend

# Start specific service
docker-compose up backend

# View logs for specific service
docker-compose logs -f backend

# Execute command in running container
docker-compose exec backend npm test

# Stop all services but keep volumes
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔐 Environment Configuration

### Backend .env
```env
# Server
PORT=3000
NODE_ENV=development|production

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# For Docker: mongodb://root:password@mongodb:27017/ecommerce?authSource=admin

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=10

# CORS
CORS_ORIGIN=http://localhost:4200
# For production: https://yourdomain.com

# Logging
LOG_LEVEL=info|debug|warn|error

# Optional: Third-party services
# STRIPE_SECRET_KEY=sk_test_...
# SENDGRID_API_KEY=SG.xxx...
```

### Frontend environment.ts
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com'
};
```

## 📊 Database Setup

### Manual MongoDB Setup
```bash
# Start MongoDB
mongod --dbpath ./data/db

# In another terminal, seed database
cd backend
npm run seed
```

### Docker MongoDB Setup
MongoDB is automatically started with `docker-compose up`. To access:
```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh

# Inside mongosh
use ecommerce
db.users.find()
```

### Database Backup
```bash
# Backup
mongodump --uri "mongodb://localhost:27017/ecommerce" --out ./backup

# Restore
mongorestore --uri "mongodb://localhost:27017" ./backup
```

## 🧪 Testing & Validation

### API Testing with cURL
```bash
# Test API health
curl http://localhost:3000/api/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get products
curl http://localhost:3000/api/products?page=1&limit=10
```

### Running Tests
```bash
# Backend unit tests
cd backend
npm test

# Backend with coverage
npm test -- --coverage

# Watch mode for development
npm test -- --watch

# Run specific test file
npm test auth.test.js
```

## 🚢 Production Deployment

### AWS EC2 Deployment

#### 1. Launch EC2 Instance
```bash
# Choose Ubuntu 22.04 LTS
# Open ports: 80, 443, 3000, 4200
```

#### 2. SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### 3. Install Prerequisites
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nodejs npm git
sudo usermod -aG docker ubuntu
```

#### 4. Clone & Deploy
```bash
git clone <repository-url>
cd E-cOM

# Create production .env
nano .env

# Build and start
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose ps
```

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Environment Variables on Production
```bash
# AWS Secrets Manager or Parameter Store
# GitHub Secrets for CI/CD
# Environment-specific .env files
# Never commit secrets to version control
```

## 📈 Monitoring & Maintenance

### Health Checks
```bash
# API health
curl http://localhost:3000/api/health

# Frontend health
curl http://localhost:4200

# Docker container health
docker-compose ps
```

### Logs Management
```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Save logs to file
docker-compose logs > app.log

# Clear logs
docker container prune
```

### Performance Monitoring
```bash
# Check CPU and memory usage
docker stats

# Analyze database performance
# Connect to MongoDB and run explain on queries

# Monitor API response times
# Check application logs for timing info
```

## 🔍 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```bash
# Check MongoDB is running
mongod --version

# Check connection string in .env
# For local: mongodb://localhost:27017/ecommerce
# For Docker: mongodb://mongodb:27017/ecommerce

# If using Docker, ensure services are linked
docker-compose up -d mongodb backend
```

#### 2. Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

#### 3. CORS Errors
```bash
# Check CORS_ORIGIN in backend .env
# Should match frontend URL
# Local: http://localhost:4200
# Production: https://yourdomain.com
```

#### 4. JWT Token Errors
```bash
# Clear localStorage
# In browser console: localStorage.clear()

# Re-login to get new token
```

#### 5. Docker Build Failures
```bash
# Clean up Docker
docker system prune -a

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## 📚 Documentation

### Project Documentation
- [README.md](../README.md) - Project overview
- [SYSTEM_DESIGN.md](../SYSTEM_DESIGN.md) - Architecture & design
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [INTERVIEW_MATERIALS.md](./INTERVIEW_MATERIALS.md) - Interview prep

### External Resources
- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Docker Documentation](https://docs.docker.com/)
- [JWT Guide](https://jwt.io/)

## 🎯 Next Steps

### For Development
1. Implement additional features (wishlist, reviews)
2. Add more components and pages
3. Implement WebSockets for real-time updates
4. Add advanced search and filtering

### For Production
1. Set up SSL/TLS certificates
2. Configure CDN for static assets
3. Set up automated backups
4. Implement monitoring and alerting
5. Configure rate limiting thresholds
6. Set up error tracking (Sentry, etc.)

### For Scaling
1. Implement Redis caching
2. Set up database replication
3. Implement microservices
4. Set up load balancing
5. Implement API gateway
6. Configure auto-scaling

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review documentation
3. Check GitHub issues
4. Contact development team

---

**Happy Coding! 🚀**
