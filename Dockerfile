############################################################
# Dockerfile to build Nginx Installed Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM nginx:latest

MAINTAINER Ashutosh Pandey <ashutosh.pandey@cirrus-connect.com>

COPY app /usr/share/nginx/html

EXPOSE 80