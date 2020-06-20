const pg = require('pg')
const uuid = require('uuid/v4')
const client = require('./client')
const faker = require('faker')
const { authenticate, compare, findUserFromToken, hash } = require('./auth')
const models = ({ users, pets } = require('./models'))
const methods = ({ getPets } = require('./userMethods'))


//   // id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
const sync = async () => {
  const SQL = `   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  DROP TABLE IF EXISTS pets;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE pets (
      id VARCHAR(100) NOT NULL,
      user_id UUID REFERENCES users(id),
      name VARCHAR(100) NOT NULL,
      image VARCHAR DEFAULT 'https://i.imgur.com/Y0q6OiD.jpg?1',
      lastname VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      date_create TIMESTAMP default CURRENT_TIMESTAMP
    )
  `
  await client.query(SQL)
}

module.exports = {
  sync,
  models,
  methods,
  authenticate,
  findUserFromToken

}
