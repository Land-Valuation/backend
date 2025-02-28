const BASE_URL = import.meta.env.VITE_REACT_APP_KEYCLOAK_URL;
const USER_SERVICE_URL = import.meta.env.VITE_REACT_APP_USER_SERVICE_URL;

export {
  BASE_URL,
  USER_SERVICE_URL,
};

export const USER_ROLES = {
  ROLE_LOCAL_MANAGER: 'admin',
  ROLE_LOCAL_USER: 'user',
  ROLE_CENTRAL_MANAGER: 'admin',
  ROLE_CENTRAL_USER: 'user',
}

export const ADMIN_ROLES = {
  ROLE_ADMIN: 'admin',
  ROLE_SUPER_ADMIN: 'Super Admin',
}

export const MODEL_BASE_MODE = {
  LOCAL: 'LOCAL',
  CENTRAL: 'CENTRAL',
  UNAUTHORIZED: 'UNAUTHORIZED',
}

export const LANGUAGE = {
  EN: 'en',
  LO: 'lo',
  KO: 'ko'
}

export const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

export const HTTP_CODE = {
  SUCCESS: 200
}

export const FORMAT_DATE = {
  DMY : 'DD-MM-YYYY',
  DMY2 : 'DD/MM/YYYY',
  DMY_SLASH: 'DD/MM/YYYY',
  MDY_HMS:'MM/DD/YYYY HH:mm:ss',
  DMY_HMS:'DD-MM-YYYY HH:mm:ss',
  HM_DMY:'HH:mm - DD/MM/YYYY',
  DATE: 'YYYY-MM-DDTHH:mm:ss.ssssssZ',
  DATE2: 'YYYY-MM-DD',
  YYYYMMDD: "YYYYMMDD",
  YYYY: 'YYYY'
}