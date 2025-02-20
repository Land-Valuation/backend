import {
  AppBar,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {Menu as MenuIcon} from '@mui/icons-material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FlexBetween from './FlexBetween';
import LanguageSwitcher from './LanguageSwitcher';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import UserService from '../state/UserService';
import {useTranslation} from 'react-i18next';
import LoginModal from '../scenes/auth/modal/LoginModal';
import RegisterModal from '../scenes/auth/modal/RegisterModal';
import RequireLogin from '../scenes/auth/modal/RequireLogin';
import LoginIcon from '../assets/icons/auth/LoginIcon';
import SignupIcon from '../assets/icons/auth/SignupIcon';
import {LANGUAGE} from '../utils/constant';
import {logoutUser} from '@/state/authService.js';
import {useIsAuthenticated} from '@/hooks/useAuth';

const TopBox = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const {i18n, t} = useTranslation();

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isRequireLogin, setIsRequireLogin] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (localStorage.getItem('language')) {
      setSelectedLanguage(localStorage.getItem('language'));
    } else {
      setSelectedLanguage(LANGUAGE.LO);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    handleLanguageClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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

  return (<AppBar
          sx={{
            position: 'static', background: 'none', boxShadow: 'none',
          }}
      >
        <Toolbar
            sx={{justifyContent: 'flex-end', gap: '24px', alignItems: 'center'}}
        >
          {/* LEFT SIDE */}
          {/* <FlexBetween>
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
              top: "15px",
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
        </FlexBetween> */}
          {!isAuthenticated && (<>
                <LanguageSwitcher height="34px" top="10px"
                                  selectedLanguage={selectedLanguage}
                                  changeLanguage={changeLanguage}/>
                {/* RIGHT SIDE */}
                <FlexBetween sx={{gap: '12px'}}>
                  <Button
                      sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#1677FF',
                        textTransform: 'none',
                        border: '1px solid #1677FF',
                        borderRadius: '6px',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                      variant="outlined"
                      startIcon={<LoginIcon/>}
                      onClick={handleLogin}
                  >
                    {t('Login')}
                  </Button>
                  <Button
                      sx={{
                        backgroundColor: '#1677FF',
                        color: '#fff',
                        textTransform: 'none',
                        borderRadius: '6px',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                      variant="contained"
                      startIcon={<SignupIcon/>}
                      onClick={handleRegister}
                  >
                    {t('Register')}
                  </Button>
                  {/* <Button
                      sx={{
                        backgroundColor: '#1677FF',
                        color: '#fff',
                        textTransform: 'none',
                        borderRadius: '6px',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                      variant="contained"
                      onClick={handleRequireLogin}
                  >
                    {t('Require')}
                  </Button> */}

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
                  <LoginModal
                      open={isLogin}
                      onClose={handleLoginClose}
                      onRegister={() => {
                      }}
                  />
                  <RegisterModal open={isRegister} onClose={handleRegisterClose}
                                 onLogin={() => {
                                 }}/>
                  <RequireLogin
                      open={isRequireLogin}
                      onClose={handleRequireLoginClose}
                  />
                </FlexBetween>
              </>)}
        </Toolbar>
      </AppBar>);
};

export default TopBox;
