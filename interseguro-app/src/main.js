import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Importa Vuetify y los estilos
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos base de Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Importa los íconos de Material Design (opcional)

// Importa componentes y directivas de Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Crea la instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Usa Vuetify en la aplicación
app.use(vuetify);

app.mount('#app');
