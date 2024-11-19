FROM node:14

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]