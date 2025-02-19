import Keycloak from "keycloak-js";
import { selectIsAuthenticated, selectUser, selectToken } from "@/state";
import { useSelector } from "react-redux";

const _kc = new Keycloak({
  url: import.meta.env.VITE_REACT_APP_KEYCLOAK_URL,
  realm: import.meta.env.VITE_REACT_APP_REALM_NAME,
  clientId: import.meta.env.VITE_REACT_APP_CLIENT_ID
});

//const _kc = new Keycloak('/keycloak.json');
/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256'
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("User is not authenticated..!");
        _kc.login();
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => useSelector(selectToken);

const getTokenParsed = () => useSelector(selectUser);

const isLoggedIn = () => useSelector(selectIsAuthenticated);

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => useSelector(selectUser)?.preferred_username;
const getEmail = () => useSelector(selectUser)?.email;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  getEmail,
  hasRole,
};

export default UserService;
export const getKeycloak = () => _kc;