import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://kope-api.herokuapp.com'
    baseURL: 'http://192.168.0.7:3333'
});

export default api;