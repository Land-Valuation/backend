import {
  Button,
} from "@mui/material";
import LayoutPageCommon from "../../../../components/LayoutPageCommon";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import "leaflet/dist/leaflet.css";
import UserService from "../../../../state/UserService";
import SaveIcon from "../../../../assets/icons/model-base/SaveIcon";
import CloseIcon from "../../../../assets/icons/land-valuation/CloseIcon";
import { useTranslation } from "react-i18next";
import DetailForLocal from "./DetailForLocal";

import DetailForCentral from "./DetailForCentral";

const LandValuationDetail = () => {
  const { t } = useTranslation();

  const userRole = UserService.getTokenParsed().realm_access.roles;
  const hasCentralRole = userRole.some((role) => role.includes("CENTRAL"));

  const breadcrumbData = [
    { name: t("home"), href: "/" },
    { name: t("Land Valuation"), href: "/land-valuation" },
  ];

  return (
    <>
      <LayoutPageCommon
        breadcrumbData={breadcrumbData}
        title={t("Detail information on land valuation profile")}
        actions={
          <>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #0000001A",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: "none",
              }}
              variant="contained"
              startIcon={<CloseIcon />}
            >
              {t("cancel")}
            </Button>
            <Button
              sx={{
                backgroundColor: "#1677FF",
                color: "#fff",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                minWidth: "32px",
                minHeight: "32px",
                boxShadow: "none",
              }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              {t("save")}
            </Button>
          </>
        }
      >
        {hasCentralRole ? (
          <DetailForCentral />
        ) : (
          <DetailForLocal />
        )}
      </LayoutPageCommon>
    </>
  );
};

export default LandValuationDetail;
