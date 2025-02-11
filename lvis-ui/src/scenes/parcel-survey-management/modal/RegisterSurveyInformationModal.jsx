import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import { CalendarIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from "../../../assets/icons/model-base/SaveIcon";
import FileViewer from "../../../components/FileViewer";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object({
  buildingType: Yup.string().required('Required'),
  material: Yup.string().required('Required'),
  quality: Yup.string().required('Required'),
  priceBuilding: Yup.string().required('Required'),
  user: Yup.string().required('Required'),
  roadType: Yup.string().required('Required'),
  roadSurface: Yup.string().required('Required'),
  landShape: Yup.string().required('Required'),
  landUseType: Yup.string().required('Required'),
  sourceOfFunds: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Price must be positive'),
  organization: Yup.string().required('Required'),
  position: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .required('Required')
    .matches(/^\d{8,}$/, 'Must be at least 8 numbers'),
});

const RegisterSurveyInformationModal = ({ open, onClose }) => {
  const [selectDate, setSelectDate] = useState(null);
  const [fileList] = useState([])
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      buildingType: '',
      material: '',
      quality: '',
      priceBuilding: '',
      user: '',
      roadType: '',
      roadSurface: '',
      landShape: '',
      landUseType: '',
      sourceOfFunds: '',
      price: '',
      organization: '',
      position: '',
      name: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ m: 0, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
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
          {t("Register Survey Information")}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '4px 0',
            width: '100%',
          }}
        >
          <Box sx={{
            display: 'flex',
            gap: '24px',
            flexDirection: 'column',
          }}>
            <Box sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '24px',
                }}
              >
                {t("Survey Date")}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="calendar"
                  value={selectDate}
                  onChange={(newValue) => {
                    setSelectDate(newValue);
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
                          width: '160px',
                          borderRadius: '6px'
                        },
                        '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
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
                  '& .MuiInputBase-root': {
                    borderRadius: '6px',
                  },
                  '& .MuiInputBase-input': {
                    padding: '10.5px 14px',
                    borderRadius: '6px',
                  }
                }}
              >
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      {t("Building information")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '16px',
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="buildingType" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Building type")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.buildingType && Boolean(formik.errors.buildingType)}>
                        <Select
                          id="buildingType"
                          name="buildingType"
                          value={formik.values.buildingType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.buildingType && formik.errors.buildingType && (
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
                            {formik.errors.buildingType}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="material" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                                                {t("Material")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.material && Boolean(formik.errors.material)}>
                        <Select
                          id="material"
                          name="material"
                          value={formik.values.material}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.material && formik.errors.material && (
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
                            {formik.errors.material}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="quality" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Quality")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.quality && Boolean(formik.errors.quality)}>
                        <Select
                          id="quality"
                          name="quality"
                          value={formik.values.quality}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.quality && formik.errors.quality && (
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
                            {formik.errors.quality}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="priceBuilding" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("price")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.priceBuilding && Boolean(formik.errors.priceBuilding)}>
                        <Select
                          id="priceBuilding"
                          name="priceBuilding"
                          value={formik.values.priceBuilding}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.priceBuilding && formik.errors.priceBuilding && (
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
                            {formik.errors.priceBuilding}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="user" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("User")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.user && Boolean(formik.errors.user)}>
                        <Select
                          id="user"
                          name="user"
                          value={formik.values.user}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.user && formik.errors.user && (
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
                            {formik.errors.user}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      {t("Land Information")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '16px',
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="roadType" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Road type")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.roadType && Boolean(formik.errors.roadType)}>
                        <Select
                          id="roadType"
                          name="roadType"
                          value={formik.values.roadType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.roadType && formik.errors.roadType && (
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
                            {formik.errors.roadType}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="roadSurface" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Road surface")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.roadSurface && Boolean(formik.errors.roadSurface)}>
                        <Select
                          id="roadSurface"
                          name="roadSurface"
                          value={formik.values.roadSurface}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.roadSurface && formik.errors.roadSurface && (
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
                            {formik.errors.roadSurface}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="landShape" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Land shape")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.landShape && Boolean(formik.errors.landShape)}>
                        <Select
                          id="landShape"
                          name="landShape"
                          value={formik.values.landShape}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.landShape && formik.errors.landShape && (
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
                            {formik.errors.landShape}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="landUseType" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Land use type")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.landUseType && Boolean(formik.errors.landUseType)}>
                        <Select
                          id="landUseType"
                          name="landUseType"
                          value={formik.values.landUseType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.landUseType && formik.errors.landUseType && (
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
                            {formik.errors.landUseType}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      {t("Price information")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '16px',
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="sourceOfFunds" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Source of funds")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.sourceOfFunds && Boolean(formik.errors.sourceOfFunds)}>
                        <Select
                          id="sourceOfFunds"
                          name="sourceOfFunds"
                          value={formik.values.sourceOfFunds}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          sx={{
                            height: '40px',
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          }}
                        >
                          <MenuItem sx={{ display: 'none' }} value="">
                            <em>Chọn</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {formik.touched.sourceOfFunds && formik.errors.sourceOfFunds && (
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
                            {formik.errors.sourceOfFunds}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="price" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("price")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.price && Boolean(formik.errors.price)}>
                        <TextField
                          fullWidth
                          id="price"
                          name="price"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.price && Boolean(formik.errors.price)}
                          helperText={formik.touched.price && formik.errors.price}
                          InputProps={{
                            endAdornment: <Typography sx={{ color: '#000000E0' }}>Kip</Typography>
                          }}
                          sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      {t("surveyor information")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '16px',
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="organization" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Organization")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.organization && Boolean(formik.errors.organization)}>
                        <TextField
                          fullWidth
                          id="organization"
                          name="organization"
                          value={formik.values.organization}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.organization && Boolean(formik.errors.organization)}
                          sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                        />
                        {formik.touched.organization && formik.errors.organization && (
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
                            {formik.errors.organization}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="position" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Position")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.position && Boolean(formik.errors.position)}>
                        <TextField
                          fullWidth
                          id="position"
                          name="position"
                          value={formik.values.position}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.position && Boolean(formik.errors.position)}
                          sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                        />
                        {formik.touched.position && formik.errors.position && (
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
                            {formik.errors.position}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="name" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Name")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
                        <TextField
                          fullWidth
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                        />
                        {formik.touched.name && formik.errors.name && (
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
                            {formik.errors.name}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <Typography 
                        component="label" 
                        htmlFor="phoneNumber" 
                        sx={{ 
                          color: '#000000E0',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: '22px',
                        }}
                      >
                        {t("Phone Number")}
                      </Typography>
                      <FormControl fullWidth error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}>
                        <TextField
                          fullWidth
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          InputProps={{
                            startAdornment: <Typography sx={{ color: '#000000E0' }}>+856</Typography>
                          }}
                          sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
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
                            {formik.errors.phoneNumber}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      {t("Attach image")}
                    </Typography>
                  </Box>
                  <Box>
                    <FileViewer isView={false} fileList={fileList} />
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px' }}>
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
          {t("cancel")}
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
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

RegisterSurveyInformationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterSurveyInformationModal