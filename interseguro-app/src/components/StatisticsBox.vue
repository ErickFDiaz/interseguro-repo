<template>
    <v-card class="pa-4">
      <v-card-text v-if="statistics">
        <ul>
          <li><strong>Máximo:</strong> {{ statistics.max }}</li>
          <li><strong>Mínimo:</strong> {{ statistics.min }}</li>
          <li><strong>Promedio:</strong> {{ statistics.avg }}</li>
          <li><strong>Suma:</strong> {{ statistics.sum }}</li>
          <li><strong>Es Q Diagonal:</strong> {{ statistics.isQDiagonal ? 'Sí':'No' }}</li>
          <li><strong>Es R Diagonal:</strong> {{ statistics.isRDiagonal ? 'Sí':'No' }}</li>
        </ul>
      </v-card-text>
      <v-card-text v-else>
        <p>No statistics available.</p>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  const props = defineProps({
    statistics: Object
  });
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
  