import {
  AppBar,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

import { Menu as MenuIcon } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FlexBetween from "./FlexBetween";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../state/UserService";
import { useTranslation } from "react-i18next";

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
const TopBox = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { t } = useTranslation();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <img
            width="46px"
            height="43px"
            alt="flag"
            src="../lao_flag.svg"
            sx={{ objectFit: "cover" }}
            onClick={() => {
              navigate(`/`);
            }}
          />
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween>
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
              marginRight: "12px",
              marginLeft: "24px",
            }}
            variant="outlined"
            startIcon={<LoginIcon />}
          >
            Login
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
            }}
            variant="contained"
            startIcon={<SignupIcon />}
          >
            Register
          </Button>

          {/* <LanguageSwitcher /> */}
          {/* <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                color: "#000000",
              }}
          >
            <MenuIcon />
          </Button>     */}
          {/* <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem>
              <FlexBetween
                onClick={() => UserService.doLogout()}
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    color: theme.palette.secondary[200],
                  },
                }}            
              >
                <LogoutOutlinedIcon/>
                <Typography>                  
                  {t("Sign Out")}
                </Typography>            
              </FlexBetween>
            </MenuItem>
          </Menu> */}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default TopBox;
