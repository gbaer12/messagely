const express = require("express");
const router = new express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { SECRET_KEY } = require('../config');
const ExpressError = require("../expressError");

// POST /login - login: {username, password} => {token}
router.post('/login', async (req, res, next) =>{
    try{
        const { username, password } = req.body;
        if(await User.authenticate(username, password)){
            let token = jwt.sign({username}, SECRET_KEY);

            User.updateLoginTimestamp(username);

            return res.json({token});
        }else{
            throw new ExpressError('Invalid username/password', 400);
        }
    }catch(e){
        return next(e);
    }
})

// POST /register - register user: registers, logs in, and returns token.
router.post('/register', async (req, res, next) =>{
    try{
        const { username } = await User.register(req.body);
        
        let token = jwt.sign({username}, SECRET_KEY);

        User.updateLoginTimestamp(username);

        return res.json({token});
    }catch(e){
        return next(e);
    }
})

module.exports = router;