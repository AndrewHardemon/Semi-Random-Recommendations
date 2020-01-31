module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        len:[7,100]
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
      len:[8,20]
    }
  });

  return User;
};
