# Build Stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm dlx prisma generate
RUN pnpm run build

# Production Stage
FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3003
CMD ["pnpm", "run", "start"]
