<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-6" width="400">
      <v-card-title>Login</v-card-title>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          required
          outlined
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
          outlined
        ></v-text-field>
        <v-btn color="primary" type="submit" class="mt-4" block>Login</v-btn>
      </v-form>
      <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
    </v-card>
  </v-container>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  const email = ref('test@gmail.com');
  const password = ref('superpass123');
  const error = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      await authStore.login(email.value, password.value);
      router.push('/matrix');
    } catch (e) {
      error.value = 'Invalid credentials. Please try again.';
    }
  };
  </script>
  