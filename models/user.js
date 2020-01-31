module.exports = function(sequelize, Datatypes) {
  var User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Datatypes.INTEGER
    },

    firstname: {
      type: Datatypes.STRING,
      notEmpty: true
    },

    lastname: {
      type: Datatypes.STRING,
      notEmpty: true
    },

    email: {
      type: Datatypes.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  return User;
};
