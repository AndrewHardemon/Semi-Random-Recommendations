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
    "dialect": "mysql"
  }
}

