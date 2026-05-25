# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the application (TanStack Start server)
CMD ["node", "dist/server.js"]

