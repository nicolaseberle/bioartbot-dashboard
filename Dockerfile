FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# set environment variables
# ENV VUE_APP_BACKEND_API_URL http://localhost:5001
# ENV VUE_APP_FRONTEND_URL http://localhost:3000
# ENV PORT 3000

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

# construit l'app pour la production en la minifiant
RUN npm run build

EXPOSE 3000
CMD [ "http-server", "dist","-p 3000" ]