import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_KEYCLOAK_URL;
const USER_SERVICE_URL = import.meta.env.VITE_REACT_APP_USER_SERVICE_URL;

export const login = async (params) => {
  return await axios.post(
      `${BASE_URL}/realms/test/protocol/openid-connect/token`, params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      });
};

export const register = async (params) => {
  return await axios.post(`${USER_SERVICE_URL}/user-api/users`, params, {
    headers: {'Content-Type': 'application/json'},
  })
}