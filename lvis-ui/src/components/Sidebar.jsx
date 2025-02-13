import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  Divider,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import UserService from "../state/UserService";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { LANGUAGE } from "../utils/constant";

const drawerWidth = 64;

function Sidebar() {
  const username = UserService.getUsername();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('language')) {
      setSelectedLanguage(localStorage.getItem('language'));
    } else {
      setSelectedLanguage(LANGUAGE.LO);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', selectedLanguage);
  }, [selectedLanguage])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    handleLanguageClose();
  };
  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) =>
      location.pathname.includes(item.path.toLowerCase())
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  const menuItems = [
    { src: "/home ico.svg", alt: t("home"), path: "/home" },
    { src: "/land-price.svg", alt: t("Land Price Explorer"), path: "/montoring" },
    {
      src: "/land-valuation.svg",
      alt: t("Land Valuation"),
      path: "/land-valuation",
    },
    {
      src: "/model-based.svg",
      alt: t("Model-based land Valuation"),
      path: "/model-base",
    },
    {
      src: "/parcel-survey.svg",
      alt: t("Parcel Survey Management"),
      path: "/parcel-survey-management",
    },
    { src: "/admin.svg", alt: t("Admin"), path: "/customers" },
  ];

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
      position: "relative",
      filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      fontSize: 14,
    },
  }));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          justifyContent: "space-between",
        },
      }}
    >
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px 0",
          }}
        >
          <img
            src="/Logo.svg"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        </Box>
        <Divider variant="middle" />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {menuItems.map((item, index) => (
            <LightTooltip
              title={item.alt}
              arrow
              key={item.alt}
              placement="right"
            >
              <ListItem
                sx={{
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: activeIndex === index ? "#E6F4FF" : "#F4F4F4",
                  opacity: activeIndex === index ? 1 : 0.7,
                  boxShadow:
                    activeIndex === index
                      ? "0px 6px 16px 0px #00000029"
                      : "none",
                  "&:hover": {
                    background: "#E6F4FF",
                    opacity: 1,
                    boxShadow: "0px 6px 16px 0px #00000029",
                  },
                }}
                button="true"
                key={item.alt}
                onClick={() => {
                  // setActiveIndex(index);
                  navigate(item.path);
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ width: "20px", height: "20px" }}
                />
              </ListItem>
            </LightTooltip>
          ))}
        </List>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <Divider variant="middle" sx={{ width: "31px" }} />
       <LanguageSwitcher height="18px" left="55px" top="-38px" selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
        <img width="20px" height="20px" alt="noti bell" src="../bell ico.svg" />
        <IconButton onClick={handleMenuOpen} sx={{ cursor: "pointer" }}>
          <img
            width="32px"
            height="32px"
            alt="flag"
            src="../sample avatar.svg"
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          sx={{
            zIndex: 1000,
            left: "55px",
            top: "-15px",
            width: "220px",
            borderRadius: "8px",
            "& .MuiPaper-root": {
              position: "relative",
              overflow: "visible",
              borderRadius: "8px",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: 10,
                left: -5,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                marginLeft: "12px",
              }}
            >
              <img
                width="32px"
                height="32px"
                alt="flag"
                src="../sample avatar.svg"
              />
              <div style={{ marginLeft: "8px" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "20px",
                    color: "#333333",
                    marginBottom: "2px",
                  }}
                >
                  {username}
                </Typography>
                <Typography sx={{ fontWeight: 400, color: "#00000073" }}>
                  user@mail.com
                </Typography>
              </div>
            </div>
            <MenuItem
              onClick={handleMenuClose}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <img src="/personal info.svg" alt="" />
              <Typography>Personal Information</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <img src="/change pw.svg" alt="" />
              <Typography>Change password</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <img src="/logout ico.svg" alt="" />
              <Typography
                onClick={() => UserService.doLogout()}
                style={{ cursor: "pointer" }}
              >
                Log out
              </Typography>
            </MenuItem>
          </div>
        </Menu>
      </div>
    </Drawer>
  );
}

export default Sidebar;
