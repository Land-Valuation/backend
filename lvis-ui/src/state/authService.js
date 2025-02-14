import axios from 'axios';
import { setAuthState, logout } from '@/state';
import {login, register} from "@/api/auth"

const realm = import.meta.env.VITE_REACT_APP_REALM_NAME;
const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;

export const loginUser = ({ username, password }) => async (dispatch) => {
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
    try {
        return await register(params);
    } catch (err) {
        throw err;
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logout());
    };
};

const getJwtPayload = (token) => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};