FROM node:19.3-alpine

WORKDIR /app
ADD . /app/

ENV HOST=0.0.0.0
EXPOSE 7004
# RUN yarn config set strict-ssl false
RUN apk add --update --no-cache openssl1.1-compat
RUN yarn install
RUN yarn global add pm2
# TypeScript
RUN yarn build

# RUN yarn start


COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["pm2-runtime", "start", "app-pm2.json"]

