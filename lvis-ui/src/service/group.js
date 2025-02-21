import {listGroup} from '@/api/group';
import {HTTP_CODE} from '@//utils/constant';

export async function getListGroup() {
  const response = await listGroup();

  if (response.status === HTTP_CODE.SUCCESS) {
    const {data} = response.data;
    return data;
  }

  return [];
}