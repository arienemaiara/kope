import axios from 'axios';

const api = axios.create({
    baseURL: 'https://kope-api.herokuapp.com'
});

export default api;