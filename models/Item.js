const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Item extends Model {}

Item.init(
  {
    name: {
      type: DataTypes.STRING,
      required: true
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'list',
        key: 'id'
      }
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'user',
    //     key: 'id'
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item'
  }
);

module.exports = Item;
