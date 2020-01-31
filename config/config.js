require('dotenv').config();
module.exports = {

  "development": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": "sequelize_passport",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    // "username": "p90q7kc6hfzn7z02",
    // "password": "lhlyrr3pbn3ceunj",
    // "database": "mp7s0lphpmwut5e2",
    // "host": "e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}

