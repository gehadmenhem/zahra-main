const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

module.exports = Object.freeze({
  app: {
    PORT: process.env.PORT || "8080",
  },
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_SERVER,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      keepAlive: true, // optional for pg
      ssl: { rejectUnauthorized: false },
    },
  },
  emaiSender: {
    senderEmail: process.env.EMAIL_SENDER,
    password: process.env.PASSWORD,
    realEmail:process.env.REAL_EMAIL
  }
});
