FROM node:16-alpine

ARG DEFAULT_PORT=3000

ARG DEFAULT_ENV=prod

WORKDIR app

COPY ./package.json /app

RUN npm i

COPY . /app

ENV PORT $DEFAULT_PORT

ENV NODE_ENV $DEFAULT_ENV

EXPOSE $PORT

RUN npm run build

CMD ["npm", "run", "start:debug"]