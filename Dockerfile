# Image Node.js
FROM node:22-alpine

# Dossier de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm ci

# Copie le projet
COPY . .

# Port utilisé par Vite
EXPOSE 5173

# Lance le serveur Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]