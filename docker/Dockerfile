# Start with the Node.js 8 image
FROM node:14

# Set a working directory
WORKDIR /app

# Copy the project file
COPY package*.json ./

# Install ALL node_modules, including 'devDependencies'
RUN npm install

# Copy the entire project
COPY . .

# Specify the command for running the service
CMD node bin/main.js