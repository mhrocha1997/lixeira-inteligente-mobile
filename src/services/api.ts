import axios from 'axios';

const baseUrl = 'http://346b-131-196-76-23.ngrok.io';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;