const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: '🍺 Welcome to The Cocktail DB wrapper API 🥂'
    });
});

app.use('/api/json/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;