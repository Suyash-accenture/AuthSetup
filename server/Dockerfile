## Multi-stage Dockerfile: build client then run server

FROM node:18-alpine AS builder
WORKDIR /app

# Install client deps and build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --silent || npm install --silent
COPY client/ .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

# Install server deps
COPY server/package*.json ./
RUN npm ci --only=production --silent || npm install --only=production --silent

# Copy server source
COPY server/ .

# Copy built client into server public folder
COPY --from=builder /app/client/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]