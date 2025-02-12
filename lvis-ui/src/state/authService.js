import axios from 'axios';
import { setAuthState, logout } from '@/state';

const url = import.meta.env.VITE_REACT_APP_KEYCLOAK_URL;
const realm = import.meta.env.VITE_REACT_APP_REALM_NAME;
const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;

export const loginUser = ({ username, password }) => async (dispatch) => {
    try {
        const response = await axios.post(`${url}realms/test/protocol/openid-connect/token`, {
            client_id: clientId,
            username,
            password,
            grant_type: 'password',
            scope: 'openid profile email',
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
        console.error("Login failed:", err);
        throw err;
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logout());
    };
};
const getJwtPayload = (token) => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};