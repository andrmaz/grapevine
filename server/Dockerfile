# syntax=docker/dockerfile:1

FROM node:14.17.4

ENV NODE_ENV=production

WORKDIR /code

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "npm", "run-script", "build" ]


