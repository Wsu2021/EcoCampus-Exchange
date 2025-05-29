# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# List the installed versions of dependencies
RUN npm list mysql2

# Copy the rest of the application code
COPY . .

# Copy the wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app after MySQL is ready
CMD ["/wait-for-it.sh", "mysql:3306", "--", "node", "server.js"]
