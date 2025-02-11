# Stage 1: Build the frontend
FROM node:22.11-slim AS frontend-build

WORKDIR /app/obs-control

COPY obs-control/package*.json ./
RUN npm install

COPY obs-control/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:22.11-slim AS backend-build

WORKDIR /app/obs-backend

COPY obs-backend/package*.json ./
RUN npm install

COPY obs-backend/ ./

# Copy the built frontend from the previous stage
COPY --from=frontend-build /app/frontend/public /app/backend/public

EXPOSE 8080

CMD ["node", "index.js"]
