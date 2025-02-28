import {Box, Typography, useTheme, Link } from '@mui/material';
import TopBox from '../../components/TopBox';
import Sidebar from '../../components/Sidebar';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {useIsAuthenticated} from '@/hooks/useAuth';
import RequireLogin from  "@/scenes/auth/modal/RequireLogin";

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

const NotificationBox = () => {
  return (
    <Box
      sx={{
        mt: "32px",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        padding: "24px 24px 24px 64px",
        gap: "50px",
        position: "relative",
        backgroundColor: "#FFFFFF99",
      }}
    >
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
      <Box sx={{ flex: 1 }}>
        {notifications.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 0",
              gap: "270px",
            }}
          >
            <Typography variant="body1">{item.title}</Typography>
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
      >
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
    </Box>
  );
};

const HomePage = () => {
  const [isBoxVisible, setBoxVisible] = useState(true);
  const isAuthenticated = useIsAuthenticated();
  const [isRequireLogin, setIsRequireLogin] = useState(false);

  const { t } = useTranslation();
  const handleClose = () => {
    setBoxVisible(false);
  };
  const handleRequireLogin = () => {
    if (!isAuthenticated) {
      event.preventDefault(); // Prevent navigation
      setIsRequireLogin(true);
    }
  };

  const handleRequireLoginClose = () => {
    setIsRequireLogin(false);
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
      {isAuthenticated && <Sidebar />}
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
            href={isAuthenticated ? "/montoring" : "#"}
            underline="hover"
            onClick={handleRequireLogin}
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
            href={isAuthenticated ? "/land-valuation" : "#"}
            underline="hover"
            onClick={handleRequireLogin}
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
            href={isAuthenticated ? "/model-base" : "#"}
            underline="hover"
            onClick={handleRequireLogin}
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
            href={isAuthenticated ? "/parcel-survey-management" : "#"}
            underline="hover"
            onClick={handleRequireLogin}
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
            href={isAuthenticated ? "/customers" : "#"}
            underline="hover"
            onClick={handleRequireLogin}
          >
            <img src="/arrow.svg" alt="arrow" />
            {t("See now")}
          </Link>
        </Box>
      </Box>
      <RequireLogin open={isRequireLogin} onClose={handleRequireLoginClose} />
    </Box>
  );
};

export default HomePage;
