# Dockerfile for a simple express backend.
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
ENV PORT 3000
ENV BPMBLIMIT 10mb
ENV LOGGERLVL prod
ENV JWTSECRET mysecretphrase
ENV JWTEXPIRE 1h
ENV DBDIAL postgres
ENV DBNAME dbname
ENV DBUSER dbuser
ENV DBPASS dbpass
ENV DBHOST dbhost
ENV DBLOGC false
ENV DBRESET false
ENV SALTLVL 10

# Run the app
CMD [ "npm", "start" ]
