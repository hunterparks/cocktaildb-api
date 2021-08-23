const express = require('express');
const axios = require('axios');
const utility = require('../../utility');

const router = express.Router();

const BASE_DB_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const BASE_IMAGE_URL = 'https://www.thecocktaildb.com/images/ingredients';

router.get('/', async (req, res, next) => {
    if (Object.entries(req.query).length === 0) {
        return await utility.callTheCocktailDbApi('/list.php?i=list', res, next);
    }

    const query = req.query.q;
    if (!query) {
        const error = new Error('Please provide a name to search with');
        return next(error);
    }
    return await utility.callTheCocktailDbApi(`/search.php?i=${query}`, res, next);
});

router.get(`/:id`, async (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        const error = new Error(`Invalid ingredient id: '${id}'`);
        return next(error);
    }
    return await utility.callTheCocktailDbApi(`/lookup.php?iid=${id}`, res, next);
});

router.get(`/:id/preview`, async (req, res, next) => {
    const requestUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`.replace('/preview', '');
    try {
        const { data } = await axios.get(requestUrl);
        const rawImageUrl = `${BASE_IMAGE_URL}/${data.ingredients[0].strIngredient}.png`;
        const lastPeriod = rawImageUrl.lastIndexOf('.');
        const extension = rawImageUrl.slice(lastPeriod + 1);
        const imageFile = `${__dirname}/temp.${extension}`;
        await utility.downloadImage(rawImageUrl, imageFile);
        return res.sendFile(imageFile);
    } catch (error) {
        return next(error);
    }
});

router.get(`/:id/preview/small`, async (req, res, next) => {
    const requestUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`.replace('/preview/small', '');
    try {
        const { data } = await axios.get(requestUrl);
        const rawImageUrl = `${BASE_IMAGE_URL}/${data.ingredients[0].strIngredient}-small.png`;
        const lastPeriod = rawImageUrl.lastIndexOf('.');
        const extension = rawImageUrl.slice(lastPeriod + 1);
        const imageFile = `${__dirname}/temp.${extension}`;
        await utility.downloadImage(rawImageUrl, imageFile);
        return res.sendFile(imageFile);
    } catch (error) {
        return next(error);
    }
});

router.get(`/:id/preview/medium`, async (req, res, next) => {
    const requestUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`.replace('/preview/medium', '');
    try {
        const { data } = await axios.get(requestUrl);
        const rawImageUrl = `${BASE_IMAGE_URL}/${data.ingredients[0].strIngredient}-medium.png`;
        const lastPeriod = rawImageUrl.lastIndexOf('.');
        const extension = rawImageUrl.slice(lastPeriod + 1);
        const imageFile = `${__dirname}/temp.${extension}`;
        await utility.downloadImage(rawImageUrl, imageFile);
        return res.sendFile(imageFile);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;