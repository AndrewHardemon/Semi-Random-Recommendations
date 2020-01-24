module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});  User.associate = function(models) {
    User.hasMany(models.AuthToken);
  };
  return User;
};

