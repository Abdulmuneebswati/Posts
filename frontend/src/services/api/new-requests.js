import axios from 'axios';
import { store } from '../../store/redux/store';

const newRequest = axios.create({
  baseURL: 'http://localhost:500/',
});

newRequest.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
