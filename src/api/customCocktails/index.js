const express = require('express');
const utility = require('../../utility');

const router = express.Router();

router.get('/', (req, res, next) => {
    return res.json(utility.getCustomCocktails());
});

router.post('/', (req, res, next) => {
    const name = req.body.name;
    if (!name || name.length === 0) {
        const error = new Error('A name must be provided for custom cocktails');
        return next(error);
    }
    const ingredients = req.body.ingredients;
    if (!Array.isArray(ingredients)) {
        const error = new Error('Ingredients for a custom cocktail must be an array of strings');
        return next(error);
    }
    res.status(201);
    return res.json(utility.createCustomCocktails(name, ingredients));
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        const error = new Error(`Invalid custom cocktail id: '${id}'`);
        return next(error);
    }
    return res.json(utility.getCustomCocktails(+id));
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        const error = new Error(`Invalid custom cocktail id: '${id}'`);
        return next(error);
    }
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    if (ingredients && !Array.isArray(ingredients)) {
        const error = new Error('Ingredients for a custom cocktail must be an array of strings');
        return next(error);
    }
    return res.json(utility.updateCustomCocktails(+id, name, ingredients));
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        const error = new Error(`Invalid custom cocktail id: '${id}'`);
        return next(error);
    }
    return res.json(utility.deleteCustomCocktails(+id));
})

module.exports = router;