import axios from 'axios';

const baseUrl = 'http://8e7e-131-196-78-178.ngrok.io';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;