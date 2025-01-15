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
  InputAdornment,
  Box,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const LandCharacteristicsDialog = () => {
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
    <Dialog open={true} onClose={() => {}} fullWidth={true}
    maxWidth={1000}>
      <DialogTitle>
        Land Characteristics: AI-001
        <IconButton
          aria-label="close"
          onClick={() => {}}
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
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
                  >
                    <MenuItem value="">
                      <em>Chọn</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {formik.touched.characteristic1 && formik.errors.characteristic1 && (
                    <div style={{ color: 'red' }}>{formik.errors.characteristic1}</div>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                  >
                    <MenuItem value="">
                      <em>Chọn</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {formik.touched.characteristic3 && formik.errors.characteristic3 && (
                    <div style={{ color: 'red' }}>{formik.errors.characteristic3}</div>
                  )}
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={4}>
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
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic6" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 6
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formik.values.characteristic6}
                    onChange={(newValue) => {
                      formik.setFieldValue('characteristic6', newValue);
                    }}
                    slotProps={{
                      textField: {
                        id: 'characteristic6',
                        name: 'characteristic6',
                        onBlur: formik.handleBlur,
                        error: formik.touched.characteristic6 && Boolean(formik.errors.characteristic6),
                        helperText: formik.touched.characteristic6 && formik.errors.characteristic6,
                        fullWidth: true,
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <EventIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>

            <Grid item xs={4}>
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
                  >
                    <MenuItem value="">
                      <em>Chọn</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {formik.touched.characteristic7 && formik.errors.characteristic7 && (
                    <div style={{ color: 'red' }}>{formik.errors.characteristic7}</div>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <Typography component="label" htmlFor="characteristic9" sx={{ display: 'block', mb: 0.5 }}>
                  Characteristic 9
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formik.values.characteristic9}
                    onChange={(newValue) => {
                      formik.setFieldValue('characteristic9', newValue);
                    }}
                    slotProps={{
                      textField: {
                        id: 'characteristic9',
                        name: 'characteristic9',
                        onBlur: formik.handleBlur,
                        error: formik.touched.characteristic9 && Boolean(formik.errors.characteristic9),
                        helperText: formik.touched.characteristic9 && formik.errors.characteristic9,
                        fullWidth: true,
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <EventIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
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
      <DialogActions>
        <Button onClick={() => {}}>Cancel</Button>
        <Button type="submit" onClick={formik.handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LandCharacteristicsDialog;