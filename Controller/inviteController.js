const db = require('../models/database')
const Inite = db.invites
const User = db.users
const Event = db.events

class inviteController {
    async createInvite(req, res) {
        try {
            const {username, eventId} = req.body
            const sender = await User.findOne({where:{username: `${username}`}})
            if (!sender) {
                res.status(400).json({message:`User ${username} is not authorized!`})
            }
            const recepient = await User.findOne({where:{username: `${username}`}})
            if (!recepient) {
                res.status(400).json({message:`User ${recepient.username} is not found!`})
            }
            const event = await Event.findOne({where:{id: `${eventId}`}})
            if (!event) {
                res.status(400).json({message:`Event ${event.title} is not found!`})
            }
            await Invite.create({ EventId: event.id, UserId: recepient.id})
            return res.json({message: 'You have successfully created an invite!'})
    } catch(e) {
        console.log(e)
        res.status(400).json({message : 'Error'})
    } 
    }
    async viewMyInvites(req, res) {
        try {
            const {username} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
                res.status(400).json({message:`User ${username} is not found!`})
            }
            const invites = await Inite.findAll({where:{UserId: `${user.id}`}}, {raw:true})
            res.json(invites)
    } catch(e) {
        console.log(e)
        res.status(400).json({message : 'Error'})
    } 
    }
    async acceptInvite(req, res) {
        try {
            const {username} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const invite = await Invite.update({status: `accepted`}, {where:{UserId: `${user.id}`}})
            if (!invite) {
                res.status(400).json({message : 'Searching error: there is no invite with such ID'})
            }
            res.json(invite)
            return res.json({message: 'You have successfully accepted this invite!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Invite error'})
        }
    }
    async rejectInvite(req, res) {
        try {
            const {username} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const invite = await Invite.update({status: `rejected`}, {where:{UserId: `${user.id}`}})
            if (!invite) {
                res.status(400).json({message : 'Searching error: there is no invite with such ID'})
            }
            res.json(invite)
            return res.json({message: 'You have successfully rejected this invite!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Invite error'})
        }
    }
    async deleteInvite(req, res) {
        try {
            const {username, id} = req.body
            const user = await User.findOne({where:{username: `${username}`}})
            if (!user) {
              res.status(400).json({message:`User ${username} is not found!`})
            }
            const invite = await Invite.destroy({where:{UserId: `${user.id}`, id: `${id}`}})
            if (!invite) {
                res.status(400).json({message : 'Searching error: there is no invite with such ID'})
            }
            res.json(invite)
            return res.json({message: 'You have successfully deleted your invite!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message : 'Deleting error'})
        }
    }
}

module.exports = new inviteController()