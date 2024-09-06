<template>
  <v-container fluid class="fill-height">
    <v-row>
      <!-- Columna izquierda -->
      <v-col cols="12" md="6">
        <!-- Cuadrícula para el formulario y las matrices -->
        <v-row class="same-size-grid">
          <!-- Formulario de matriz -->
          <v-col cols="12">
            <v-card class="pa-6 grid-item">
              <v-card-title>Ingrese una matriz de datos</v-card-title>
              <v-form @submit.prevent="submitMatrix">
                <v-row v-for="(row, rowIndex) in matrix" :key="rowIndex" class="mb-2">
                  <v-col v-for="(cell, cellIndex) in row" :key="cellIndex" cols="12" sm="4">
                    <v-text-field type="number" v-model="matrix[rowIndex][cellIndex]" outlined hide-details dense
                      required></v-text-field>
                  </v-col>
                </v-row>
                <v-btn color="primary" type="submit" block>Enviar Matriz</v-btn>
              </v-form>
              <v-alert v-if="response" :type="responseType" class="mt-4">{{ response }}</v-alert>
            </v-card>
          </v-col>

          <!-- Matrices Q y R -->
          <v-col cols="6">
            <v-card class="pa-6 grid-item">
              <MatrixDisplayBox :matrix="statistics?.Q" title="Matriz Q" />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="pa-6 grid-item">
              <MatrixDisplayBox :matrix="statistics?.R" title="Matriz R" />
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Columna derecha -->
      <v-col cols="12" md="6">
        <!-- Cuadrícula para estadísticas y gráficos -->
        <v-row class="same-size-grid">
          <!-- Estadísticas -->
          <v-col cols="12">
            <v-card class="pa-6 grid-item">
              <v-card-title>Estadisticas</v-card-title>
              <StatisticsBox :statistics="statistics" />
            </v-card>
          </v-col>

          <!-- Gráficos de estadísticas -->
          <v-col cols="12">
            <v-card class="pa-6 grid-item">
              <div class="charts-container">
                <StatisticsChart :statistics="statistics" />
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import StatisticsChart from './StatisticsChart.vue';
import StatisticsBox from './StatisticsBox.vue';
import MatrixDisplayBox from './MatrixDisplayBox.vue';

const matrix = ref([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);
const response = ref('');
const responseType = ref('success');
const statistics = ref(null);

const authStore = useAuthStore();

const roundStatistics = (data) => {
  const roundToFourDecimals = (value) => parseFloat(value.toFixed(4));

  return {
    ...data,
    max: roundToFourDecimals(data.max),
    min: roundToFourDecimals(data.min),
    avg: roundToFourDecimals(data.avg),
    sum: roundToFourDecimals(data.sum),
    Q: data.Q.map(row => row.map(cell => roundToFourDecimals(cell))),
    R: data.R.map(row => row.map(cell => roundToFourDecimals(cell)))
  };
};

const submitMatrix = async () => {
  try {
    const result = await axios.post(
      'http://localhost:6060/api/1.0/matrixes',
      { matrix: matrix.value },
      {
        headers: {
          authorization: `${authStore.token}`,
        },
      }
    );
    response.value = result.data.message;
    responseType.value = 'success';
    // Llamar a la función para redondear los datos de la API
    statistics.value = roundStatistics(result.data.data);

  } catch (error) {
    responseType.value = 'error';
    response.value = error.response?.data?.message || 'An error occurred';
  }
};
</script>

<!-- Estilos -->
<style scoped>
.same-size-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.grid-item {
  height: 100%;
  /* Asegura que todos los contenedores tengan el mismo tamaño */
}

.charts-container {
  max-height: 400px;
  overflow-y: auto;
  /* Scroll solo para el contenido de gráficos */
}
</style>
