FROM node:16-alpine

ENV PORT 4000
ENV POSTGRES_USERNAME item
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DATABASE item
ENV POSTGRES_HOSTNAME localhost

WORKDIR /app

RUN mkdir apps/server -p

COPY package.json yarn.lock /app

COPY apps/server /app/apps/server

RUN rm apps/server/.env

RUN yarn

RUN yarn workspace server build:ts
 
CMD ["yarn", "migrate"]

CMD ["yarn", "workspace", "server", "start:s"]