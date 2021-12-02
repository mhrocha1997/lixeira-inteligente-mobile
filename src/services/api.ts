import axios from 'axios';

const baseUrl = 'http://bcaa-131-196-79-47.ngrok.io';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;