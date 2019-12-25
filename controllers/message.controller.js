const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const RESPONDER = require("../engineering/responder");

router.get('/messages', (req, res) => {
    Message.find()
    .then(message => {
        console.log("Message output", message);
        RESPONDER.response(res, 200, message)
    }).catch(err => {
        console.log("Error ==>",err);
        RESPONDER.response(res, 400, JSON.stringify({'message':err.message}));
    });
});

router.post('/messages', (req, res) => {
    Message.create({
        name: req.body.name,
        message: req.body.message
    }).then(message => {
        console.log("Message", message);
        res.io.emit('message', req.body);
        RESPONDER.response(res, 200, JSON.stringify({'message':'successfully sent'}));
    }).catch(err => {
        console.log("Error ==>",err);
        RESPONDER.response(res, 500, JSON.stringify({'message':err.message}));
    });
});

module.exports = router;