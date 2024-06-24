<template>
  <div class="register-page">
    <h1>Inscription</h1>
    <form @submit.prevent="register" class="register-form">
      <input type="text" v-model="name" placeholder="Nom" required class="input-field" />
      <input type="email" v-model="email" placeholder="Email" required class="input-field" />
      <input type="password" v-model="password" placeholder="Mot de passe" required class="input-field" />
      <input type="password" v-model="password_confirmation" placeholder="Confirmation du mot de passe" required class="input-field" />
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <button type="submit" class="submit-button" :disabled="isLoading">
        <span v-if="isLoading">Chargement...</span>
        <span v-else>S'inscrire</span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      successMessage: '',
      isLoading: false,
    };
  },
  methods: {
    async register() {
      this.error = ''; // Reset error message
      this.successMessage = ''; // Reset success message

      // Validation côté client
      if (this.password !== this.password_confirmation) {
        this.error = 'Les mots de passe ne correspondent pas.';
        return;
      }

      this.isLoading = true; // Set loading state
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });

        // Vérifiez la réponse du serveur ici
        if (response.data.success) {
          this.successMessage = 'Inscription réussie. Redirection vers la page de connexion...';
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          this.error = response.data.message || 'Une erreur s\'est produite lors de l\'inscription.';
        }
      } catch (error) {
        console.error('Error registering:', error);
        if (error.response) {
          this.error = error.response.data.message || 'Erreur du serveur lors de l\'inscription.';
        } else if (error.request) {
          this.error = 'Aucune réponse du serveur. Vérifiez votre connexion internet.';
        } else {
          this.error = 'Erreur lors de la configuration de la requête.';
        }
      } finally {
        this.isLoading = false; // Reset loading state
      }
    }
  }
};
</script>

<style scoped>
.register-page {
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

.register-form {
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

.success-message {
  color: #42b983;
  margin-top: 5px;
}
</style>
