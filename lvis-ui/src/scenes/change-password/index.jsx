import {useState} from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Header from '@/components/Header.jsx';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {changePassword} from '@/api/user.js';
import _ from 'lodash';
import {toast} from 'react-toastify';

const ChangePassword = () => {
  const {t} = useTranslation();
  const [showPasswords, setShowPasswords] = useState(
      {new: false, confirm: false});

  const validationSchema = Yup.object({
    password: Yup.string().required(`${t('ChangePassword.Label.NewPassword')} ${t('ChangePassword.Validate.required')}`),
    confirmPassword: Yup.string().
        oneOf([Yup.ref('password')], `${t('ChangePassword.Label.NewPassword')} ${t('ChangePassword.Validate.must match')}`).
        required(`${t('ChangePassword.Validate.confirm required')}`),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      changePassword(_.omit(values, ["confirmPassword"])).then(() => {
        toast.success(t('ChangePassword.Message.ChangePasswordSuccess'));
        formik.resetForm();
      }).catch(() => {
        toast.success(t('ChangePassword.Message.ChangePasswordFailed'));
      });
    },
  });

  return (
      <Box m="1rem">
        <Box width="35%">
          <Header title={t('ChangePassword.title')}
                  subtitle="User information"/>
          <Box sx={{py: 3}}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                  fullWidth
                  size="medium"
                  autoComplete={""}
                  type={showPasswords.new ? 'text' : 'password'}
                  label={t("ChangePassword.Label.NewPassword")}
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password &&
                      Boolean(formik.errors.password)}
                  helperText={formik.touched.password &&
                      formik.errors.password}
                  sx={{backgroundColor: '#fff', borderRadius: 1, marginTop: '10px',}}
                  slotProps={{
                    input: {
                      endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPasswords(
                                    (prev) => ({...prev, new: !prev.new}))}
                                edge="end"
                            >
                              {showPasswords.new ? <FaEyeSlash/> : <FaEye/>}
                            </IconButton>
                          </InputAdornment>
                      )
                    }
                  }}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
              />

              <TextField
                  fullWidth
                  size="medium"
                  autoComplete={""}
                  type={showPasswords.confirm ? 'text' : 'password'}
                  label={t("ChangePassword.Label.ReNewPassword")}
                  {...formik.getFieldProps('confirmPassword')}
                  error={formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    marginTop: '20px',
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPasswords(
                                    (prev) => ({
                                      ...prev,
                                      confirm: !prev.confirm,
                                    }))}
                                edge="end"
                            >
                              {showPasswords.confirm ? <FaEyeSlash/> : <FaEye/>}
                            </IconButton>
                          </InputAdornment>
                      ),
                    }
                  }}
              />

              <Box display="flex" mt={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      width: '50%',
                      backgroundColor: '#1677FF',
                      color: '#fff',
                      textTransform: 'none',
                      borderRadius: '6px',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      minWidth: '32px',
                      minHeight: '32px',
                      boxShadow: 'none',
                    }}
                >
                  {t("ChangePassword.Button.Save")}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
  );
};

export default ChangePassword;