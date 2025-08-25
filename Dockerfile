FROM node:22.18.0-alpine

WORKDIR /app
ADD . /app/

ENV HOST=0.0.0.0
EXPOSE 3000

RUN apk add --update --no-cache openssl1.1-compat
RUN yarn install
RUN yarn global add pm2
RUN yarn build
RUN yarn prisma

CMD ["pm2-runtime", "start", "app-pm2.json"]

