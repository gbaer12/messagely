const express = require("express");
const router = new express.Router();
const Message = require('../models/message');
const { ensureLoggedIn } = require('../middleware/auth')
const ExpressError = require('../expressError');


//get detail of message.
router.get('/:id', ensureLoggedIn, async (req, res, next) =>{
    try{
        let username = req.user.username;
        let msg = await Message.get(req.params.id);

        if(msg.to_user.username !== username && msg.from_user.username !== username){
            throw new ExpressError('Cannot read this message', 401);
        }

        return res.json({message: msg});
    }catch(e){
        return next(e);
    }
});


// post message.
router.post('/', ensureLoggedIn, async (req, res, next) =>{
    try{
        let msg = await Message.create({
            from_username: req.user.username,
            to_username: req.body.to_username,
            body: req.body.body
        });

        return res.json({message: msg});
    }catch(e){
        return next(e);
    }
})


//mark message as read:
router.post('/:id/read', ensureLoggedIn, async (req, res, next) =>{
    try{
        let username = req.user.username;
        let msg = await Message.get(req.params.id);

        if(msg.to_user.username !== username){
            throw new ExpressError('Cannot set this message to read', 401);
        }

        let message = await Message.markRead(req.params.id);

        return res.json({message});
    }catch(e){
        return next(e);
    }
});

module.exports = router;