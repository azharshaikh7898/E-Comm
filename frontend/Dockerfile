# Frontend Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular app
RUN npm run build:prod

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run Angular app
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/dist/ecommerce-frontend ./dist

# Expose port
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4200', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start app
CMD ["serve", "-s", "dist", "-l", "4200"]
