import { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import EnglishIcon from "../assets/icons/country/EnglishIcon";
import LaoIcon from "../assets/icons/country/LaoIcon";
import KoreanIcon from "../assets/icons/country/KoreanIcon";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ height, top, left }) => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const openLanguage = Boolean(languageAnchorEl);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { i18n } = useTranslation();

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
      case "en":
        return <EnglishIcon width={46} height={height} />;
      case "lo":
        return <LaoIcon width={46} height={height} />;
      case "ko":
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
        <MenuItem onClick={() => changeLanguage("en")}>
          <ListItemIcon>
            <EnglishIcon />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("lo")}>
          <ListItemIcon>
            <LaoIcon />
          </ListItemIcon>
          <ListItemText>ພາສາລາວ</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("ko")}>
          <ListItemIcon>
            <KoreanIcon />
          </ListItemIcon>
          <ListItemText>한국인</ListItemText>
        </MenuItem>
      </Menu>
    </FlexBetween>
  );
};
// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
//   const theme = useTheme();
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     i18n.changeLanguage(newLang);
//   };

//   return (
//     <FlexBetween>
//       <FormControl variant="standard">
//         <Select
//           label="Select"
//           value={i18n.language}
//           onChange={handleLanguageChange}
//           sx={{
//             backgroundColor: theme.palette.background.default,
//             width: "120px",
//             borderRadius: "0.25rem",
//             p: "0.25rem 1rem",
//             "& .MuiSvgIcon-root": {
//               pr: "0.25rem",
//               width: "3rem",
//             },
//             "& .MuiSelect-select:focus": {
//               backgroundColor: theme.palette.background.alt,
//             },
//           }}
//           input={<InputBase />}
//         >
//           <MenuItem value="en">
//             <Typography>English</Typography>
//           </MenuItem>
//           <MenuItem value="ko">
//             <Typography>한국인</Typography>
//           </MenuItem>
//           <MenuItem value="lo">
//             <Typography>ພາສາລາວ</Typography>
//           </MenuItem>
//         </Select>
//       </FormControl>
//     </FlexBetween>
//   );
// };

export default LanguageSwitcher;
