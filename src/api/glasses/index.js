const express = require('express');
const utility = require('../../utility');

const router = express.Router();

router.get('/', async (req, res, next) => {
    return await utility.callTheCocktailDbApi('/list.php?g=list', res, next);
});

module.exports = router;