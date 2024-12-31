import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider, Box } from "@mui/material";

const drawerWidth = 64;

function SideMenu() {
  const menuItems = [
    { src: "/home ico.svg", alt: "Homepage" },
    { src: "/land-price.svg", alt: "Land Price shortcut" },
    { src: "/land-valuation.svg", alt: "land Valuation shortcut" },
    { src: "/model-based.svg", alt: "Model shortcut" },
    { src: "/parcel-survey.svg", alt: "Parcel survey shortcut" },
    { src: "/admin.svg", alt: "Admin shortcut" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '16px 0'
        }}
      >
        <img
          src="/Logo.svg"
          alt="Logo"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.alt}>
            <img
              src={item.src}
              alt={item.alt}
              style={{ width: "100%", height: "auto" }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideMenu;
