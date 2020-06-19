const { Client } = require('pg')

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/boilerplate'
)

client.connect()

module.exports = client
