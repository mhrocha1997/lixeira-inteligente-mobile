import axios from 'axios';

const baseUrl = 'http://9286-131-196-79-103.ngrok.io';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;