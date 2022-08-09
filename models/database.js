const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_task', 'postgres', 'root', {
    dialect: 'postgres',
    //host: 'localhost'
})
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('../models/User.js')(sequelize, Sequelize);
db.events = require('../models/Event.js')(sequelize, Sequelize);
db.invites = require('../models/Invite.js')(sequelize, Sequelize);
module.exports = db;