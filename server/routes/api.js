const express = require('express');
const router = express.Router();
const fortuneController = require('../controller/fortuneController');

router.get('/fortune', fortuneController.getFortune);

module.exports = router;      