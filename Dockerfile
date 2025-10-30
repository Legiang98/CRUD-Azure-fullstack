FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY src /app/src
COPY .env /app/.env
COPY server.js /app/server.js
EXPOSE 3000

CMD ["node", "server.js"]
# CMD ["sh", "-c", "ls -la && pwd"]