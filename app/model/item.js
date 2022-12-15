// represents the model

const { Model, DataTypes } = require('sequelize');
const sequelize = require('./dbconfig');

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tableHead1: {
      type: DataTypes.STRING,
    },
    tableHead2: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'item',
    timestamps: false,
  }
);

module.exports = Item;
