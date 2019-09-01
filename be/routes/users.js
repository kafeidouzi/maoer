var express = require('express');
var router = express.Router();

const Users = require('../controllers/users')


router.post('/signup', Users.signup)
router.post('/signin',Users.signin)
router.get('/isSignin',Users.isSignin)
router.get('/signout',Users.signout)
router.post('/yanzheng',Users.yanzheng)
module.exports = router;
