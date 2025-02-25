import {useFormik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Box, Button, TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {createGroup} from '@/api/group.js';

const CreateGroup = ({open, onClose, createComplete}) => {
  const {t} = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().
        required(`Name ${t('AdminTab.User.Form.Validate.required')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: '', parentId: '',
    }, validationSchema: validationSchema, onSubmit: async (values) => {
      const payload = {
        ...values,
      };

      registerMutation.mutate(payload);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values) => {
      return await createGroup(values);
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
                Create Group
              </Typography>
            </Box>
            <Box>
              <Typography component="label" htmlFor="firstName"
                          sx={{display: 'block', mb: 0.5}}>
                <Typography component="span"
                            sx={{color: 'red'}}>*</Typography> {t(
                  'AdminTab.GroupTab.Form.Name')}
              </Typography>
              <Box sx={{display: 'flex', gap: 2}}>
                <TextField
                    fullWidth
                    id="nameCreate"
                    name="name"
                    placeholder=""
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name &&
                        Boolean(formik.errors.name)}
                    helperText={formik.touched.name &&
                        formik.errors.name}
                    sx={{
                      '&:hover fieldset': {
                        borderColor: formik.touched.firstname &&
                        formik.errors.firstname ?
                            'red' :
                            'rgba(0, 0, 0, 0.23) !important',
                      },
                    }}
                />
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
            { t('AdminTab.GroupTab.Button.Submit') }
          </Button>
        </Box>


      </Box>
    </Box>
  </Box>);
};

CreateGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createComplete: PropTypes.func,
};

export default CreateGroup;