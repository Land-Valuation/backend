import axios from 'axios';
import {USER_SERVICE_URL} from "@/utils/constant"


const apiClient = axios.create({
  baseURL: USER_SERVICE_URL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 30000
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

        const auth = root.isAuthenticated === true || root.isAuthenticated === 'true'
        const token = JSON.parse(root?.token) || null;

        if (auth && token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default apiClient;