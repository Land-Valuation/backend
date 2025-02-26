import axios from 'axios';
import {USER_SERVICE_URL} from '@/utils/constant';
import store from '@/state/store';
import {logoutUser} from '@/state/authService.js';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const apiClient = axios.create({
  baseURL: USER_SERVICE_URL,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
    (config) => {
      try {
        const persistedData = localStorage.getItem('persist:root');
        if (!persistedData) {
          return config;
        }

        const root = JSON.parse(persistedData);
        if (!root || !root.isAuthenticated) {
          return config;
        }

        const auth = root.isAuthenticated === true || root.isAuthenticated ===
            'true';
        const token = JSON.parse(root?.token) || null;

        if (auth && token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    response => response,
    async error => {

      if (error.response.status === 401) {
        const persistedData = localStorage.getItem('persist:root');
        const root = JSON.parse(persistedData);

        localStorage.setItem('persist:root', JSON.stringify({
          ...root,
          isAuthenticated: false,
          token: null,
          user: null
        }));

        location.href = '/home';
      }

      return Promise.reject(error);
    },
);

export default apiClient;