import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
  return (
    <Box
      sx={{
        // mt: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        // borderTop: "1px solid #F0F0F0",
        padding: "16px 0 16px 0",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "22px",
          color: "#000000A6",
        }}
      >
        {t("Land Price Information System")}
      </Typography>
      <Typography
        sx={{
          backgroundColor: "#E6F4FF",
          color: "#1677FF",
          padding: "1px 8px",
          borderRadius: "4px",
          fontFamily: "Poppins",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "20px",
        }}
      >
        {t("in Lao PDR")}
      </Typography>
    </Box>
  );
};
export default Footer;
