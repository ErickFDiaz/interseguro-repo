const responseHandler = require('../helpers/handleResponse');
const matrixService = require('../services/matrixes');

const processMatrix = async (req, res) => {
    try {
        const { matrix } = req.body;
        const data = await matrixService.processMatrix(matrix);
        const responseCreated = responseHandler.success('Data matrix processed successfully', data);
        responseHandler.send(res, responseCreated);
    } catch (e) {
        const responseCreated = responseHandler.internalServerError(e.message);
        responseHandler.send(res, responseCreated);
    }
}

module.exports = { processMatrix }