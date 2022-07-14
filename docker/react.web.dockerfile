FROM node:16-alpine

ENV REACT_APP_API_HOST http://localhost:4000

WORKDIR /app

RUN mkdir apps/server -p

COPY package.json yarn.lock /app

COPY apps/web-react /app/apps/web-react

RUN rm apps/web-react/.env

RUN yarn

RUN yarn workspace web-react build
 
CMD ["yarn", "workspace", "web-react", "start:s"]