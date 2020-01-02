import axios from 'axios';

const api = axios.create({
  baseURL: 'http://host:port/',
});

export default api;
