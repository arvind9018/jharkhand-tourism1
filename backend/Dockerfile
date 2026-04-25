FROM node:18.17.0-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 10000

# Start the app
CMD ["node", "src/server.js"]
