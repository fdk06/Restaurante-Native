FROM node:22-alpine

WORKDIR /usr/src/app

# Instalar dependencias necesarias para node-gyp y argon2 en alpine
RUN apk add --no-cache python3 make g++

# Copiar configuraciones del workspace
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# Copiar los package.json de los workspaces para poder hacer el npm install
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Instalar dependencias
RUN npm install

# Copiar el código fuente (esto normalmente se hace con volúmenes en desarrollo)
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

# Exponer el puerto
EXPOSE 3000

# Comando para desarrollo con hot-reload
CMD ["npm", "run", "start:dev", "-w", "api"]
