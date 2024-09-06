<template>
  <div>
    <h2>Gráficos</h2>
    <!-- Contenedor scrolleable -->
    <div class="charts-container">
      <canvas id="barChart" v-if="statistics"></canvas>

      <canvas id="lineChartQ" class="mt-4" v-if="statistics?.Q"></canvas>
      <canvas id="lineChartR" class="mt-4" v-if="statistics?.R"></canvas>

      <canvas id="histogramChartQ" class="mt-4" v-if="statistics?.Q"></canvas>
    </div>

    <p v-if="!statistics">No hay datos disponisbles aún.</p>
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';

// Registrar todos los elementos de Chart.js
Chart.register(...registerables);

const props = defineProps({
  statistics: Object
});

// Variables para almacenar las instancias de los gráficos
let barChartInstance = null;
let lineChartQInstance = null;
let lineChartRInstance = null;
let histogramChartQInstance = null;

// Función para destruir los gráficos existentes (si existen)
const destroyCharts = () => {
  if (barChartInstance) barChartInstance.destroy();
  if (lineChartQInstance) lineChartQInstance.destroy();
  if (lineChartRInstance) lineChartRInstance.destroy();
  if (histogramChartQInstance) histogramChartQInstance.destroy();
};

// Crear los gráficos al montar el componente, si statistics no es null
onMounted(() => {
  if (props.statistics) {
    nextTick(() => {
      createCharts();
    });
  }
});

// Observar cambios en las estadísticas y actualizar los gráficos
watch(() => props.statistics, (newStats) => {
  destroyCharts();
  if (newStats) {
    nextTick(() => {
      createCharts();
    });
  }
}, { deep: true });

const createCharts = () => {
  createBarChart();
  createLineChart('lineChartQ', props.statistics.Q, 'Matrix Q');
  createLineChart('lineChartR', props.statistics.R, 'Matrix R');
  createHistogramChart(props.statistics.Q);
};

const createBarChart = () => {
  if (!props.statistics) return;

  const ctx = document.getElementById('barChart');
  if (!ctx) return; // Asegurarse de que el canvas está disponible

  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Max', 'Min', 'Avg', 'Sum'],
      datasets: [
        {
          label: 'Statistics',
          data: [props.statistics.max, props.statistics.min, props.statistics.avg, props.statistics.sum],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350']
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

const createLineChart = (chartId, matrixData, label) => {
  if (!matrixData) return;

  const ctx = document.getElementById(chartId);
  if (!ctx) return; // Asegurarse de que el canvas está disponible

  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: matrixData.map((_, index) => `Row ${index + 1}`),
      datasets: matrixData.map((row, index) => ({
        label: `Column ${index + 1}`,
        data: row,
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        fill: false
      }))
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  if (chartId === 'lineChartQ') lineChartQInstance = chartInstance;
  if (chartId === 'lineChartR') lineChartRInstance = chartInstance;
};

const createHistogramChart = (matrixData) => {
  if (!matrixData) return;

  const ctx = document.getElementById('histogramChartQ');
  if (!ctx) return; // Asegurarse de que el canvas está disponible

  const values = matrixData.flat();
  const bins = 10;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const binSize = (maxValue - minValue) / bins;
  const histogramData = Array(bins).fill(0);

  values.forEach(value => {
    const binIndex = Math.min(Math.floor((value - minValue) / binSize), bins - 1);
    histogramData[binIndex]++;
  });

  histogramChartQInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: histogramData.map((_, index) => `${(minValue + index * binSize).toFixed(2)} - ${(minValue + (index + 1) * binSize).toFixed(2)}`),
      datasets: [
        {
          label: 'Frequency',
          data: histogramData,
          backgroundColor: '#66BB6A'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
</script>

<!-- Estilos -->
<style scoped>
canvas {
  max-width: 100%;
}

</style>
