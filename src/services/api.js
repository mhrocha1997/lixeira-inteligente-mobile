import axios from 'axios';

const api = axios.create({
    baseURL: 'http://15.228.21.150:443',
});

export default api;