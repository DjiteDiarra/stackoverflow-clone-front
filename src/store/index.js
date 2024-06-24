// store/index.js

import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      isAuthenticated: false
    };
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    }
  },
  actions: {
    async checkAuthentication({ commit }) {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/check-auth');
          commit('setAuthentication', response.data.authenticated);
        } catch (error) {
          console.error('Error checking authentication:', error);
          commit('setAuthentication', false);
          localStorage.removeItem('authToken');
        }
      } else {
        commit('setAuthentication', false);
      }
    },
    async logout({ commit }) {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
      commit('setAuthentication', false);
    }
  }
});

export default store;
