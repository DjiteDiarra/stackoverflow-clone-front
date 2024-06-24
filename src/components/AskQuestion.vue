<template>
  <div class="ask-question-page">
    <h1>Poser une question</h1>
    <form @submit.prevent="askQuestion" class="ask-question-form">
      <input type="text" v-model="title" placeholder="Titre" required class="input-field" />
      <textarea v-model="body" placeholder="Détail de votre question" required class="textarea-field"></textarea>
      <button type="submit" class="submit-button">Poser la question</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      body: ''
    };
  },
  methods: {
    async askQuestion() {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/questions', {
          title: this.title,
          body: this.body
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Error asking question:', error);
      }
    }
  }
};
</script>

<style scoped>
.ask-question-page {
  font-family: Arial, sans-serif;
  max-width: 600px;
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

.ask-question-form {
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

.textarea-field {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
  resize: vertical;
  height: 150px;
}

.textarea-field:focus {
  border-color: #42b983;
}

.submit-button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #369b72;
}
</style>
