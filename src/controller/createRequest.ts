import { getUserId } from "../common/common";
const express = require('express');
const router = express.Router();
const CreateRequest = require('../models/createRequest');
const mongo = require('mongoose');

router.post('/', getUserId, async (req, res, next) => {
    
    const createRequest = new CreateRequest({
        _id: new mongo.Types.ObjectId(),
        clientName: req.body.clientName,
        eventName: req.body.eventName,
        projectID: req.body.projectID
    });
    
    createRequest.save().then(result => {
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
});

module.exports = router;