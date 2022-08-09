const db = require('../models/database')
const Event = db.events
const User = db.users

class EventController {
    async createEvent(req, res) {
        try {
            const {username, title, eventCreator} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
                res.status(400).json({message:`User ${username} is not found!`})
            }
            await Event.create({title, eventCreator, UserId: user.id})
            return res.json({message: 'You have successfully created an event!'})
    } catch(e) {
        console.log(e)
        res.status(400).json({message : 'Error'})
    }
    }
    async viewAllEvents(req, res) {
        try {
            const {username} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const events = await Event.findAll({where:{UserId: `${user.id}`}}, {raw:true})
            res.json(events)
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Searching error'})
        }
    }
    async viewOneEvent(req, res) {
        try {
            const {username, id} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const event = await Event.findOne({where:{UserId: `${user.id}`, id: `${id}`}}, {raw:true})
            if (!event) {
                res.status(400).json({message : 'Searching error: there is no event with such ID'})
            }
            res.json(event)
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Searching error'})
        }
    }
    async updateEvent(req, res) {
        try {
            const {username, id, title, eventCreator} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const event = await Event.update({eventCreator: `${eventCreator}`, title: `${title}`}, {where:{UserId: `${user.id}`, id: `${id}`}})
            if (!event) {
                res.status(400).json({message : 'Searching error: there is no event with such ID'})
            }
            res.json(event)
            return res.json({message: 'You have successfully updated your event!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Searching error'})
        }
    }
    async deleteEvent(req, res) {
        try {
            const {username, id} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const event = await Event.destroy({where:{UserId: `${user.id}`, id: `${id}`}})
            if (!event) {
                res.status(400).json({message : 'Searching error: there is no event with such ID'})
            }
            res.json(event)
            return res.json({message: 'You have successfully deleted your event!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Searching error'})
        }
    }
}

module.exports = new EventController()