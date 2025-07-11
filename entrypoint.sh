#!/bin/sh
set -e

# Remplace la variable d'environnement PORT dans le fichier de configuration Nginx
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Exécute la commande principale de Nginx
exec nginx -g 'daemon off;'
