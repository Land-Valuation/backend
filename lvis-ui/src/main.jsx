import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./state";
import loginReducer from "./state/loginState";
import { Provider } from "react-redux";
import { prototypeApi } from "./state/prototypeApi";
import { egisApi } from "./state/egisApi";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { localSurveyInformationApi } from "./state/localSurveyInformationApi";
import { provinceApi } from "./state/provinceApi";
import { landValueZoneApi } from "./state/landValueZoneApi";
import { parcelApi } from "./state/parcelApi";
import { taskApi } from "./state/taskApi";
import { zoneApi } from "./state/zoneApi";
import { committeeStatusTypeApi } from "./state/committeeStatusTypeApi";
import { valuationStatusTypeApi } from "./state/valuationStatusTypeApi";
import { memberTypeApi } from "./state/memberTypeApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { valuationMasterApi } from "./state/valuationMasterApi";
import draftReducer from "./state/draftSlice"
import { documentApi } from "./state/documentApi";
import { localValuationApi } from "./state/localValuationApi";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, globalReducer);

const appReducer = combineReducers( {
  global: persistedReducer,
  login: loginReducer,
  [prototypeApi.reducerPath]: prototypeApi.reducer,
  [egisApi.reducerPath]: egisApi.reducer,
  [localSurveyInformationApi.reducerPath]: localSurveyInformationApi.reducer,
  [provinceApi.reducerPath]: provinceApi.reducer,
  [landValueZoneApi.reducerPath]: landValueZoneApi.reducer,
  [parcelApi.reducerPath]: parcelApi.reducer,
  [committeeStatusTypeApi.reducerPath]: committeeStatusTypeApi.reducer,
  [valuationStatusTypeApi.reducerPath]: valuationStatusTypeApi.reducer,
  [memberTypeApi.reducerPath]: memberTypeApi.reducer,
  [valuationMasterApi.reducerPath]: valuationMasterApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [zoneApi.reducerPath]: zoneApi.reducer,
  draft: draftReducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [localValuationApi.reducerPath]: localValuationApi.reducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    .concat(prototypeApi.middleware)
    .concat(egisApi.middleware)
    .concat(localSurveyInformationApi.middleware)
    .concat(provinceApi.middleware)
    .concat(landValueZoneApi.middleware)
    .concat(parcelApi.middleware)
    .concat(committeeStatusTypeApi.middleware)
    .concat(valuationStatusTypeApi.middleware)
    .concat(memberTypeApi.middleware)
    .concat(valuationMasterApi.middleware)
    .concat(taskApi.middleware)
    .concat(zoneApi.middleware)
    .concat(documentApi.middleware)
    .concat(localValuationApi.middleware)
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);

renderApp();