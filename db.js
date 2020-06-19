const pg = require("pg")
const { Client } = pg
const uuid = require("uuid/v4")
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_dictionary"
)

client.connect()

const sync = async () => {
  const SQL = `    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS table_name;
  CREATE TABLE table_name
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    date_create TIMESTAMP default CURRENT_TIMESTAMP
  );

  INSERT INTO table_name
   (name) VALUES ('word');
  `
  await client.query(SQL)
}

//Get
const getThings = async () => {
  const SQL = `
  SELECT * FROM table_name
  `
  const response = await client.query(SQL)
  return response.rows
}

const getThing = async id => {
  const SQL = `
  SELECT * FROM table_name WHERE id = $1;
  `
  const response = await client.query(SQL, [id])
  return response.rows[0]
}

//Create
const createThing = async name => {
  const SQL = `
  INSERT INTO table_name (name) VALUES ($1)
  returning *
  `
  const response = await client.query(SQL, [name])
  return response.rows
}

//update
const updateThing = async (name, id) => {
  const SQL = `UPDATE table_name SET name = $2 where id = $1
  returning *`
  const response = await client.query(SQL, [name, id])
  return response.rows[0]
}

//delete

const deleteThing = async id => {
  const SQL = `
  DELETE FROM table_name WHERE id = $1 `
  const response = await client.query(SQL, [id])
  return response.rows[0]
}

module.exports = {
  sync,
  getThings,
  getThing,
  createThing,
  updateThing,
  deleteThing
}
