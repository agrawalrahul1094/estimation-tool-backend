import { getUserId } from "../common/common";
const multer = require("multer");
const fs = require("fs");
const express = require('express');
const router = express.Router();
const Content = require('../models/contentDataModel');
const mongo = require('mongoose');

router.post('/', getUserId,  multer({dest: "./uploads/"}).array("uploads", 12), async (req, res, next) => {
    // console.log(req.body)
    // var fileInfo = [];
    // for(var i = 0; i < req.file.length; i++) {
    //     console.log(req.file[i]);
    //     // fileInfo.push({
    //     //     "originalName": req.files[i].originalName,
    //     //     "size": req.files[i].size,
    //     //     "b64": new Buffer(fs.readFileSync(req.files[i].path)).toString("base64")
    //     // });
    //     // fs.unlink(req.files[i].path);
    // }
    // res.json({
    //     message: req.body
    // });
    const contentDataRequest = new Content({
        _id: new mongo.Types.ObjectId(),
        createRequestID: req.body.createRequestID,
        content: req.body.content
    });
    
    const foundContent = await Content.findOne({createRequestID: req.body.createRequestID}, (obj) => { return obj });
    
    if (foundContent === null) {
        contentDataRequest.save().then(result => {
            res.json({
                success: true,
                message: result
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: err
            })
        })
    } else {
        Content.update({createRequestID: req.body.createRequestID}, req.body).exec().then(result => {
            res.json({
                success: true,
                message: result
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: err
            })
        })
    }
});

router.get('/:contentId', getUserId, async (req, res, next) => {
    const id = req.params.contentId;
    const foundContent = await Content.findOne({createRequestID: id}, (obj) => { return obj });
    if (foundContent === null) {
        res.json({
            success: false,
            message: {}
        })
    } else {
        res.json({
            success: true,
            message: foundContent
        })
    }
});

module.exports = router;