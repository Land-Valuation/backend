import apiClient from '@/utils/axiosUserService';

export const listUser = async () => {
  return await apiClient.get(`/user-api/users`);
};

export const getUser = async (userId) => {
  return await apiClient.get(`/user-api/users/${userId}`);
}

export const createUser = async (params) => {
  return await apiClient.post(`/user-api/users/create-user`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const updateUser = async (params, id) => {
  return await apiClient.put(`/user-api/users/${id}`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const updateProfile = async (params) => {
  return await apiClient.put(`/user-api/users/change-profile`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const changePassword = async (params) => {
  return await apiClient.put(`/user-api/users/change-password`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const deleteOneUser = async (id) => {
  return await apiClient.delete(`/user-api/users/${id}`);
};