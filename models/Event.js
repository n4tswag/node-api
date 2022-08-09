/*const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, Sequelize) => {
    class Event extends Model {
        static associate(models) {
            Event.hasMany(models.Invite, {
                foreignKey: 'event_id',
                as: 'invite'
            });
        }
    };
    Event.init({
        id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    eventCreator: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    }, {
      sequelize,
      modelName: 'Event',
    });
    return Event;
  };*/

  module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("Event", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        eventCreator: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Event;
  };