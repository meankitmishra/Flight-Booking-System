const dotenv = require('dotenv');
const path = require('path');

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "Flights",
    host: process.env.DATABASE_URL,
    dialect: "mysql"
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "Flights",
    host: process.env.DATABASE_URL,
    dialect: "mysql"
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "Flights",
    host: process.env.DATABASE_URL,
    dialect: "mysql"
  }
}