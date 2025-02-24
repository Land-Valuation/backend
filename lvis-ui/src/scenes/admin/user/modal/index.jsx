import {useFormik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {createUser, updateUser} from '@/api/user.js';
import {get} from '@/service/user.js';
import {getRoleList} from '@/service/role.js';
import {getListGroup} from '@/service/group.js';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const UserModal = ({open, onClose, title, userId, createComplete}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const {t} = useTranslation();

  const validationSchema = Yup.object({
    ...(userId ? {} : {
      username: Yup.string().
          required(`Username ${t('AdminTab.User.Form.Validate.required')}`),
    }),
    firstname: Yup.string().
        required(`First name ${t('AdminTab.User.Form.Validate.required')}`),
    lastname: Yup.string().
        required(`Last name ${t('AdminTab.User.Form.Validate.required')}`),
    email: Yup.string().
        email(`Email ${t('AdminTab.User.Form.Validate.email')}`).
        required(
            `Email ${t('AdminTab.User.Form.Validate.required')}`), ...(userId ?
        {} :
        {
          password: Yup.string().
              required(`Password ${t('AdminTab.User.Form.Validate.required')}`),
        }),
    roleId: Yup.string().
        required(`Role ${t('AdminTab.User.Form.Validate.required')}`),
    groupId: Yup.string().
        required(`Group ${t('AdminTab.User.Form.Validate.required')}`),
  });

  useEffect(() => {
    formik.resetForm();

    if (open) {
      getRoleList().then((data) => {
        setRoleList(data);
      });
      getListGroup().then((data) => {
        setGroupList(data);
      });
    }

    if (open && userId !== null) {
      fetchUserData().then();
    }

  }, [open]);

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
      groupId: '',
      roleId: '',
    }, validationSchema: validationSchema, onSubmit: async (values) => {
      const payload = {
        ...values,
        groupIds: groupList.filter(group => group.id === values.groupId).map(group => group.id),
        roleIds: roleList.filter(role => role.id === values.roleId).map(role => ({id: role.id, name: role.name})),
      };

      if (userId) {
        updateUserMutation.mutate({userId, ...payload});
      } else {
        registerMutation.mutate(payload);
      }
    },
  });

  const fetchUserData = async () => {
    try {
      const {data} = await get(userId);

      await formik.setValues({
        username: data?.username || '',
        firstname: data?.firstName || '',
        lastname: data?.lastName || '',
        email: data?.email || '',
        password: '',
        groupId: data?.groupIds?.[0] || '',
        roleId: data?.roleIds?.[0].id || '',
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const registerMutation = useMutation({
    mutationFn: async (values) => {
      return await createUser(_.omit(values, ['confirmPassword']));
    }, onSuccess: (response) => {
      const {data} = response;

      toast.success(data.message);
      createComplete(true);

      formik.resetForm();
      onClose();
    }, onError: (error) => {
      toast.error(error?.response.data.message);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (values) => {
      return await updateUser(values, userId);
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
            {!userId && (<Box>
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
                  helperText={formik.touched.username && formik.errors.username}
                  sx={{
                    '&:hover fieldset': {
                      borderColor: formik.touched.username &&
                      formik.errors.username ?
                          'red' :
                          'rgba(0, 0, 0, 0.23) !important',
                    },
                  }}
              />
            </Box>)}
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

            {!userId && (<Box>
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
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{
                    '&:hover fieldset': formik.touched.email &&
                    formik.errors.email ?
                        'red' :
                        {borderColor: 'rgba(0, 0, 0, 0.23) !important'},
                  }}
              />
            </Box>)}
            {!userId && (<Box>
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
                  autoComplete={'Password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password &&
                      Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
            </Box>)}

            <Box>
              <Typography component="label"
                          sx={{display: 'block', mb: 0.5}}>
                <Typography component="span"
                            sx={{color: 'red'}}></Typography> {t(
                  'AdminTab.User.Form.Label.Joingroup')}
              </Typography>
              <Box>
                <FormControl fullWidth error={formik.touched.groupId && Boolean(formik.errors.groupId)}>
                  <Select
                      id="group-select"
                      name="groupId"
                      value={formik.values.groupId}
                      onChange={(event) => {
                        formik.setFieldValue('groupId', event.target.value)
                      }}
                      onBlur={formik.handleBlur}
                  >
                    {groupList.map(
                        (group) => (<MenuItem key={group.id} value={group.id}
                            >
                              {group.name.charAt(0).toUpperCase() +
                                  group.name.slice(1)}
                            </MenuItem>))}
                  </Select>
                  {formik.touched.groupId && formik.errors.groupId && (
                      <FormHelperText>{formik.errors.groupId}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Box>
            <Box>
              <Typography component="label"
                          sx={{display: 'block', mb: 0.5}}>
                <Typography component="span"
                            sx={{color: 'red'}}></Typography> {t(
                  'AdminTab.User.Form.Label.JoinRole')}
              </Typography>
              <Box>
                <FormControl fullWidth error={formik.touched.roleId && Boolean(formik.errors.roleId)}>
                  <Select
                      id="role-select"
                      name="roleId"
                      value={formik.values.roleId}
                      onChange={(event) => formik.setFieldValue('roleId',
                          event.target.value)}
                      onBlur={formik.handleBlur}
                  >
                    {roleList.map(
                        (role) => (<MenuItem key={role.id} value={role.id}
                            >
                              {role.name.charAt(0).toUpperCase() +
                                  role.name.slice(1)}
                            </MenuItem>))}
                  </Select>
                  {formik.touched.roleId && formik.errors.roleId && (
                      <FormHelperText>{formik.errors.roleId}</FormHelperText>
                  )}
                </FormControl>
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
            {userId === null ?
                t('AdminTab.User.Form.Button.Register') :
                t('AdminTab.User.Form.Button.Edit')}
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>);
};

UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
  createComplete: PropTypes.func,
};

export default UserModal;