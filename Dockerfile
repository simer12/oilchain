# Multi-stage build for OilChain Platform
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies for all packages
COPY package*.json ./
RUN npm install

# Install server dependencies
COPY server/package*.json server/
WORKDIR /app/server
RUN npm install
WORKDIR /app

# Install client dependencies
COPY client/package*.json client/
WORKDIR /app/client
RUN npm install
WORKDIR /app

# Copy all source code
COPY . .

# Build React app
WORKDIR /app/client
RUN npm run build

# Start from a fresh image for production
FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json server/

# Install production dependencies only for server
RUN npm install --production && \
    cd server && npm install --production && cd ..

# Copy built React app
COPY --from=base /app/client/build ./client/build

# Copy server code
COPY server ./server

# Copy other necessary files
COPY .env* ./

# Expose port
EXPOSE 8000

# Start the server
CMD ["node", "server/server.js"]
