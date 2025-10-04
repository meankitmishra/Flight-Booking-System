FROM node:latest

WORKDIR /
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 6000
CMD ["sh", "-c", "npm run migrate-db && npm run start"]

