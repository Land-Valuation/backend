import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Transactions from "./scenes/transactions";
import Valuation from "./scenes/maps/valuation";
import LandValuationDetail from "./scenes/maps/valuation/detail/detail";
import Utilities from "./scenes/utilities";
import HomePage from "./scenes/home";
import PageNotFound from "./scenes/pagenotfound"
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import NotRenderOnRole from "./NotRenderOnRole";
import { initializeAuth } from "./state"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";
import translationLO from "./locales/lo/translation.json";

import Egis0 from "./scenes/egis0";
import ModelBase from "./scenes/model-base";
import CreateNewModel from "./scenes/model-base/create-model";
import RequestForInvesgationDetail from "./scenes/model-base/request-for-invesgation/detail/RequestForInvesgationDetail";
import ParcelSurveyManagement from "./scenes/parcel-survey-management";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from '@/scenes/admin/index.jsx';

const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
  lo: {
    translation: translationLO,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const storedLanguage = localStorage.getItem("language");
  useEffect(() => {
    // Initialize i18n
    const initialLanguage = storedLanguage || "en";

    i18n.use(initReactI18next).init({
      resources,
      lng: initialLanguage,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
  }, [storedLanguage]);

  return (
    <div className="app">
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />

      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RenderOnAuthenticated>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              
              <Route element={<Layout />}>
                <Route path="/dashboard" element={
                  <NotRenderOnRole roles={[]} showNotAllowed>
                    <Dashboard />
                  </NotRenderOnRole>
                } />
                <Route path="/search" element={<Valuation />} />
                <Route path="/model-base" element={<ModelBase />} />
                <Route path="/model-base/create-new-model" element={<CreateNewModel />} />
                <Route path="/model-base/detail" element={<RequestForInvesgationDetail />} />
                <Route path="/land-valuation" element={<Valuation />} />
                <Route path="/land-valuation/detail" element={<LandValuationDetail />} />
                <Route path="/parcel-survey-management" element={<ParcelSurveyManagement />} />
                <Route path="/customers" element={
                  <NotRenderOnRole roles={[]} showNotAllowed>
                    <Admin />
                  </NotRenderOnRole>
                } />
                <Route path="/tasks" element={<Utilities />} />
                <Route path="/transactions" element={<Transactions />} />

                <Route path="/montoring" element={
                  <NotRenderOnRole roles={[]} showNotAllowed>
                    <Egis0 />
                  </NotRenderOnRole>
                } />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </RenderOnAuthenticated>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
