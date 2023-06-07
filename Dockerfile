# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the app.js file to the working directory
COPY app.js .

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD [ "node", "app.js" ]
