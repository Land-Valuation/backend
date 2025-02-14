import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import { prototypeApi } from "./state/prototypeApi";
import { egisApi } from "./state/egisApi";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import UserService from "./state/UserService";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, globalReducer);

const appReducer = combineReducers( {
  global: persistedReducer,
  [prototypeApi.reducerPath]: prototypeApi.reducer,
  [egisApi.reducerPath]: egisApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'global/logout') {
    storage.removeItem('persist:root');
    state = undefined;
  }

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
    .concat(egisApi.middleware),
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