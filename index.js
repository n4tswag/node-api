const express = require('express')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_task', 'postgres', 'root', {
    dialect: 'postgres',
    //host: 'localhost'
})
//const db = require('./models/database')
//const User = db.users
//const Event = db.events
//const Invite = db.invites
const eventRouter = require('./Routes/eventRoutes')
const inviteRouter = require('./Routes/inviteRoutes')
const authRouter = require('./Routes/authRoutes')
const PORT = process.env.PORT || 8080;

const app = express()

app.use(express.json())
app.use('/api/', inviteRouter)
app.use('/api/auth', authRouter)
app.use('/api/', eventRouter)

const start = async () => {
    try{ 
        try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.')
          } catch (error) {
            console.error('Unable to connect to the database:', error)
          }
          const User = await sequelize.define("User", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false,
              required: true
            },
            username: {
              type: Sequelize.STRING,
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
        const Invite = sequelize.define("Invite", {
            status: {
              type: Sequelize.STRING,
              primaryKey: true,
              allowNull: false,
              default: 'no response'
          },
          });
          User.hasMany(Event, { onDelete: "cascade" })
          User.hasMany(Invite, { onDelete: "cascade" })
          Event.hasMany(Invite, { onDelete: "cascade" })          
            await sequelize.sync({force:true}).then(result=>{
            console.log(result);
          })

          .catch(err=> console.log(err));
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))    
    } catch(e){
        console.log(e)
    }
}
start()

