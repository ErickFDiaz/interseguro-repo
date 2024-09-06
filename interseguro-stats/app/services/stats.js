const { calculateStats, isDiagonalMatrix } = require('../helpers/statsHelper');

const processStats = ({ Q, R }) => {

  const stats = calculateStats({ Q, R });

  const isQDiagonal = isDiagonalMatrix(Q);
  const isRDiagonal = isDiagonalMatrix(R);

  return { ...stats, isQDiagonal, isRDiagonal };
};

module.exports = { processStats };
