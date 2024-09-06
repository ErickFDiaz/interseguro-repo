const isDiagonalMatrix = (matrix) => {
    return matrix.every((row, i) => row.every((val, j) => i === j || val === 0));
};

const calculateStats = ({ Q, R }) => {
    const allValues = [...Q.flat(), ...R.flat()];  // Aplanar las matrices para obtener todos los valores

    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const sum = allValues.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / allValues.length;

    return { max, min, avg, sum };
};

module.exports = { calculateStats, isDiagonalMatrix };
