// import React from "react";
// import {
//   Box,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import FlexBetween from "./FlexBetween";
// import { navItems } from "./menu/navItems";
// import { useTranslation } from "react-i18next";
// import StyledListItemButton from "./custom/StyledListItemButton";

// const Sidebar = ({
//   user,
//   drawerWidth,
//   isSidebarOpen,
//   setIsSidebarOpen,
//   isNonMobile,
// }) => {
//   const { pathname } = useLocation();
//   const [active, setActive] = useState("");
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const theme = useTheme();
//   const isNonPortraitMode = useMediaQuery("(min-height: 600px)");

//   useEffect(() => {
//     setActive(pathname.substring(1));
//   }, [pathname]);

//   return (
//     <Box component="nav">
//       {isSidebarOpen && isNonMobile && (
//         <Drawer
//           open={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//           variant="persistent"
//           anchor="left"
//           sx={{
//             width: drawerWidth,
//             "& .MuiDrawer-paper": {
//               color: theme.palette.background.alt,
//               backgroundImage: theme.palette.primary.gradient,
//               borderLeft: "0",
//               borderRight: "0",
//               borderRadius: "20px 0 0 20px", // top-left top-right bottom-right bottom-left.
//               transition: "0.5s",
//               overflow: "hidden",
//               width: drawerWidth,
//             },
//           }}
//         >
//           <Typography component={"span"}>
//             <Box width="100%">
//               <Box onClick={() => {navigate(`/`);}}>
//                 <FlexBetween>
//                   <Box
//                       m="3.5rem 2rem 2rem 1rem"
//                       display="flex"
//                       alignItems="center"
//                   >
//                     <Typography
//                       sx={{
//                         display: "inline-block",
//                         position: "relative",
//                         fontFamily: "Georgia, serif",
//                         fontSize: "20px",
//                         fontWeight: "bold",
//                         color: theme.palette.primary.light, //theme.palette.secondary[500],
//                         "&::before": {
//                           position: "absolute",
//                           display:"inline-block",
//                           top: "-2.75rem",
//                           left: "0.15rem",
//                           content: '""',
//                           background: "url(./monre.svg) left top no-repeat",
//                           // Sizing needed
//                           height: "45px",
//                           width: "45px",
//                           backgroundSize: "45px 45px",
//                           zIndex: "-1"
//                         },
//                         "&::after": {
//                           content: '""',
//                           position: "absolute",
//                           bottom: "0",
//                           width: "100%",
//                           height: "3px",
//                           left: "0",
//                           backgroundColor: theme.palette.secondary[200],
//                           transform: "scaleX(0)",
//                           transformOrigin: "bottom right",
//                           transition: "transform 0.25s ease-out"
//                         },
//                         "&:hover": {
//                           color: theme.palette.background.default
//                         },
//                         "&:hover::after": {
//                           transform: "scaleX(1)",
//                           transformOrigin: "bottom left",
//                         },
//                       }}
//                     >
//                       LVIS
//                     </Typography>
//                   </Box>
//                 </FlexBetween>
//               </Box>
//               <Divider sx={{ m: "0 0.5rem 1rem 0.5rem"}}/>
//               <List>
//                 {navItems.map(({ text, link, icon }) => {
//                   const ref = link.toLowerCase();
//                   return (
//                     <ListItem key={t(text)} disablePadding>
//                       <StyledListItemButton
//                         onClick={() => {
//                           navigate(`/${ref}`);
//                           setActive(ref);
//                         }}
//                         selected={active === ref}
//                       >
//                         <ListItemIcon
//                           sx={{
//                             color:
//                               active === ref
//                               ? theme.palette.primary[600]
//                               : theme.palette.primary.light, //theme.palette.secondary[500],
//                           }}
//                         >
//                           {icon}
//                         </ListItemIcon>
//                         {isNonPortraitMode && (
//                           <ListItemText>
//                             <Box
//                               sx={{
//                                 lineHeight: "15px",
//                                 textAlign: "center"
//                               }}
//                             >
//                               <Typography
//                                 // variant="h7"
//                                 // fontFamily="Aclonica, sans-serif"
//                                 // fontStyle="normal"
//                                 // fontWeight="400"
//                               >
//                                 {t(text)}
//                               </Typography>
//                             </Box>
//                           </ListItemText>
//                         )}
//                       </StyledListItemButton>
//                     </ListItem>
//                   );
//                 })}
//               </List>
//             </Box>

//             {/* <Box>
//               <Divider sx={{ m: "4.5rem 1rem 1rem 1rem", borderColor: theme.palette.background.alt}}/>
//               <FlexBetween
//                 textTransform="none"
//                 flexDirection="column"
//                 overflow="auto"
//               >
//                 <Box
//                   component="img"
//                   alt="profile"
//                   src={
//                     user.picturePath === ""
//                     ? "profile.svg"
//                     : `${import.meta.env.VITE_REACT_APP_BASE_URL}/profiles/${user._id}_${user.picturePath}`}
//                   height="30px"
//                   width="30px"
//                   borderRadius="50%"
//                   onClick={() => navigate(`/profile/${user._id}`)}
//                   sx={{
//                     objectFit: "cover",
//                     "&:hover": {
//                       transform: "scale3d(1.25, 1.25, 1.25)",
//                     },
//                   }}
//                 />
//                 <Box textAlign="center">
//                   <Typography
//                     fontWeight="bold"
//                     fontSize="0.7rem"
//                     sx={{ color: theme.palette.secondary[300] }}
//                   >
//                     {user.name}
//                   </Typography>
//                   <Typography
//                     fontSize="0.75rem"
//                     sx={{ color: theme.palette.secondary[200] }}
//                   >
//                     {user.occupation}
//                   </Typography>
//                 </Box>
//               </FlexBetween>
//             </Box> */}
//           </Typography>
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;
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
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import UserService from "../state/UserService";
import { useTranslation } from "react-i18next";
import EnglishIcon from "../assets/icons/country/EnglishIcon";
import LaoIcon from "../assets/icons/country/LAOIcon";
import KoreanIcon from "../assets/icons/country/KoreanIcon";

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
  const openLanguage = Boolean(languageAnchorEl);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    handleLanguageClose();
  };

  const getFlagIcon = () => {
    switch (selectedLanguage) {
      case 'en':
        return <EnglishIcon />;
      case 'lo':
        return <LaoIcon />;
      case 'ko':
        return <KoreanIcon />;
      default:
        return <EnglishIcon />;
    }
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
    { src: "/home ico.svg", alt: "Home", path: "/home" },
    { src: "/land-price.svg", alt: "Land Price Explorer", path: "/montoring" },
    {
      src: "/land-valuation.svg",
      alt: "Land Valuation",
      path: "/land-valuation",
    },
    {
      src: "/model-based.svg",
      alt: "Model-based land valuation",
      path: "/model-base",
    },
    {
      src: "/parcel-survey.svg",
      alt: "Parcel survey management",
      path: "/parcel-survey-management",
    },
    { src: "/admin.svg", alt: "Admin", path: "/customers" },
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
        <Box
          aria-label="select language"
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleLanguageClick}
        >
          {getFlagIcon()}
        </Box>
        <Menu
          id="language-menu"
          anchorEl={languageAnchorEl}
          open={openLanguage}
          onClose={handleLanguageClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            zIndex: 1000,
            left: "55px",
            top: "-15px",
            width: "220px",
            borderRadius:"8px",
            "& .MuiPaper-root": {
              position: "relative",
              overflow: "visible",
              borderRadius: "8px", 
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 10,
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
          <MenuItem onClick={() => changeLanguage('en')}>
            <ListItemIcon>
              <EnglishIcon />
            </ListItemIcon>
            <ListItemText>{t('english')}</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => changeLanguage('lo')}>
            <ListItemIcon>
              <LaoIcon />
            </ListItemIcon>
            <ListItemText>{t('lao')}</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => changeLanguage('ko')}>
            <ListItemIcon>
              <KoreanIcon />
            </ListItemIcon>
            <ListItemText>{t('korean')}</ListItemText>
          </MenuItem>
        </Menu>
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
            borderRadius:"8px",
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
                marginLeft:"12px"
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
