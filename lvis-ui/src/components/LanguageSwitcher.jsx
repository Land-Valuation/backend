import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import FlexBetween from "./FlexBetween";
import EnglishIcon from "../assets/icons/country/EnglishIcon";
import LaoIcon from "../assets/icons/country/LaoIcon";
import KoreanIcon from "../assets/icons/country/KoreanIcon";
import { LANGUAGE } from "../utils/constant";

const LanguageSwitcher = ({
  height,
  top,
  left,
  selectedLanguage,
  changeLanguage,
}) => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const openLanguage = Boolean(languageAnchorEl);

  const handleLanguageClick = (event) => {
    if (openLanguage) {
      handleLanguageClose();
    } else {
      setLanguageAnchorEl(event.currentTarget);
    }
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const getFlagIcon = () => {
    switch (selectedLanguage) {
      case LANGUAGE.EN:
        return <EnglishIcon width={46} height={height} />;
      case LANGUAGE.LO:
        return <LaoIcon width={46} height={height} />;
      case LANGUAGE.KO:
        return <KoreanIcon width={46} height={height} />;
      default:
        return <EnglishIcon width={46} height={height} />;
    }
  };

  return (
    <FlexBetween>
      <Box
        aria-label="select language"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleLanguageClick}
        sx={{ height: "34px", cursor: "pointer" }}
      >
        {getFlagIcon()}
      </Box>
      <Menu
        id="language-menu"
        anchorEl={languageAnchorEl}
        open={openLanguage}
        onClose={handleLanguageClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          zIndex: 1000,
          top: top,
          left: left,
          width: "170px",
          borderRadius: "8px",
          "& .MuiPaper-root": {
            position: "relative",
            overflow: "visible",
            borderRadius: "8px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            changeLanguage("en");
            handleLanguageClose();
          }}
        >
          <ListItemIcon>
            <EnglishIcon />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("lo");
            handleLanguageClose();
          }}
        >
          <ListItemIcon>
            <LaoIcon />
          </ListItemIcon>
          <ListItemText>ພາສາລາວ</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("ko");
            handleLanguageClose();
          }}
        >
          <ListItemIcon>
            <KoreanIcon />
          </ListItemIcon>
          <ListItemText>한국어</ListItemText>
        </MenuItem>
      </Menu>
    </FlexBetween>
  );
};

export default LanguageSwitcher;
