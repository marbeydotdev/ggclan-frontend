# Gebruik een Node.js image als basis
FROM node:18

# Stel de werkdirectory in op /app
WORKDIR /app

# Kopieer package.json en package-lock.json en installeer dependencies
COPY package*.json ./
RUN npm install

# Kopieer de rest van de bestanden naar de werkdirectory
COPY . .

# Bouw de SvelteKit-app
RUN npm run build

# Exposeer de poort waarop de app draait
EXPOSE 4173

# Start de app
CMD ["npm", "run", "preview"]