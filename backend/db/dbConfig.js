const knex = require("knex");
const { db } = require("../config");

const connectKnex = (dbConfig) => {
  try {
    let database = knex(dbConfig);
    return database;
  } catch (error) {
    console.log(error);
  }
};

const database = connectKnex(db);
module.exports = database;
