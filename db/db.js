const pg = require('pg')
const uuid = require('uuid/v4')
const client = require('./client')
const faker = require('faker')
const { authenticate, compare, findUserFromToken, hash } = require('./auth')
const models = ({ users } = require('./models'))

const sync = async () => {
  const SQL = `   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
    );

  `
  await client.query(SQL)
}

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken

}
