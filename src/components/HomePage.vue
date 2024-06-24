<template>
  <div class="home-page">
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand">StackOverflow Clone</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="$store.state.isAuthenticated">
              <router-link to="/ask" class="nav-link">Poser une question</router-link>
            </li>
            <li class="nav-item" v-if="!$store.state.isAuthenticated">
              <router-link to="/login" class="nav-link">Connexion</router-link>
            </li>
            <li class="nav-item" v-if="!$store.state.isAuthenticated">
              <router-link to="/register" class="nav-link">Inscription</router-link>
            </li>
            <li class="nav-item" v-if="$store.state.isAuthenticated">
              <button class="nav-link btn btn-link" @click="logout">Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu de la page d'accueil -->
    <div class="container mt-4">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Rechercher..." aria-label="Rechercher..." aria-describedby="button-addon2">
        <button class="btn btn-primary" type="button" @click="search">Rechercher</button>
      </div>
      <p>Bienvenue sur StackOverflow Clone. Posez des questions, trouvez des réponses et partagez vos connaissances.</p>

      <!-- Affichage des questions -->
      <div v-if="questions.length > 0">
        <h2 class="mt-4">Dernières Questions</h2>
        <div class="card mt-3" v-for="question in questions" :key="question.id">
          <div class="card-body">
            <h5 class="card-title">{{ question.title }}</h5>
            <p class="card-text">{{ question.body }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Posée par {{ question.user.name }} le {{ formatDate(question.created_at) }}</small>
              <router-link :to="'/questions/' + question.id" class="btn btn-primary">Voir plus</router-link>
            </div>
          </div>
          <div class="card-footer text-muted">
            {{ question.answers_count }} Réponses
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mt-3">Aucune question trouvée.</p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2024 StackOverflow Clone. Tous droits réservés.</span>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      questions: []
    };
  },
  mounted() {
    this.fetchQuestions();
    this.$store.dispatch('checkAuthentication');
  },
  methods: {
    fetchQuestions() {
      axios.get('http://127.0.0.1:8000/api/questions')
        .then(response => {
          this.questions = response.data;
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    },
    search() {
      if (this.searchQuery) {
        axios.get(`http://127.0.0.1:8000/api/search?query=${this.searchQuery}`)
          .then(response => {
            this.questions = response.data;
          })
          .catch(error => {
            console.error('Error searching questions:', error);
          });
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
