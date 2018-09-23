# Build Process

FROM node:8.11.3 as build
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn global add node-gyp

RUN yarn

COPY . /app

CMD [ "npm", "start" ]

# Production Image

FROM node:8.11.3-alpine

WORKDIR /app

COPY --from=build /app /app

RUN yarn global add node-gyp

RUN yarn install --production

CMD [ "node", "server.js" ]
