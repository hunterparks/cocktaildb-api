const express = require('express');
const axios = require('axios');
const paginationMiddleware = require('express-pagination-middleware');
const utility = require('../../utility');

const userPaginationMiddleware = paginationMiddleware({
    sort: { 
        validKeys: [ 'strDrink' ]
    },
    limit: {
        min: 10,
        max: 100
    }
});

const router = express.Router();

const BASE_DB_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

router.get('/', userPaginationMiddleware, async (req, res, next) => {
    const limit = req.pagination.limit;
    const skip = req.pagination.skip;

    const firstLetterQuery = req.query.firstLetter;
    const firstLetterRegex = /^[A-Za-z]$/;
    if (firstLetterQuery) {
        if (!firstLetterRegex.test(firstLetterQuery)) {
            const error = new Error('Filter letter must be a single A-Z or a-z only');
            return next(error);
        }try {
            const { data } = await axios.get(`${BASE_DB_URL}/search.php?f=${firstLetterQuery}`);
            if (!data.drinks || data.drinks.length <= skip) return res.json({ 'drinks': [] });
            data.drinks.splice(0, skip);
            return res.json({ 'drinks': data.drinks.slice(0, limit) });
        } catch (error) {
            return next(error);
        }
    }
    
    const typeFilter = req.query.type;
    if (typeFilter) {
        try {
            const { data } = await axios.get(`${BASE_DB_URL}/filter.php?a=${typeFilter}`);
            if (!data.drinks || data.drinks.length <= skip) return res.json({ 'drinks': [] });
            data.drinks.splice(0, skip);
            return res.json({ 'drinks': data.drinks.slice(0, limit) });
        } catch (error) {
            return next(error);
        }
    }

    const categoryFilter = req.query.category;
    if (categoryFilter) {
        try {
            const { data } = await axios.get(`${BASE_DB_URL}/filter.php?c=${categoryFilter}`);
            if (!data.drinks || data.drinks.length <= skip) return res.json({ 'drinks': [] });
            data.drinks.splice(0, skip);
            return res.json({ 'drinks': data.drinks.slice(0, limit) });
        } catch (error) {
            return next(error);
        }
    }

    const glassFilter = req.query.glass;
    if (glassFilter) {
        try {
            const { data } = await axios.get(`${BASE_DB_URL}/filter.php?g=${glassFilter}`);
            if (!data.drinks || data.drinks.length <= skip) return res.json({ 'drinks': [] });
            data.drinks.splice(0, skip);
            return res.json({ 'drinks': data.drinks.slice(0, limit) });
        } catch (error) {
            return next(error);
        }
    }
    
    const ingredientsFilter = req.query.ingredients;
    if (ingredientsFilter) {
        const ingredientsFilterSplit = ingredientsFilter.split(',');
        const numberOfIngredients = ingredientsFilterSplit.length;
        let completeDrinks = { "drinks": [] };
        let drinkIdCounts = [];
        for (let i = 0; i < numberOfIngredients; i++) {
            const ingredient = ingredientsFilterSplit[i];
            try {
                const { data } = await axios.get(`${BASE_DB_URL}/filter.php?i=${ingredient}`);
                data.drinks.map(drink => +drink.idDrink).forEach(drinkId => {
                    if (!drinkIdCounts[drinkId]) {
                        drinkIdCounts[drinkId] = 1;
                    } else {
                        drinkIdCounts[drinkId]++;
                    }
                });
                completeDrinks.drinks = utility.mergeWithoutDupes(completeDrinks.drinks, data.drinks);
            } catch (error) {
                return next(error);
            }
        }

        let drinkCountIndexes = [];
        drinkIdCounts.forEach((drinkCount, index) => {
            if (drinkCount === numberOfIngredients) {
                drinkCountIndexes.push(index);
            }
        });

        const filteredDrinks = { 'drinks': completeDrinks.drinks.filter(drink => drinkCountIndexes.includes(+drink.idDrink)) };

        if (filteredDrinks.drinks.length <= skip) return res.json({ 'drinks': [] });
        filteredDrinks.drinks.splice(0, skip);
        return res.json({ 'drinks': filteredDrinks.drinks.slice(0, limit) });     
    }

    const query = req.query.q;
    if (!query) {
        const error = new Error('Please provide a name to search with');
        return next(error);
    }
    try {
        const { data } = await axios.get(`${BASE_DB_URL}/search.php?s=${query}`);
        return res.json(data);
    } catch (error) {
        return next(error);
    }
});

router.get(`/random`, async (req, res, next) => {
    return await utility.callTheCocktailDbApi('/random.php', res, next);
});

router.get(`/random/:count`, async (req, res, next) => {
    let count = req.params.count;
    if (!count || isNaN(count)) {
        const error = new Error(`Invalid random count: '${count}'`);
        return next(error);
    }
    let randomDrinks = { "drinks": [] };
    if (count > 100) {
        count = 100;
    }
    for (let i = 0; i < count; i++) {
        try {
            const { data } = await axios.get(`${BASE_DB_URL}/random.php`);
            const newDrink = data.drinks[0];
            randomDrinks.drinks.push(newDrink);
        } catch (error) {
            return next(error);
        }
    }
    return res.json(randomDrinks);
});

router.get(`/:id`, async (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        const error = new Error(`Invalid cocktail id: '${id}'`);
        return next(error);
    }
    return await utility.callTheCocktailDbApi(`/lookup.php?i=${id}`, res, next);
});

router.get(`/:id/preview`, async (req, res, next) => {
    const requestUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`.replace('/preview', '');
    try {
        const { data } = await axios.get(requestUrl);
        const rawImageUrl = data.drinks[0].strDrinkThumb;
        const lastPeriod = rawImageUrl.lastIndexOf('.');
        const extension = rawImageUrl.slice(lastPeriod + 1);
        const imageFile = `${__dirname}/temp.${extension}`;
        await utility.downloadImage(`${rawImageUrl}/preview`, imageFile);
        return res.sendFile(imageFile);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;