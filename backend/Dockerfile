# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install


# Copy rest of the code
COPY . .

# Copy environment files
COPY .env* ./

# Generate Prisma client
RUN npx prisma generate

# Expose port (adjust if your express uses different one)
EXPOSE 8000

# Start the app
CMD ["npm", "run", "start"]
