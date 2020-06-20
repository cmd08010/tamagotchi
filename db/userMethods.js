const client = require('./client');

const getPets = async () => {
  let response = await client.query(`SELECT * FROM pets`);
  return response.rows;
};


module.exports = {
  getPets
};
