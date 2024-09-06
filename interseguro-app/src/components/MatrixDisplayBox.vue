<template>
    <v-card class="pa-4">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <table>
          <tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  const props = defineProps({
    matrix: Array,
    title: String
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  </style>
  