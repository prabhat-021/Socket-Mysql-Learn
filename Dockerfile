# Use official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to container
COPY . .

# Build the Next.js app
RUN npm run build

# # Use a lightweight Node.js image for production
# FROM node:alpine

# # Set working directory
# WORKDIR /app

# # Copy built files from previous stage
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package*.json ./

# # Install only production dependencies
# RUN npm install --only=production

# # Expose the port Next.js runs on
# EXPOSE 3000
COPY .next ./.next

# Start the Next.js app
CMD ["npm", "run", "dev"]
