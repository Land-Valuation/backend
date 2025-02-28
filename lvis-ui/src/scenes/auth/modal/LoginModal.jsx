import {
  Box, Button, Checkbox, IconButton, InputAdornment, TextField, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {loginUser} from '@/state/authService.js';
import { useMutation } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('password is required'),
});

const LoginModal = ({open, onClose, onRegister}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [saveInfo, setSaveInfo] = useState(true);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      username: '', password: '',
    }, validationSchema: validationSchema, onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const response = await dispatch(loginUser(values));

      return response;
    },
    onSuccess: () => {
      formik.resetForm();
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response.data.error_description)
    },
  });

  return (<Box sx={{
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
                boxShadow: '0px 3px 6px -4px #0000001F',
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
                  <CloseIcon/>
                </Box>
              </Box>
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
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    textAlign: 'center',
                  }}
              >
                Welcome back! 👋
              </Typography>
              <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
              >
                Login account
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%',
                '& .MuiFormHelperText-root.Mui-error': {
                  color: 'red',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  marginLeft: 0,
                },
              }}>
                <TextField
                    fullWidth
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username &&
                        Boolean(formik.errors.username)}
                    helperText={formik.touched.username &&
                        formik.errors.username}
                    sx={{'&:hover fieldset': {borderColor: 'rgba(0, 0, 0, 0.23) !important'}}}
                    label="Username/Email"
                />
                <TextField
                    fullWidth
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password &&
                        Boolean(formik.errors.password)}
                    helperText={formik.touched.password &&
                        formik.errors.password}
                    sx={{'&:hover fieldset': {borderColor: 'rgba(0, 0, 0, 0.23) !important'}}}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">
                          <IconButton
                              aria-label={showPassword ?
                                  'hide the password' :
                                  'display the password'}
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                          >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>,
                      },
                    }}
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                />
              </Box>
            </form>
            <Box sx={{
              display: 'flex',
              gap: '8px',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Checkbox checked={saveInfo}
                          onChange={() => setSaveInfo(!saveInfo)}
                          sx={{
                            padding: 0, '&.Mui-checked': {
                              color: '#1677FF',
                            },
                          }}
                />
                <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                    }}
                >
                  Save information
                </Typography>
              </Box>
              <Typography
                  sx={{
                    color: '#1677FF',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
              >
                Forgot password?
              </Typography>
            </Box>
            <Box>
              <Button
                  sx={{
                    backgroundColor: '#1677FF',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    boxShadow: 'none',
                    width: '100%',
                    height: '40px',
                  }}
                  variant="contained"
                  onClick={() => formik.handleSubmit()}
                  disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Box>
            <Box sx={{
              display: 'flex',
              gap: '8px',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography
                  sx={{
                    color: '#00000073',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
              >
                Don&apos;t have an account yet?
              </Typography>
              <Typography
                  sx={{
                    color: '#1677FF',
                  }}
                  onClick={onRegister}
              >
                Register now.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>);
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginModal;
