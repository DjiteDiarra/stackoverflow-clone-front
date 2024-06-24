<template>
  <div class="login-page">
    <h1>Connexion</h1>
    <form @submit.prevent="login" class="login-form">
      <input type="email" v-model="email" placeholder="Email" required class="input-field" />
      <input type="password" v-model="password" placeholder="Mot de passe" required class="input-field" />
      <div v-if="error" class="error-message">{{ error }}</div>
      <button type="submit" class="submit-button" :disabled="isLoading">
        <span v-if="isLoading">Chargement...</span>
        <span v-else>Connexion</span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.error = ''; // Réinitialiser les erreurs

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Vérifier la réponse du serveur
        if (response.data.access_token) {
          // Connexion réussie, rediriger vers la page d'accueil
          localStorage.setItem('access_token', response.data.access_token); // Stocker le token dans localStorage
          this.$router.push('/');
        } else {
          // Afficher une erreur si nécessaire
          this.error = 'Adresse email ou mot de passe incorrect';
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        this.error = 'Erreur de connexion';
      } finally {
        this.isLoading = false; // Réinitialiser l'état de chargement
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #42b983;
}

.submit-button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #1771f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #4706dd;
}

.error-message {
  color: #ff0000;
  margin-top: 5px;
}
</style>
