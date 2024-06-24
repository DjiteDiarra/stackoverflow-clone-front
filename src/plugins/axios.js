import axios from 'axios';

axios.defaults.baseURL = 'http://votre-api-url';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

export default axios;
