import apiClient from '@/utils/axiosUserService';

export const listRole = async () => {
    return await apiClient.get(`/user-api/role`);
};