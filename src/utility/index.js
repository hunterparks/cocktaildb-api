const fs = require('fs');
const axios = require("axios");

const BASE_URL = 'https://www.thecocktaildb.com';
const BASE_URL_API = `${BASE_URL}/api/json/v1/1`;
const DATABASE_LOCATION = `${__dirname}/../data/customCocktails.json`;

async function callTheCocktailDbApi(extraRoute, res, next) {
    try {
        const { data } = await axios.get(`${BASE_URL_API}${extraRoute}`);
        return res.json(data);
    } catch (error) {
        return next(error);
    }
}

async function downloadImage(imageUrl, imagePath) {
    try {
        const { data } = await axios.get(imageUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(imagePath);
        data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch {
        return new Error('Unable to download image');
    }
}

function mergeWithoutDupes(A, B) {
    let ids = new Set(A.map(a => a.idDrink));
    return [...A, ...B.filter(b => !ids.has(b.idDrink))];
}

// "Database" Utilities
function readDatabase() {
    return JSON.parse(fs.readFileSync(DATABASE_LOCATION));
}

function writeDatabase(data) {
    fs.writeFileSync(DATABASE_LOCATION, data);
}

function createCustomCocktails(name, ingredients) {
    let data = readDatabase();
    const nextIndex = data.nextIndex;
    data.nextIndex++;
    const newCocktail = {
        id: nextIndex,
        name,
        ingredients
    };
    data.customCocktails.push(newCocktail);
    writeDatabase(JSON.stringify(data));
    return getCustomCocktails(nextIndex);
}

function getCustomCocktails(id = null) {
    const data = readDatabase();
    if (id) {
        return data.customCocktails.filter(cocktail => cocktail.id === id);
    }
    return data.customCocktails;
}

function updateCustomCocktails(id, name, ingredients) {
    let data = readDatabase();
    const oldCocktail = data.customCocktails.filter(cocktail => cocktail.id === id)[0];
    data.customCocktails = data.customCocktails.filter(cocktails => cocktails.id !== id);
    const newCocktail = {
        id: oldCocktail.id,
        name: name || oldCocktail.name,
        ingredients: ingredients || oldCocktail.ingredients
    };
    data.customCocktails.push(newCocktail);
    writeDatabase(JSON.stringify(data));
    return getCustomCocktails(newCocktail.id);
}

function deleteCustomCocktails(id) {
    let data = readDatabase();
    data.customCocktails = data.customCocktails.filter(cocktails => cocktails.id !== id);
    writeDatabase(JSON.stringify(data));
    return getCustomCocktails(id);
}

module.exports = {
    callTheCocktailDbApi,
    downloadImage,
    mergeWithoutDupes,
    createCustomCocktails,
    getCustomCocktails,
    updateCustomCocktails,
    deleteCustomCocktails
};