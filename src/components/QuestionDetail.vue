<template>
  <div class="question-detail-page">
    <div v-if="error" class="error-message">
      <p>Erreur : {{ error }}</p>
    </div>
    <div v-else>
      <!-- Titre de la question -->
      <h1 class="question-title">{{ question.title }}</h1>

      <!-- Corps de la question -->
      <div class="question-body">
        <p>{{ question.body }}</p>
      </div>

      <!-- Section Réponses -->
      <div class="answers-section">
        <h2>Réponses</h2>

        <!-- Liste des réponses -->
        <ul class="answer-list">
          <li v-for="answer in question.answers" :key="answer.id" class="answer-item">
            <div class="answer-body">{{ answer.body }}</div>
          </li>
        </ul>

        <!-- Formulaire de réponse -->
        <div v-if="isAuthenticated" class="answer-form">
          <textarea v-model="newAnswer" placeholder="Votre réponse..." class="textarea-field"></textarea>
          <button @click="postAnswer" class="submit-button">Répondre</button>
        </div>
        <div v-else>
          <p>Pour répondre à cette question, veuillez vous connecter.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      question: {},
      newAnswer: '',
      error: null,
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('authToken');
    }
  },
  created() {
    this.fetchQuestion();
  },
  methods: {
    async fetchQuestion() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/questions/${this.$route.params.id}`);
        this.question = response.data;
      } catch (error) {
        console.error('Error fetching question:', error);
        this.error = 'Failed to load the question. Please try again later.';
      }
    },
    async postAnswer() {
      if (this.newAnswer.trim() === '') return;
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('http://127.0.0.1:8000/api/answers', {
          body: this.newAnswer,
          question_id: this.question.id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Vérifier le statut de la réponse et gérer en conséquence
        if (response.status === 201) {
          this.newAnswer = ''; // Réinitialiser le champ de réponse après l'envoi réussi
          this.fetchQuestion(); // Recharger la question pour inclure la nouvelle réponse
        } else {
          console.error('Failed to post answer:', response.data);
        }
      } catch (error) {
        console.error('Error posting answer:', error);
        this.error = 'Failed to post your answer. Please try again later.';
      }
    }
  }
};
</script>

<style scoped>
.question-detail-page {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.question-title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.question-body {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 30px;
}

.answers-section {
  margin-top: 30px;
}

h2 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 15px;
}

.answer-list {
  list-style-type: none;
  padding: 0;
}

.answer-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.answer-body {
  font-size: 1.1em;
  line-height: 1.5;
}

.answer-form {
  margin-top: 30px;
}

.textarea-field {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
  resize: vertical;
  min-height: 100px;
}

.textarea-field:focus {
  border-color: #42b983;
}

.submit-button {
  padding: 12px 24px;
  font-size: 1em;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #369b72;
}

.error-message {
  color: red;
  font-size: 1.2em;
  margin-bottom: 20px;
}
</style>
