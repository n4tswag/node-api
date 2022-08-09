/*const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, Sequelize) => {
    class Invite extends Model {};
    Invite.init({
      event_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      recepient_username: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'no response'
    },
    }, {
      sequelize,
      modelName: 'Invite',
    });
    return Invite;
  };*/

  module.exports = (sequelize, Sequelize) => {
    const Invite = sequelize.define("Invite", {
      event_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      recepient_username: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'no response'
    },
    });
    return Event;
  };