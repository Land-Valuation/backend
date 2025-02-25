import apiClient from '@/utils/axiosUserService';

export const listGroup = async () => {
  return await apiClient.get(`/user-api/groups`);
};

export const createGroup = async (params) => {
  return await apiClient.post(`/user-api/groups`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const createChildGroup = async (params, parentId) => {
  return await apiClient.post(`/user-api/groups/child/${parentId}`, params, {
    headers: {'Content-Type': 'application/json'},
  });
}

export const updateGroup = async (params, id) => {
  return await apiClient.put(`/user-api/groups/${id}`, params, {
    headers: {'Content-Type': 'application/json'},
  });
};

export const deleteGroup = async (id) => {
  return await apiClient.delete(`/user-api/groups/${id}`);
};

export const getMembers = async (id) => {
  return await apiClient.get(`/user-api/groups/members/${id}`);
};