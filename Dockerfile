FROM node:18.14.0-alpine3.17

COPY . .

RUN yarn install

RUN yarn build

CMD [ "node", "dist/server.js" ]