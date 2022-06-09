# Label stage as ‘builder’
FROM node:14-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

ARG MAX_OLD_SPACE_SIZE=12288
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}


## Build the angular app in production mode and store the artifacts in dist folder
ARG configuration=production
RUN npm run build -- --output-path=./dist --configuration $configuration

### Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]