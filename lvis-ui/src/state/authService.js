import { setAuthState, logout } from '@/state';
import {login, register} from "@/api/auth"
const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;

export const loginUser = ({ username, password }) => async (dispatch) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await login({
            client_id: clientId,
            username,
            password,
            grant_type: 'password',
            scope: 'openid profile email',
        });

        const token = response.data.access_token;
        const payload = getJwtPayload(token);

        dispatch(setAuthState({
            isAuthenticated: true,
            token,
            user: payload,
        }));

        return { token, payload };
    } catch (err) {
        throw err;
    }
};

export const registerUser = async (params) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await register(params);
    } catch (err) {
        throw err;
    }
}

export const logoutUser = (navigate) => {
    return (dispatch) => {
        dispatch(logout());
        navigate("/home");
    };
};

const getJwtPayload = (token) => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};