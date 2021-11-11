import axios from 'axios';

const baseUrl = 'http://23ae-131-196-79-124.ngrok.io';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;