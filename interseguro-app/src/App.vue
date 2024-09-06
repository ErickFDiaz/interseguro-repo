<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Matrix App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!authStore.isAuthenticated" to="/login" text>Login</v-btn>
      <v-btn v-if="authStore.isAuthenticated" @click="logout" text>Logout</v-btn>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  // Redirigir al login después del logout
  router.push('/login');
};
</script>
