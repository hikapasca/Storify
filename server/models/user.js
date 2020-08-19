'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args: true,
          msg: "Email cannot empty!"
        },
        notNull:{
          args: true,
          msg: "email cannot empty!"
        },
        isEmail:{
          args: true,
          msg: "Wrong email format!"
        },
        async checkEmail(email){
          const data = await User.findOne({where:{email: email} })
          if(data){
            throw new Error(`this email has been registered`)
          }
        }
      }
    } ,
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args: true,
          msg: "Password cannot empty"
        },
        notNull:{
          args: true,
          msg: "Password cannot empty!"
        }
      }
    } 
  }, {
    hooks:{
      beforeCreate:(value, options) =>{
        value.password = hashPassword(value.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};