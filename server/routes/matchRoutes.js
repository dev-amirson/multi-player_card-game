const express = require('express');
const router = express.Router();
const match = require('../controllers/matchController');

router.post('/', match.postMatch)
router.get('/getReddisMatch', match.getReddisMatch)
router.post('/startMatch', match.startMatch)


module.exports = router;
