var express = require('express');
var router = express.Router();

const message_api = require("../controllers/message.controller");

router.use('/', message_api);

module.exports = router;
