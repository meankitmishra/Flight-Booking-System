FROM node:latest

WORKDIR /user

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "npm run migrate-db && npm run start"]

