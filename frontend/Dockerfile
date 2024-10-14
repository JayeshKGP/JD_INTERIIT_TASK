# Use node image for building the React app
FROM node:18 as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3000
CMD ["node", "client.js"]
