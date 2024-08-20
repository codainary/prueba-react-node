# Stage 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copiar los archivos de paquete y realizar la instalación
COPY package*.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Stage 2: Production stage
FROM node:18 AS production
WORKDIR /app

# Copiar la aplicación desde la etapa de construcción
COPY --from=build /app /app

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
