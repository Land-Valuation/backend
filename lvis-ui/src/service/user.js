import {listUser, deleteOneUser} from '@/api/user';
import {HTTP_CODE} from '@//utils/constant';

export async function getListUser() {
  const response = await listUser();

  if (response.status === HTTP_CODE.SUCCESS) {
    const {data} = response.data;
    return data;
  }

  return [];
}

export async function deleteUser(id) {
  const response = await deleteOneUser(id);

  return response.status === HTTP_CODE.SUCCESS;
}