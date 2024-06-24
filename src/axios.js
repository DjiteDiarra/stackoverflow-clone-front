// src/axios.js
import axios from 'axios';
import store from './store';

axios.defaults.baseURL = 'http://votre-api-url';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

axios.interceptors.response.use(response => {
  return response;
}, error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return store.dispatch('refreshToken').then(() => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.accessToken;
      originalRequest.headers['Authorization'] = 'Bearer ' + store.state.accessToken;
      return axios(originalRequest);
    });
  }
  return Promise.reject(error);
});

export default axios;
