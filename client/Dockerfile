FROM node:8.11.3 as build
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . /app

RUN yarn run build

CMD [ "npm", "start" ]

# Production Image

FROM nginx:1.15.2-alpine

COPY --from=build /app/dist /app/www
COPY --from=build /app/index.html /app/www/index.html

COPY nginx.conf /etc/nginx/

CMD [ "nginx", "-g", "daemon off;" ]
