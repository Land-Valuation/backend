import { useFormik } from "formik";
import * as Yup from 'yup';
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { registerUser } from '@/state/authService';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import _ from "lodash";

const validationSchema = Yup.object({
  username: Yup.string().required('username is required'),
  firstname: Yup.string().required('firstname is required'),
  lastname: Yup.string().required('lastname is required'),
  email: Yup.string().required('email is required'),
  password: Yup.string().required('password is required'),
  confirmPassword: Yup.string().required('re-enter password is required'),
});

const RegisterModal = ({ open, onClose, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      registerMutation.mutate(values);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values) => {
      const params = { ...values, enabled: true};

      return await registerUser(_.omit(params, ["confirmPassword"]));
    },
    onSuccess: (response) => {
      const {data} = response;

      toast.success(data.message)

      formik.resetForm();
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response.data.message)
    },
  });

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
        maxWidth: '480px',
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
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Register an account
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
              The following information will be used to create an account.
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
              <Box>
                <Typography component="label" htmlFor="username" sx={{ display: 'block', mb: 0.5 }}>
                  <Typography component="span" sx={{ color: 'red' }}>*</Typography> Username
                </Typography>
                <TextField
                  fullWidth
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  sx={{ '&:hover fieldset': { borderColor: formik.touched.username && formik.errors.username ? 'red' : 'rgba(0, 0, 0, 0.23) !important' }}}
                />
              </Box>
              <Box>
                <Typography component="label" htmlFor="firstName" sx={{ display: 'block', mb: 0.5 }}>
                  <Typography component="span" sx={{ color: 'red' }}>*</Typography> Full Name
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                      fullWidth
                      name="firstname"
                      placeholder="First Name"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                      helperText={formik.touched.firstname && formik.errors.firstname}
                      sx={{
                        '&:hover fieldset': {
                          borderColor: formik.touched.firstname && formik.errors.firstname ? 'red' : 'rgba(0, 0, 0, 0.23) !important',
                        },
                      }}
                  />

                  <TextField
                      fullWidth
                      name="lastname"
                      placeholder="Last Name"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                      helperText={formik.touched.lastname && formik.errors.lastname}
                      sx={{
                        '&:hover fieldset': {
                          borderColor: formik.touched.lastname && formik.errors.lastname ? 'red' : 'rgba(0, 0, 0, 0.23) !important',
                        },
                      }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography component="label" htmlFor="email" sx={{ display: 'block', mb: 0.5 }}>
                  <Typography component="span" sx={{ color: 'red' }}>*</Typography> Email
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ '&:hover fieldset': formik.touched.email && formik.errors.email ? 'red' : { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                gap: '16px',
              }}>
                <Box>
                  <Typography component="label" htmlFor="password" sx={{ display: 'block', mb: 0.5 }}>
                    <Typography component="span" sx={{ color: 'red' }}>*</Typography> Password
                  </Typography>
                    <TextField
                    fullWidth
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{ '&:hover fieldset': formik.touched.password && formik.errors.password ? 'red' : { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>,
                      },
                    }}
                    type={showPassword ? 'text' : 'password'}
                  />
                </Box>
                <Box>
                  <Typography component="label" htmlFor="confirmPassword" sx={{ display: 'block', mb: 0.5 }}>
                    <Typography component="span" sx={{ color: 'red' }}>*</Typography> Re-enter Password
                  </Typography>
                    <TextField
                    fullWidth
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    sx={{ '&:hover fieldset': formik.touched.confirmPassword && formik.errors.confirmPassword ? 'red' : { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>,
                      },
                    }}
                    type={showPassword ? 'text' : 'password'}
                  />
                </Box>
              </Box>
              
            </Box>
          </form>
          <Box>
            <Button
              sx={{
                backgroundColor: "#1677FF",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: 'none',
                width: '100%',
                height: '40px',
              }}
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Register
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
              Already have an account?
            </Typography>
            <Typography
              sx={{
                color: '#1677FF',
              }}
              onClick={() => {
                onLogin(true);
                onClose();
              }}
            >
              Log in
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default RegisterModal