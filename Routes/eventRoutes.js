const Router = require('express')
const router = new Router()
const userController = require('../Controller/eventController')
const authMiddleware = require('../middleware/middleware')

router.post('/event', authMiddleware, userController.createEvent)
router.get('/events', authMiddleware, userController.viewAllEvents)
router.get('/event/:id', authMiddleware, userController.viewOneEvent)
router.put('/event', authMiddleware, userController.updateEvent)
router.delete('/event/:id', authMiddleware, userController.deleteEvent)


module.exports = router