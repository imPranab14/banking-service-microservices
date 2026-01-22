# Use official Node.js 20 image based on Alpine Linux
# Alpine is lightweight → smaller image size & faster builds
FROM node:20-alpine

# Set the working directory inside the container
# All commands below will run from this folder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
# This helps Docker cache dependencies layer
COPY package*.json ./

# Copy the rest of the application source code
COPY . .

#Run Install dependencies
RUN npm i

# Expose port 3000
# This tells Docker which port the app listens on
EXPOSE 3000


# Start the Node.js application
# Runs: api-gateway src/index.js
CMD ["node", "index.js"]
