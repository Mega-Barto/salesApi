const createError = require('http-errors');

module.exports.Response = {
    success: (res, status = "200", message = "Alguz", body = {}) => {
        res.status(status).json({ message, body })
    },
    failed: (res, error = null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({ message });
    }
}