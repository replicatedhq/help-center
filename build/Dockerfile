FROM nginx:1.13.9-alpine

COPY ./built /var/www/help-center
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
