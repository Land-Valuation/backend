import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider, Box, Popper, Typography, Tooltip } from "@mui/material";
import UserService from "../../state/UserService";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 64;

function SideMenu() {
  const navigate = useNavigate();
  const menuItems = [
    { src: "/home ico.svg", alt: "Home", path: "/home" },
    { src: "/land-price.svg", alt: "Land Price Explorer", path: "/montoring" },
    { src: "/land-valuation.svg", alt: "Land Valuation", path: "/Search" },
    {
      src: "/model-based.svg",
      alt: "Model-based land valuation",
      path: "/Products",
    },
    {
      src: "/parcel-survey.svg",
      alt: "Parcel survey management",
      path: "/Dashboard",
    },
    { src: "/admin.svg", alt: "Admin", path: "/Customers" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
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
                button
                key={item.alt}
                onClick={() => {
                  setActiveIndex(index);
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
        <img width="24px" height="18px" alt="flag" src="../lao_flag.svg" />
        <img width="20px" height="20px" alt="noti bell" src="../bell ico.svg" />
        <img
          width="32px"
          height="32px"
          alt="flag"
          src="../sample avatar.svg"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
          aria-describedby={id}
        />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          sx={{
            zIndex: 100,
            position: "absolute !important",
            bottom: "16px",
            top: "auto !important",
            left: "73px !important",
          }}
          placement="right-end"
          modifiers={[
            {
              name: "arrow",
              enabled: true,
              options: {
                element: ".arrow",
              },
            },
          ]}
          transition
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              position: "relative",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="arrow"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "-16px",
                borderWidth: "8px",
                borderStyle: "solid",
                borderColor: " transparent white transparent transparent",
                transform: "translateY(0)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "12px",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <img
                width="32px"
                height="32px"
                alt="flag"
                src="../sample avatar.svg"
              />
              <div>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "20px",
                    color: "#333333",
                    marginBottom: "2px",
                  }}
                >
                  Username
                </Typography>
                <Typography sx={{ fontWeight: 400, color: "#00000073" }}>
                  user@mail.com
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginBottom: "10px",
                display: "none",
              }}
            >
              <img src="/user.svg" alt="" />
              <Typography>User management</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <img src="/personal info.svg" alt="" />
              <Typography>Personal Information</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <img src="/change pw.svg" alt="" />
              <Typography>Change password</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={() => UserService.doLogout()}
            >
              <img src="/logout ico.svg" alt="" />
              <Typography>Log out</Typography>
            </div>
          </div>
        </Popper>
      </div>
    </Drawer>
  );
}

export default SideMenu;
