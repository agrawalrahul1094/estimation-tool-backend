const mongo = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


export function verifytoken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.body.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


export function getUserId(req, res, next) {
    
    jwt.verify(req.body.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            // console.log('authData', authData)
            // console.log('authData._id ', authData.result._id)
            User.findOne({_id: authData.result._id}).exec().then(ret => {
                if (ret._id) {
                    req.body.userId = ret._id; 
                    next()
                }
            }).catch(err => {
                res.sendStatus(403).json({
                    success: false,
                    message: 'User is not available'
                })  
            })
        }
    })
}