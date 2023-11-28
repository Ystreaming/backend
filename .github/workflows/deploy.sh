#!/bin/bash

# Naviguer au répertoire de l'application
cd backend

# Tirer les dernières modifications de la branche principale
git pull origin main

# Installez les dépendances (ajustez selon votre environnement de build)
# Pour une application Node.js, par exemple :
npm install

# Construisez votre application (si nécessaire)
# Par exemple, pour une application Node.js/React :
npm run start:dev

# Redémarrez le serveur/application (ajustez selon votre environnement)
# Pour un processus Node.js géré par PM2, par exemple :
pm2 restart all

echo "Déploiement terminé avec succès"
