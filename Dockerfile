# Dockerfile
FROM node:18 AS base
WORKDIR /app

# Base de producción
FROM base AS production
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npm", "start"]
