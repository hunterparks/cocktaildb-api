function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) {
    const errorCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(errorCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

module.exports = {
    notFound,
    errorHandler
}