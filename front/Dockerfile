# Dockerfile to deploy a NEXT.js app
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
# Make sure that there is no .dockerignore file excluding the .next directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables
ENV APIURL http://localhost:3001

# Build the app
RUN npm run build

# Verify that .next folder exists and BUILD_ID file is present
RUN ls -la .next

# Run the app
CMD [ "npm", "start" ]
