FROM node:20

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ARG JWT_SECRET
ENV JWT_SECRET $JWT_SECRET

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

USER root
RUN chmod +x /docker-entrypoint.sh
USER node

ENTRYPOINT ["/docker-entrypoint.sh"]
