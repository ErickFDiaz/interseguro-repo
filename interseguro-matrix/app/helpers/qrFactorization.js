const math = require('mathjs');

const qrFactorization = (matrix) => {
    const { Q, R } = math.qr(matrix);
    return { Q, R };
}

module.exports = { qrFactorization }