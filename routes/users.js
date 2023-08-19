const express = require("express");
const router = new express.Router();
const User = require('../models/user');
const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth')


//  GET / - get list of users.
router.get('/', ensureLoggedIn, async (req, res, next) =>{
    try{
        let users = await User.all();

        return res.json({users});
    }catch(e){
        return next(e);
    }
})


// ** GET /:username - get detail of users.
router.get('/:username', ensureCorrectUser, async (req, res, next) => {
    try{
        let user = await User.get(req.params.username);

        return res.json({user});
    }catch(e){
        return next(e);
    }
})

// get messages to user
router.get('/:username/to', ensureCorrectUser, async (req, res, next) =>{
    try{
        let messages = await User.messagesTo(req.params.username);

        return res.json({messages});
    }catch(e){
        return next(e);
    }
})


//   get messages from user
router.get('/:username/from', ensureCorrectUser, async (req, res, next) =>{
    try{
        let messages = await User.messagesFrom(req.params.username);

        return res.json({messages});
    }catch(e){
        return next(e);
    }
})

module.exports = router;