const axios = require('axios');
const { qrFactorization } = require('../helpers/qrFactorization');
const statsServiceUrl = process.env.STATS_SERVICE_URL;
const STATS_TOKEN = process.env.STATS_TOKEN;

const processMatrix = async (matrix) => {
  try {
    const { Q, R } = qrFactorization(matrix);
    const qrResult = { Q, R };

    const response = await axios.post(`${statsServiceUrl}/stats`, qrResult, {
      headers: {
        Authorization: STATS_TOKEN
      }
    }
    );
    // console.log(response.message)
    // Validar la respuesta de la API de estadísticas
    if (response.data && response.data.success) {
      return {Q,R,...response.data.data};
    } else {
      throw new Error('Invalid response from stats service.');
    }
  } catch (error) {
    throw new Error(`Error processing matrix: ${error.message}`);
  }
};

module.exports = { processMatrix };
