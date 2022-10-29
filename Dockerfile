FROM node:16.14.2-buster

RUN /bin/sh -c "apt update && apt install -y make gcc g++ libtool libmcrypt-dev git python2 glib2.0-dev libvips-dev"

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 8080
