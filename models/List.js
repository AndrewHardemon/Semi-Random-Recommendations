const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class List extends Model {}

List.init(
  {
    title: {
      type: DataTypes.STRING,
      required: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'list'
  }
);

module.exports = List;
