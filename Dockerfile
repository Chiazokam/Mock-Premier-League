FROM node:alpine

COPY . /usr/app

WORKDIR /usr/app

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && rm -rf node_modules/ \
    && npm install \
        # nodemon \
    && apk del .gyp

EXPOSE 9000
