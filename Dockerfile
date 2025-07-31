# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Set environment variable port
ENV PORT=8080

# Expose the app port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
