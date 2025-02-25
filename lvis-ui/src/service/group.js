import {listGroup} from '@/api/group';
import {HTTP_CODE} from '@/utils/constant';

export async function getListGroup(keepBaseData = false) {
  const response = await listGroup();

  if (response.status === HTTP_CODE.SUCCESS) {
    if (keepBaseData) {
      return response;
    } else {
      const { data } = response.data;
      return flattenGroups(data);
    }
  }

  return [];
}


function flattenGroups(groups, level = 0) {
  let result = [];

  for (const group of groups) {
    result.push({
      id: group.id,
      name: `${'-'.repeat(level)} ${group.name}`,
      path: group.path,
      access: group.access
    });

    if (group.subGroups && group.subGroups.length > 0) {
      result = result.concat(flattenGroups(group.subGroups, level + 1));
    }
  }

  return result;
}