import {
  AppBar,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FlexBetween from "./FlexBetween";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../state/UserService";
import { useTranslation } from "react-i18next";
import LoginModal from "../scenes/auth/modal/LoginModal";
import RegisterModal from "../scenes/auth/modal/RegisterModal";
import RequireLogin from "../scenes/auth/modal/RequireLogin";
import LoginIcon from "../assets/icons/auth/LoginIcon";
import SignupIcon from "../assets/icons/auth/SignupIcon";

const TopBox = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isRequireLogin, setIsRequireLogin] = useState(false)

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLoginClose = () => {
    setIsLogin(false);
  };

  const handleRegister = () => {
    setIsRegister(true);
  };

  const handleRegisterClose = () => {
    setIsRegister(false);
  };

  const handleRequireLogin = () => {
    setIsRequireLogin(true);
  };

  const handleRequireLoginClose = () => {
    setIsRequireLogin(false);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", gap: "24px" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <img
            width="46px"
            height="33px"
            alt="flag"
            src="../lao_flag.svg"
            style={{ objectFit: "cover",  }}
            onClick={() => {
              navigate(`/`);
            }}
          />
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween sx={{ gap: "12px" }}>
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
            }}
            variant="outlined"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
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
            onClick={handleRegister}
          >
            Register
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
            onClick={handleRequireLogin}
          >
            Require
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
          <LoginModal open={isLogin} onClose={handleLoginClose} onRegister={() => { }} />
          <RegisterModal open={isRegister} onClose={handleRegisterClose} />
          <RequireLogin open={isRequireLogin} onClose={handleRequireLoginClose} />
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default TopBox;
