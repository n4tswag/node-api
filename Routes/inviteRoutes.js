const Router = require('express')
const router = new Router()
const inviteController = require('../Controller/inviteController')
const authMiddleware = require('../middleware/middleware')

router.post('/invite', authMiddleware,  inviteController.createInvite)
router.get('/invites', authMiddleware, inviteController.viewMyInvites)
router.put('/invite', authMiddleware, inviteController.acceptInvite)
router.put('/invite', authMiddleware, inviteController.rejectInvite)
router.delete('/invite', authMiddleware, inviteController.deleteInvite)


module.exports = router