import {HTTP_CODE} from "@/utils/constant.js";
import {listRole} from "@/api/role.js";

export async function getRoleList() {
    const response = await listRole();

    if (response.status === HTTP_CODE.SUCCESS) {
        const {data} = response.data;
        return data;
    }

    return [];
}