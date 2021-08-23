const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const cocktails = require('./cocktails');
const ingredients = require('./ingredients');
const categories = require('./categories');
const glasses = require('./glasses');
const alcoholicFilters = require('./alcoholicFilters');
const customCocktails = require('./customCocktails');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: '👋 add a /docs to your request for more information'
    })
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/cocktails', cocktails);
router.use('/ingredients', ingredients);
router.use('/categories', categories);
router.use('/glasses', glasses);
router.use('/alcoholic_filters', alcoholicFilters);
router.use(`/custom_cocktails`, customCocktails);

module.exports = router;