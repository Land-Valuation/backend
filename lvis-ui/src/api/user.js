import apiClient from '@/utils/axiosUserService';

export const listUser = async () => {
  return await apiClient.get(`/user-api/users`);
};

export const createUser = async (params) => {
  return await apiClient.post(`/user-api/users/create-user`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const updateUser = async (params) => {
  return await apiClient.put(`/user-api/users`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const deleteOneUser = async (id) => {
  return await apiClient.delete(`/user-api/users/${id}`);
};