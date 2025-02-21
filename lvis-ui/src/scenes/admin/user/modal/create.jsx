import {useFormik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {
  Box, Button, IconButton, InputAdornment, TextField, Typography,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import {registerUser} from '@/state/authService';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import JoinGroupModal from '@/scenes/admin/user/modal/group';

const CreateUserModal = ({open, onClose, title}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenJoinGroup, setIsOpenJoinGroup] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState([]);

  const {t} = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string().
        required(`Username ${t('AdminTab.User.Form.Validate.required')}`),
    firstname: Yup.string().
        required(`First name ${t('AdminTab.User.Form.Validate.required')}`),
    lastname: Yup.string().
        required(`Last name ${t('AdminTab.User.Form.Validate.required')}`),
    email: Yup.string().
        email(`Email ${t('AdminTab.User.Form.Validate.email')}`).
        required(`Email ${t('AdminTab.User.Form.Validate.required')}`),
    password: Yup.string().
        required(`Password ${t('AdminTab.User.Form.Validate.required')}`),
  });

  useEffect(() => {
    formik.resetForm();
  }, [open]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseJoinGroup = () => {
    setIsOpenJoinGroup(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '', firstname: '', lastname: '', email: '', password: '',
    }, validationSchema: validationSchema, onSubmit: async (values) => {
      registerMutation.mutate(values);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values) => {
      return await registerUser(_.omit(values, ['confirmPassword']));
    }, onSuccess: (response) => {
      const {data} = response;

      toast.success(data.message);

      formik.resetForm();
      onClose();
    }, onError: (error) => {
      toast.error(error?.response.data.message);
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
                  top: '-20px',
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
                  <Typography component="label" sx={{
                    display: 'block',
                    mb: 0.5,
                    fontWeight: 'bold',
                    fontSize: '1.5em',
                  }}>
                    {title}
                  </Typography>
                </Box>
                <Box>
                  <Typography component="label" htmlFor="username"
                              sx={{display: 'block', mb: 0.5}}>
                    <Typography component="span"
                                sx={{color: 'red'}}>*</Typography> {t(
                      'AdminTab.User.Form.Label.Username')}
                  </Typography>
                  <TextField
                      fullWidth
                      id="usernameRegister"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.username &&
                          Boolean(formik.errors.username)}
                      helperText={formik.touched.username &&
                          formik.errors.username}
                      sx={{
                        '&:hover fieldset': {
                          borderColor: formik.touched.username &&
                          formik.errors.username ?
                              'red' :
                              'rgba(0, 0, 0, 0.23) !important',
                        },
                      }}
                  />
                </Box>
                <Box>
                  <Typography component="label" htmlFor="firstName"
                              sx={{display: 'block', mb: 0.5}}>
                    <Typography component="span"
                                sx={{color: 'red'}}>*</Typography> {t(
                      'AdminTab.User.Form.Label.Fullname')}
                  </Typography>
                  <Box sx={{display: 'flex', gap: 2}}>
                    <TextField
                        fullWidth
                        id="firstNameRegister"
                        name="firstname"
                        placeholder="First Name"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstname &&
                            Boolean(formik.errors.firstname)}
                        helperText={formik.touched.firstname &&
                            formik.errors.firstname}
                        sx={{
                          '&:hover fieldset': {
                            borderColor: formik.touched.firstname &&
                            formik.errors.firstname ?
                                'red' :
                                'rgba(0, 0, 0, 0.23) !important',
                          },
                        }}
                    />

                    <TextField
                        fullWidth
                        id="lastNameRegister"
                        name="lastname"
                        placeholder="Last Name"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastname &&
                            Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname &&
                            formik.errors.lastname}
                        sx={{
                          '&:hover fieldset': {
                            borderColor: formik.touched.lastname &&
                            formik.errors.lastname ?
                                'red' :
                                'rgba(0, 0, 0, 0.23) !important',
                          },
                        }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography component="label" htmlFor="email"
                              sx={{display: 'block', mb: 0.5}}>
                    <Typography component="span"
                                sx={{color: 'red'}}>*</Typography> {t(
                      'AdminTab.User.Form.Label.Email')}
                  </Typography>
                  <TextField
                      fullWidth
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email &&
                          Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      sx={{
                        '&:hover fieldset': formik.touched.email &&
                        formik.errors.email ?
                            'red' :
                            {borderColor: 'rgba(0, 0, 0, 0.23) !important'},
                      }}
                  />
                </Box>
                <Box>
                  <Typography component="label" htmlFor="password"
                              sx={{display: 'block', mb: 0.5}}>
                    <Typography component="span"
                                sx={{color: 'red'}}>*</Typography> {t(
                      'AdminTab.User.Form.Label.Password')}
                  </Typography>
                  <TextField
                      fullWidth
                      id="passwordRegister"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password &&
                          Boolean(formik.errors.password)}
                      helperText={formik.touched.password &&
                          formik.errors.password}
                      sx={{
                        '&:hover fieldset': formik.touched.password &&
                        formik.errors.password ?
                            'red' :
                            {borderColor: 'rgba(0, 0, 0, 0.23) !important'},
                      }}
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
                  />
                </Box>
                <Box>
                  <Typography component="label" htmlFor="email"
                              sx={{display: 'block', mb: 0.5}}>
                    <Typography component="span"
                                sx={{color: 'red'}}>*</Typography> {t(
                      'AdminTab.User.Form.Label.Joingroup')}
                  </Typography>
                  <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setIsOpenJoinGroup(true);
                        }}
                    >
                      {t('AdminTab.User.Form.Label.Choosegroup')}
                    </Button>
                  </Box>
                </Box>
              </Box>

            </form>
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
                  onClick={formik.handleSubmit}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>


        <JoinGroupModal title={'Join Groups'}
                        setSelectedGroupId={setSelectedGroupId}
                        open={isOpenJoinGroup}
                        onClose={handleCloseJoinGroup}/>
      </Box>);
};

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CreateUserModal;