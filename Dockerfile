# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server to serve the built application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "5000"]
