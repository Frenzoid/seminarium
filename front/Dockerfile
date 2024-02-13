# Dockerfile to deploy a NEXT.js app
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables
ENV APIURL http://localhost:3001

# Build the app
RUN npm run build

# Run the app
CMD [ "npm", "start" ]