FROM node:latest

WORKDIR /user

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 6001
CMD ["sh", "-c", "npm run create-db && npm run migrate-db && npm run start"]

