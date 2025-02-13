import { Box, Typography, useTheme, Link, Button } from "@mui/material";
import TopBox from "../../components/TopBox";
// import ChooserWidget from "../widgets/ChooserWidget";
import { useTranslation } from "react-i18next";
import "@fontsource/poppins/500.css";
import Sidebar from "../../components/Sidebar";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";

const notifications = [
  {
    title: "2024 Land Price Valuation Standards Update for Lao PDR",
    date: "2024-01-02",
  },
  {
    title: "Land Price Information System Maintenance Notice",
    date: "2024-01-02",
  },
  { title: "New Land Registration Feature Now Available", date: "2024-01-02" },
];
function LoginIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 17">
      <g clipPath="url(#clip0_7106_9811)">
        <path
          d="M8.17328 0.822293C5.45006 0.81515 3.05363 2.22408 1.68399 4.35265C1.62328 4.44729 1.69113 4.57229 1.80363 4.57229H3.05899C3.1447 4.57229 3.22506 4.53479 3.27863 4.46872C3.40363 4.31694 3.53756 4.17051 3.67863 4.03122C4.26078 3.45086 4.93756 2.99372 5.69113 2.67586C6.46971 2.34729 7.29828 2.17944 8.15363 2.17944C9.00899 2.17944 9.83756 2.34551 10.6161 2.67586C11.3697 2.99372 12.0465 3.45086 12.6286 4.03122C13.2108 4.61158 13.6661 5.28836 13.9858 6.04015C14.3161 6.81872 14.4822 7.64551 14.4822 8.50086C14.4822 9.35622 14.3143 10.183 13.9858 10.9616C13.6679 11.7134 13.2108 12.3902 12.6286 12.9705C12.0465 13.5509 11.3697 14.008 10.6161 14.3259C9.83695 14.655 8.99947 14.8238 8.15363 14.8223C7.29828 14.8223 6.46971 14.6544 5.69113 14.3259C4.93904 14.0083 4.25561 13.5481 3.67863 12.9705C3.53756 12.8294 3.40542 12.683 3.27863 12.533C3.22506 12.4669 3.14292 12.4294 3.05899 12.4294H1.80363C1.69113 12.4294 1.62149 12.5544 1.68399 12.6491C3.05185 14.7723 5.43756 16.1794 8.15363 16.1794C12.3715 16.1794 15.7965 12.7848 15.8393 8.57944C15.8822 4.30622 12.4518 0.833007 8.17328 0.822293ZM5.91113 10.5009V9.14372H0.30399C0.225419 9.14372 0.161133 9.07944 0.161133 9.00086V8.00086C0.161133 7.92229 0.225419 7.85801 0.30399 7.85801H5.91113V6.50086C5.91113 6.38122 6.05042 6.31336 6.14328 6.38836L8.67721 8.38836C8.69428 8.40173 8.70809 8.4188 8.71759 8.43829C8.72708 8.45778 8.73202 8.47918 8.73202 8.50086C8.73202 8.52255 8.72708 8.54394 8.71759 8.56344C8.70809 8.58293 8.69428 8.6 8.67721 8.61336L6.14328 10.6134C6.05042 10.6866 5.91113 10.6205 5.91113 10.5009Z"
          fill="#1677FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_7106_9811">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
function SignupIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 15">
      <path
        d="M9.96983 9.82411C10.402 9.59196 10.8966 9.45982 11.4234 9.45982H11.4252C11.4788 9.45982 11.5038 9.39554 11.4645 9.35982C10.9166 8.86818 10.2908 8.47109 9.61268 8.18482C9.60554 8.18125 9.5984 8.17946 9.59126 8.17589C10.7002 7.37054 11.4216 6.06161 11.4216 4.58482C11.4216 2.13839 9.44304 0.15625 7.00197 0.15625C4.5609 0.15625 2.58411 2.13839 2.58411 4.58482C2.58411 6.06161 3.30554 7.37054 4.41626 8.17589C4.40911 8.17946 4.40197 8.18125 4.39483 8.18482C3.59661 8.52232 2.88054 9.00625 2.26447 9.62411C1.65196 10.2355 1.16432 10.9603 0.828755 11.758C0.4986 12.5392 0.320419 13.3762 0.303756 14.2241C0.303279 14.2432 0.306622 14.2621 0.313587 14.2799C0.320553 14.2976 0.331 14.3138 0.344313 14.3274C0.357627 14.3411 0.373537 14.3519 0.391106 14.3593C0.408675 14.3667 0.427548 14.3705 0.446613 14.3705H1.51626C1.59304 14.3705 1.65733 14.308 1.65911 14.2313C1.69483 12.8527 2.24661 11.5616 3.2234 10.583C4.23233 9.57054 5.57518 9.01339 7.00376 9.01339C8.01626 9.01339 8.98769 9.29375 9.82518 9.81875C9.8467 9.83227 9.8714 9.83988 9.89679 9.84082C9.92218 9.84176 9.94737 9.836 9.96983 9.82411ZM7.00376 7.65625C6.1859 7.65625 5.41626 7.33661 4.8359 6.75625C4.55035 6.47145 4.32398 6.13296 4.16983 5.76028C4.01567 5.38761 3.93677 4.98812 3.93768 4.58482C3.93768 3.76518 4.25733 2.99375 4.8359 2.41339C5.41447 1.83304 6.18411 1.51339 7.00376 1.51339C7.8234 1.51339 8.59126 1.83304 9.17161 2.41339C9.45716 2.6982 9.68353 3.03669 9.83768 3.40936C9.99184 3.78203 10.0707 4.18152 10.0698 4.58482C10.0698 5.40446 9.75018 6.17589 9.17161 6.75625C8.59126 7.33661 7.82161 7.65625 7.00376 7.65625ZM13.5716 11.9063H12.0716V10.4062C12.0716 10.3277 12.0073 10.2634 11.9288 10.2634H10.9288C10.8502 10.2634 10.7859 10.3277 10.7859 10.4062V11.9063H9.2859C9.20733 11.9063 9.14304 11.9705 9.14304 12.0491V13.0491C9.14304 13.1277 9.20733 13.192 9.2859 13.192H10.7859V14.692C10.7859 14.7705 10.8502 14.8348 10.9288 14.8348H11.9288C12.0073 14.8348 12.0716 14.7705 12.0716 14.692V13.192H13.5716C13.6502 13.192 13.7145 13.1277 13.7145 13.0491V12.0491C13.7145 11.9705 13.6502 11.9063 13.5716 11.9063Z"
        fill="white"
      />
    </SvgIcon>
  );
}
const NotificationBox = () => {
  return (
    <Box
      sx={{
        mt: "32px",
        display: "flex",
        alignItems: "center",
        // backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "24px 24px 24px 64px",
        gap: "50px",
        position: "relative",
        backgroundColor: "#FFFFFF99",
      }}
    >
      {/* Icon on the left side */}
      <img
        src="/noti icon.svg"
        alt="Notification Icon"
        style={{
          width: "80px",
          height: "80px",
          position: "absolute",
          left: "-15px",
          top: "-16px",
        }}
      />

      {/* Notifications list */}
      <Box sx={{ flex: 1 }}>
        {notifications.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 0",
              //borderBottom: index !== notifications.length - 1 ? '1px solid #e0e0e0' : 'none',
              gap: "270px",
            }}
          >
            {/* Notification title */}
            <Typography variant="body1">{item.title}</Typography>

            {/* Notification date */}
            <Typography variant="body2" sx={{ color: "#757575" }}>
              {item.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Middle = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      width="100%"
      display="flex"
      gap="0.5rem"
      flexDirection="column"
      alignItems="center"
      marginTop="107px"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        sx={{
          "& .MuiTypography-root ": {
            lineHeight: "1.25",
          },
        }}
      >
        {/* <Typography
          fontFamily="Poppins"
          fontSize="22px"
          fontWeight="500"
          color={theme.palette.neutral.medium}
        >
          ລະບົບຂໍ້ມູນລາຄາທີ່ດິນໃນ ສປປ ລາວ
        </Typography> */}
        <Typography
          sx={{
            color: theme.palette.neutral.medium,
            fontFamily: "Poppins",
            fontSize: "30px",
            fontWeight: "500",
            position: "relative",
            paddingBottom: "15px",
          }}
        >
          {t("Land Price Information System")}
        </Typography>
        <Typography
          sx={{
            backgroundColor: "#BAE0FF",
            color: "#1677FF",
            fontSize: "12px",
            fontFamily: "Poppins",
            padding: "2px 4px",
            borderRadius: "4px",
          }}
        >
          {t("in Lao PDR")}
        </Typography>
      </Box>
      <NotificationBox />
      {/* <Box
        sx={{
          width: "100%",
          height: "21px",
          padding: "2px 2px 2px 2px", 
          bgcolor: "#002868",
          opacity: "0.5",
          mt: "3rem",
        }}     
      >
      </Box> */}
    </Box>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  const [isBoxVisible, setBoxVisible] = useState(true);

  const handleClose = () => {
    setBoxVisible(false);
  };
  return (
    <Box
      sx={{
        backgroundImage: "url(/homebg.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Sidebar />
      <TopBox />
      <Middle />
      {isBoxVisible && (
        <Box
          sx={{
            width: "400px",
            height: "420px",
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            display: "none",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "32px",
              borderWidth: "1px",
              backgroundColor: "white",
              boxShadow: "0px 9px 28px 8px #0000000D",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "-20px",
              right: "50%",
              marginRight: "-20px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <img src="/x.svg" alt="" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            <img src="./login req.svg" alt="" />
            <Box sx={{ textAlign: "center", width: "352px" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  marginBottom: "8px",
                }}
              >
                "Login is required to use this function!"
              </Typography>
              <Typography
                sx={{
                  // fontWeight: 400,
                  // fontFamily: "Poppins",
                  fontSize: "14px",
                  color: "#000000E0",
                }}
              >
                {t(
                  "Please login to continue using our services or register if you do not have an account yet."
                )}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                width: "100%",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#1677FF",
                  textTransform: "none",
                  border: "1px solid #1677FF",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "100%",
                }}
                variant="outlined"
                startIcon={<LoginIcon />}
              >
                {t("Login")}
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
                  width: "100%",
                }}
                variant="contained"
                startIcon={<SignupIcon />}
              >
                {t("Register")}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {/* MENU CHOOSER */}
      <Box
        width="100%"
        // padding="1rem 6%"
        display="flex"
        flexWrap="wrap"
        gap="24px"
        justifyContent="center"
        alignItems="center"
        marginTop="55px"
      >
        <Box className="menu-chooser">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <img
              src="/land-price.svg"
              alt="menu1"
              style={{
                width: "44px",
                height: "44px",
              }}
            />
            <Typography
              sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 18 }}
            >
              {t("Land Price Explorer")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                color: "#000000A6",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Molestie lacus...
            </Typography>
          </div>
          <Link
            sx={{ color: "#1677FF", display: "flex", gap: "8px" }}
            href="/montoring"
            underline="hover"
          >
            <img src="/arrow.svg" alt="arrow" />
            {t("See now")}
          </Link>
        </Box>
        <Box className="menu-chooser">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <img
              src="/land-valuation.svg"
              alt="menu2"
              style={{
                width: "44px",
                height: "44px",
              }}
            />
            <Typography
              sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 18 }}
            >
              {t("Land Valuation")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                color: "#000000A6",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Molestie lacus...
            </Typography>
          </div>
          <Link
            sx={{ color: "#1677FF", display: "flex", gap: "8px" }}
            href="/land-valuation"
            underline="hover"
          >
            <img src="/arrow.svg" alt="arrow" />
            {t("See now")}
          </Link>
        </Box>
        <Box className="menu-chooser">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <img
              src="/model-based.svg"
              alt="menu3"
              style={{
                width: "44px",
                height: "44px",
              }}
            />
            <Typography
              sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 18 }}
            >
              {t("Model-based land Valuation")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                color: "#000000A6",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Molestie lacus...
            </Typography>
          </div>
          <Link
            sx={{ color: "#1677FF", display: "flex", gap: "8px" }}
            href="/model-base"
            underline="hover"
          >
            <img src="/arrow.svg" alt="arrow" />
            {t("See now")}
          </Link>
        </Box>
        <Box className="menu-chooser">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <img
              src="/parcel-survey.svg"
              alt="menu4"
              style={{
                width: "44px",
                height: "44px",
              }}
            />
            <Typography
              sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 18 }}
            >
              {t("Parcel Survey Management")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                color: "#000000A6",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Molestie lacus...
            </Typography>
          </div>
          <Link
            sx={{ color: "#1677FF", display: "flex", gap: "8px" }}
            href="/dashboard"
            underline="hover"
          >
            <img src="/arrow.svg" alt="arrow" />
            {t("See now")}
          </Link>
        </Box>
        <Box className="menu-chooser">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <img
              src="/admin.svg"
              alt="menu5"
              style={{
                width: "44px",
                height: "44px",
              }}
            />
            <Typography
              sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 18 }}
            >
              {t("Admin")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                color: "#000000A6",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Molestie lacus...
            </Typography>
          </div>
          <Link
            sx={{ color: "#1677FF", display: "flex", gap: "8px" }}
            href="/customers"
            underline="hover"
          >
            <img src="/arrow.svg" alt="arrow" />
            {t("See now")}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
