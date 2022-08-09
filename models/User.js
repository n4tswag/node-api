/*const { Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Event, {
        foreignKey: 'eventCreator',
        as: 'event'
      });
      User.hasMany(models.Invite, {
        foreignKey: 'recepient_username',
        as: 'invite',
      });
    }
  };
  User.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
  },
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      required: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true
},
    passord: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
  },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};*/

const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_task', 'postgres', 'root', {
    dialect: 'postgres',
    //host: 'localhost'
})

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      required: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    }
  });
  return User;
};

