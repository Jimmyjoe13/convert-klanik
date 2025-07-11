# Utilise une image Nginx légère
FROM nginx:alpine

# Copie les fichiers de l'application dans le répertoire de service de Nginx
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

# Copie la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copie le script d'entrée et le rend exécutable
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose le port 80
EXPOSE 80

# Utilise le script d'entrée
CMD ["entrypoint.sh"]
