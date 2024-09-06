const { processStats } = require('../services/stats');
const responseHandler = require('../helpers/handleResponse');


const getStats = (req, res) => {
  try {
    const { Q, R } = req.body;

    if (!Q || !R) {
      const response = responseHandler.badRequestError('Both Q and R matrices are required');
      return responseHandler.send(res, response);
    }

    const stats = processStats({ Q, R });

    const response = responseHandler.success('Statistics calculated successfully', stats);
    responseHandler.send(res, response);
  } catch (error) {
    const response = responseHandler.internalServerError(`Error calculating stats: ${error.message}`);
    responseHandler.send(res, response);
  }
};

module.exports = { getStats };
