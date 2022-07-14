FROM node:16-alpine

ENV PORT 4000
ENV POSTGRES_USERNAME item
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DATABASE item
ENV POSTGRES_HOSTNAME localhost

WORKDIR /app

RUN mkdir apps -p

COPY package.json yarn.lock /app

COPY apps /app/apps

RUN rm apps/server/.env
RUN rm apps/web-react/.env

RUN yarn

RUN yarn workspace server build:ts

RUN yarn workspace web-react build

COPY apps/web-react/build apps/server/dist
 
CMD ["yarn", "workspace", "server",  "migrate"]

CMD ["yarn", "workspace", "server", "start:s"]