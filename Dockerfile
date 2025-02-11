# Stage 1: Build the frontend
FROM node:22-slim AS frontend-build

WORKDIR /app/obs-control

# Copy package.json and install dependencies
COPY obs-control/package*.json ./
RUN npm install

# Copy the entire frontend source code
COPY obs-control/ ./

# Build the frontend (Vite will generate a "dibuildst" folder)
RUN npm run build
RUN npm prune --production


# Stage 2: Set up the backend and serve frontend
FROM node:22-slim AS backend

WORKDIR /app/obs-backend

# Copy package.json and install dependencies
COPY obs-backend/package*.json ./
RUN npm install

# Copy the backend source code
COPY obs-backend/ ./

# Create a directory to store frontend files
RUN mkdir -p /app/obs-backend/frontend

# Copy the Vite-built frontend to the backend
COPY --from=frontend-build /app/obs-control/build /app/obs-backend/frontend

# Expose port 8080
EXPOSE 8080

# Start the backend
CMD ["node", "index.js"]
