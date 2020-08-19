'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Story.init({
    title:{type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Title cannot empty!"
        }}
    },
    content:{type: DataTypes.TEXT,
      validate:{
        notEmpty:{
          args: true,
          msg: "Content cannot empty!"
        }}} ,
    qrCode: {type: DataTypes.TEXT,
      validate:{
        notEmpty:{
          args: true,
          msg: "QRCode cannot empty!"
        }}} ,
    UserId:{type: DataTypes.INTEGER,
      validate:{
        isNumeric:{
          args: true,
          msg: "Wrong format UserId!"
        }}} 
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};