import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('http://localhost:6060/api/1.0/auth/login', {
                    email,
                    password,
                });
                //console.log(response.data);

                this.token = response.data.data.tokenSession;
                this.user = response.data.data.user;
                this.isAuthenticated = true;

                // Almacenar token en localStorage
                localStorage.setItem('token', this.token);
            } catch (error) {
                throw new Error('Login failed');
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        loadTokenFromLocalStorage() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                this.isAuthenticated = true;
            }
        },
    },
});
