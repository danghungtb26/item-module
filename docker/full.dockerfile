FROM node:18-alpine

ENV PORT 4000
ENV POSTGRES_USERNAME item
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DATABASE item
ENV POSTGRES_HOSTNAME localhost

WORKDIR /app

# RUN mkdir apps -p

COPY apps/server/package.json apps/server/.sequelizerc /app
COPY apps/server/dist /app/dist
COPY apps/web-react/build /app/dist/build
COPY apps/server/db /app/db

COPY docker/wait-for-it.sh /app

# COPY apps /app/apps

# RUN rm .env
# RUN rm apps/web-react/.env

RUN yarn install --production=true

RUN yarn global add sequelize-cli

# RUN yarn workspace server build:ts

# RUN yarn workspace web-react build

CMD ["yarn", "migrate"]

CMD ["node", "dist/src/index.js"]

# COPY apps/web-react/build apps/server/dist
 
# CMD ["yarn", "workspace", "server",  "migrate"]

# CMD ["yarn", "workspace", "server", "start:s"]