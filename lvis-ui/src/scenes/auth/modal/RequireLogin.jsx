import { Box, Button, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import LoginIcon from "../../../assets/icons/auth/LoginIcon";
import SignupIcon from "../../../assets/icons/auth/SignupIcon";
import AmicoIcon from "../../../assets/icons/auth/AmicoIcon";

const RequireLogin = ({ open, onClose }) => {
  
  return (
    <Box sx={{
      display: open ? 'block' : 'none',
      position: 'absolute',
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9,
    }}>
      <Box onClick={onClose} sx={{
        display: open ? 'block' : 'none',
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
      }}></Box>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        backdropFilter: blur('12px'),
        boxShadow: '0px 24px 24px 0px #0000001A',
        zIndex: 11,
      }}>
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <Box 
            onClick={onClose} 
            sx={{ 
              cursor: 'pointer',
              position: 'absolute',
              left: '50%',
              top: -20,
              transform: 'translateX(-50%)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              boxShadow: '0px 6px 16px 0px #00000014',
              zIndex: 11,
              backgroundColor: '#FFF',
            }}
          >
            <Box sx={{ 
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              boxShadow: '0px 3px 6px -4px #0000001F'
            }}>
              <Box sx={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                boxShadow: '0px 9px 28px 8px #0000000D',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <CloseIcon />
              </Box>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            <AmicoIcon />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Login is required to use this function!
            </Typography>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                textAlign: 'center',
              }}
            >
              Please login to continue using our services or register if you do not have an account yet.
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
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
                width: '100%',
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
                width: '100%',
              }}
              variant="contained"
              startIcon={<SignupIcon />}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

RequireLogin.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RequireLogin