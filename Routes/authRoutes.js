const Router = require('express')
const router = new Router()
const controller = require('../Controller/authController.js')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/middleware')

router.post('/registration', [
    check('username', 'Field username can not be empty!' ).notEmpty(),
    check('name', 'Field name can not be empty!').notEmpty(),
    check('name', 'Name must consists of at least 2 symbols!').isLength({min:2}),
    check('password', 'Password must include at least 4 symbols!!').isLength({min:4})
], 
controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router