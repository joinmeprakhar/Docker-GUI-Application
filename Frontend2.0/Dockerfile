# Base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Expose the port for the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
