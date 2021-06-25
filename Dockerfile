FROM node:16-alpine

EXPOSE 8080

WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn run build
CMD ["yarn", "run", "start"]
