# --------- Build Frontend ---------
FROM node:24 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --------- Build Backend ---------
FROM golang:1.24 AS backend-build
WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
# Build the backend binary
RUN go build -o pocketbase .

# --------- Final Image ---------
FROM debian:bookworm-slim

# Install any runtime dependencies (if needed)
RUN apt-get update && apt-get install -y ca-certificates debian-keyring debian-archive-keyring apt-transport-https curl gpg

# Create directories
WORKDIR /srv/spoties/
RUN mkdir -p deployed

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./deployed/frontend

# Copy backend binary and required files
COPY --from=backend-build /app/backend/pocketbase ./deployed/backend/pocketbase
COPY backend/pb_hooks/ ./deployed/backend/pb_hooks
COPY backend/pb_migrations/ ./deployed/backend/pb_migrations
COPY backend/go.mod ./deployed/backend/
COPY backend/go.sum ./deployed/backend/
COPY backend/main.go ./deployed/backend/

# Expose ports
EXPOSE 8090

CMD ["/srv/spoties/deployed/backend/pocketbase", "serve", "--http", "0.0.0.0:8090", "--dir", "/srv/spoties/data", "--hooksDir", "/srv/spoties/deployed/backend/pb_hooks", "--migrationsDir", "/srv/spoties/deployed/backend/pb_migrations", "--publicDir", "/srv/spoties/deployed/frontend"]
