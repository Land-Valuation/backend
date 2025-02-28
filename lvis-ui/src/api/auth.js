import axios from 'axios';
import {BASE_URL, USER_SERVICE_URL} from '@/utils/constant';

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