import axios from 'axios';

const api = axios.create({
    baseURL: 'http://0894f5b39616.ngrok.io',
    headers: {'X-Custom-Header': 'foobar'}
});

export default api;