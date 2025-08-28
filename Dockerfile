FROM node:22.18.0

WORKDIR /app
ADD . /app/

ENV HOST=0.0.0.0
EXPOSE 3000

RUN apt-get update && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

RUN yarn install
RUN yarn global add pm2
RUN yarn build
RUN yarn prisma

CMD ["pm2-runtime", "start", "app-pm2.json"]

