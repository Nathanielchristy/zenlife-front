# Use a base image with Node.js pre-installed
FROM node:14-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Vite app
RUN npm run build


EXPOSE 4173

CMD [ "npm","run","preview" ]