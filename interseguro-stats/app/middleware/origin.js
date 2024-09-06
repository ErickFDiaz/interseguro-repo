const responseHandler = require('../helpers/handleResponse');
const TOKEN_STATIC = process.env.TOKEN_STATIC

const checkOrigin = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            const response = responseHandler.forbiddenError('Authorization header missing');
            return responseHandler.send(res, response);
        }
        const token = req.headers.authorization.split(' ').pop();
        if (token === TOKEN_STATIC) {
            next();
        } else {
            const response = responseHandler.forbiddenError('You do not have permission to access this resource');
            responseHandler.send(res, response);
        }
    } catch (e) {
        const response = responseHandler.internalServerError('Error processing the token');
        responseHandler.send(res, response);
    }
};

module.exports = checkOrigin;