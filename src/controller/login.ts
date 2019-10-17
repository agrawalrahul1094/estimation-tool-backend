import { getUserId } from "../common/common";

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    console.log(req.body)
    User.findOne({email: req.body.email, password: req.body.password}).exec().then(result => {
        if (result === null) {
            res.json({
                success: false,
                message: 'Invalid user email and password'
            })
        } else {
            jwt.sign({result}, 'secretkey', (err, token) => {
                res.json({
                    success: true,
                    token
                })
            })
        }
    }).catch(err => {
        res.sendStatus(404).json({
            success: false,
            message: 'Invalid Creditial'
        })  
    })
});
module.exports = router;