const router = require('express').Router()
const { loginUser , createUser, logout} = require('../controllers/authController')

router.get('/register', createUser )
router.post('/register', createUser )
router.get('/login', loginUser)
router.get('/logout', logout)
router.post('/login', loginUser )


module.exports = router