import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ahh1sf6o9d.execute-api.us-east-1.amazonaws.com/dev'
});

export default api;
