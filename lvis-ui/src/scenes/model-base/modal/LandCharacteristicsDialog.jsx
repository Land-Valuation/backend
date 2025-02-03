import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2 as Grid,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { CalendarIcon } from '@mui/x-date-pickers';
import SaveIcon from '../../../assets/icons/model-base/SaveIcon';

const validationSchema = Yup.object({
  characteristic1: Yup.string().required('Characteristic 1 is required'),
  characteristic2: Yup.string().required('Characteristic 2 is required'),
  characteristic3: Yup.string().required('Characteristic 3 is required'),
  characteristic4: Yup.string().required('Characteristic 4 is required'),
  characteristic5: Yup.string().required('Characteristic 5 is required'),
  characteristic6: Yup.date().nullable().required('Characteristic 6 is required'),
  characteristic7: Yup.string().required('Characteristic 7 is required'),
  characteristic8: Yup.string().required('Characteristic 8 is required'),
  characteristic9: Yup.date().nullable().required('Characteristic 9 is required'),
});

const LandCharacteristicsDialog = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      characteristic1: '',
      characteristic2: '',
      characteristic3: '',
      characteristic4: '',
      characteristic5: '',
      characteristic6: null,
      characteristic7: '',
      characteristic8: '',
      characteristic9: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={1000}>
      <DialogTitle>
        <Typography
          sx={{
            color: '#000000',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
          }}
        >
          Land Characteristics: AI-001
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'red',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22px',
            marginLeft: 0,
          },
          '& label': {
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22px',
            color: '#000000E0',
          },
          '& .MuiTextField-root': {
            width: '100%',
          },
          '& .MuiInputBase-input': {
            padding: '10.5px 14px',
          }
        }}>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic1" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 1
                </Typography>
                <FormControl fullWidth error={formik.touched.characteristic1 && Boolean(formik.errors.characteristic1)}>
                  <Select
                    id="characteristic1"
                    name="characteristic1"
                    value={formik.values.characteristic1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    displayEmpty
                    sx={{
                      height: '40px',
                    }}
                  >
                    <MenuItem sx={{ display: 'none' }} value="">
                      <em>Chọn</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {formik.touched.characteristic1 && formik.errors.characteristic1 && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        mt: '3px',
                      }}
                    >
                      {formik.errors.characteristic1}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic2" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 2
                </Typography>
                <TextField
                  fullWidth
                  id="characteristic2"
                  name="characteristic2"
                  value={formik.values.characteristic2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.characteristic2 && Boolean(formik.errors.characteristic2)}
                  helperText={formik.touched.characteristic2 && formik.errors.characteristic2}
                  sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                />
              </Box>
            </Grid>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic3" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 3
                </Typography>
                <FormControl fullWidth error={formik.touched.characteristic3 && Boolean(formik.errors.characteristic3)}>
                  <Select
                    id="characteristic3"
                    name="characteristic3"
                    value={formik.values.characteristic3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    displayEmpty
                    sx={{
                      height: '40px',
                    }}
                  >
                    <MenuItem sx={{ display: 'none' }} value="">
                      <em>Chọn</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {formik.touched.characteristic3 && formik.errors.characteristic3 && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        mt: '3px',
                      }}
                    >
                      {formik.errors.characteristic3}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Grid>

            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic4" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 4
                </Typography>
                <TextField
                  fullWidth
                  id="characteristic4"
                  name="characteristic4"
                  value={formik.values.characteristic4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.characteristic4 && Boolean(formik.errors.characteristic4)}
                  helperText={formik.touched.characteristic4 && formik.errors.characteristic4}
                  sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                />
              </Box>
            </Grid>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic5" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 5
                </Typography>
                <TextField
                  fullWidth
                  id="characteristic5"
                  name="characteristic5"
                  value={formik.values.characteristic5}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.characteristic5 && Boolean(formik.errors.characteristic5)}
                  helperText={formik.touched.characteristic5 && formik.errors.characteristic5}
                  sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                />
              </Box>
            </Grid>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic6" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 6
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="calendar"
                    value={formik.values.characteristic6}
                    onChange={(newValue) => {
                      formik.setFieldValue('characteristic6', newValue);
                    }}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px", // Custom height for the input
                        width: '100%',
                      },
                      "& .MuiPaper-root": {
                        "& .MuiCalendarPicker-root": {
                          height: "300px", // Custom height for the popup calendar
                        },
                      },
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          "& .MuiInputBase-root": {
                            height: "40px", // Ensure consistent input height
                            width: '100%',
                          },
                          '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>

            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic7" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 7
                </Typography>
                <FormControl fullWidth error={formik.touched.characteristic7 && Boolean(formik.errors.characteristic7)}>
                  <Select
                    id="characteristic7"
                    name="characteristic7"
                    value={formik.values.characteristic7}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    displayEmpty
                    sx={{
                      height: '40px',
                    }}
                  >
                    <MenuItem sx={{ display: 'none' }} value="">
                      <em>Chọn</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {formik.touched.characteristic7 && formik.errors.characteristic7 && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        mt: '3px',
                      }}
                    >
                      {formik.errors.characteristic7}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic8" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 8
                </Typography>
                <TextField
                  fullWidth
                  id="characteristic8"
                  name="characteristic8"
                  value={formik.values.characteristic8}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.characteristic8 && Boolean(formik.errors.characteristic8)}
                  helperText={formik.touched.characteristic8 && formik.errors.characteristic8}
                  sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                />
              </Box>
            </Grid>
            <Grid item size={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic9" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 9
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="calendar"
                    value={formik.values.characteristic9}
                    onChange={(newValue) => {
                      formik.setFieldValue('characteristic9', newValue);
                    }}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px", // Custom height for the input
                        width: '100%',
                      },
                      "& .MuiPaper-root": {
                        "& .MuiCalendarPicker-root": {
                          height: "300px", // Custom height for the popup calendar
                        },
                      },
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          "& .MuiInputBase-root": {
                            height: "40px", // Ensure consistent input height
                            width: '100%',
                          },
                          '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{
        padding: '0 24px 24px 24px'
      }}>
        <Button
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #0000001A",
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            boxShadow: "none",
            height: "32px",
          }}
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={onClose}
        >
          Cancel
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
            minWidth: "32px",
            height: "32px",
            boxShadow: "none",
          }}
          variant="contained"
          startIcon={<SaveIcon />}
          type="submit"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LandCharacteristicsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default LandCharacteristicsDialog;