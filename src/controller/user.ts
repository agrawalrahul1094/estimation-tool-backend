import { getUserId } from "../common/common";

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongo = require('mongoose');

router.get('/', (req, res, next) => {
    User.find().exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            success: true,
            message: result
        })
    })
    .catch(err => {
        res.status(400).json({
            success: false,
            message: err
        })
    });
});

router.get('/:userId', getUserId, (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).exec()
    .then(result => {
        res.status(200).json({
            success: true,
            message: result
        })
    })
    .catch(err => {
        res.status(400).json({
            success: false,
            message: err
        })
    });
});

router.post('/', getUserId, async (req, res, next) => {
    const user = new User({
        _id: new mongo.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    
    const foundUser = await User.findOne({email: req.body.email}, (obj) => { return obj });
    if (foundUser === null) {
        user.save().then(result => {
            if (result._id) {
                res.status(201).json({
                    success: true,
                    message: result
                })     
            } else {
                res.status(400).json({
                    success: false
                })
            }
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: err
            })
        });
    } else {
        res.status(409).json({
            success: false,
            message: 'Email already exist'
        })
    }
});

router.patch('/:userId', getUserId, (req, res, next) => {
    const id = req.params.userId;

    User.update({_id: id}, req.body).exec()
    .then(result => {
        res.status(200).json({
            success: true,
            message: result
        })  
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: err
        })
    });
});

router.delete('/:userId', getUserId, (req, res, next) => {
    const id = req.params.userId;

    User.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            success: true,
            message: result
        })  
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: err
        })
    });
});
module.exports = router;