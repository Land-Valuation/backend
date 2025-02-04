import { Box, Button, Checkbox, FormControl, Grid2, MenuItem, Select, Typography } from "@mui/material"
import { a11yProps, StyledTab, StyledTabs } from "../common"
import { useState } from "react";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import MapIcon from '@mui/icons-material/Map';
import HistogramIcon from "../../../../assets/icons/model-base/HistogramIcon";
import BoxPlotIcon from "../../../../assets/icons/model-base/BoxPlotIcon";
import HistogramModal from "../../modal/HistogramModal";
import BoxPlotModal from "../../modal/BoxPlotModal";
import SelectSampleParcelsMap from "./SelectSampleParcelsMap";
import SelectSampleParcelsTable from "./SelectSampleParcelsTable";
import TableIcon from "../../../../assets/icons/model-base/TableIcon";
import FilterSelectSampleParcels from "./FilterSelectSampleParcels";
import ChangeSelectionIcon from "../../../../assets/icons/model-base/ChangeSelectionIcon";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  year: Yup.string().required('year is required'),
  model: Yup.string().required('model is required'),
});

const SelectSampleParcels = () => {
  const [tab, setTab] = useState(0);
  const [isHistogramModalOpen, setIsHistogramModalOpen] = useState(false)
  const [isBoxPlotModalOpen, setIsBoxPlotModalOpen] = useState(false)
  const [isOnlySurveyedStandardLots, setIsOnlySurveyedStandardLots] = useState(false)
  const [isHasData, setIsHasData] = useState(false)

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCloseHistogramModal = () => {
    setIsHistogramModalOpen(false);
  };

  const handleOpenHistogramModal = () => {
    setIsHistogramModalOpen(true);
  }

  const handleCloseBoxPlotModal = () => {
    setIsBoxPlotModalOpen(false);
  };

  const handleOpenBoxPlotModal = () => {
    setIsBoxPlotModalOpen(true);
  }

  const formik = useFormik({
    initialValues: {
      year: '',
      model: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const changeViewHandler = (event) => {
    setIsHasData(event)
  }

  return (
    <Box>
      {
        !isHasData ?
        <FilterSelectSampleParcels onChangeView={changeViewHandler} /> : 
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          <Box sx={{ 
            border: '1px solid #F0F0F0',
            padding: '16px',
            borderRadius: '8px',
          }}>
            <Box sx={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '22px',
                }}
              >
                You have selected <b>2,000</b> standard land parcels and <b>30</b> standard land parcels to survey
              </Typography>
              <Box sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                color: "#1677FF",
                cursor: "pointer",
              }} onClick={() => setIsHasData(false)}>
                <ChangeSelectionIcon />
                Change selection
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button
                sx={{
                  color: "#1677FF",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  height: '32px',
                  padding: '5px 16px',
                  '&:hover': {
                    backgroundColor: '#e6f4ff',
                    boxShadow: 'none',
                  }
                }}
                variant="text"
                startIcon={<HistogramIcon />}
                onClick={handleOpenHistogramModal}
              >
                Histogram
              </Button>
              <Button
                sx={{
                  color: "#1677FF",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  height: '32px',
                  padding: '5px 16px',
                  '&:hover': {
                    backgroundColor: '#e6f4ff',
                    boxShadow: 'none',
                  }
                }}
                variant="text"
                startIcon={<BoxPlotIcon />}
                onClick={handleOpenBoxPlotModal}
              >
                Box Plot
              </Button>
            </Box>
            <Box>
              <Grid2 container alignItems="center" spacing={1}>
                <Grid2 item>
                  <span>Select from</span>
                </Grid2>
                <Grid2 item>
                  <StyledTabs
                    value={tab}
                    onChange={handleTabChange}
                    aria-label="select from options"
                  >
                    <StyledTab icon={<TableIcon color={tab === 0 ? '#1677FF' : '#000000A6'} />} label="Table" {...a11yProps(0)} />
                    <StyledTab icon={<MapIcon />} label="Map" {...a11yProps(1)} />
                  </StyledTabs>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px', width: '100%' }}>
            <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button
                sx={{
                  color: "#000000E0",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  border: '1px solid #D9D9D9',
                  '&:hover': {
                    boxShadow: 'none',
                  },
                }}
                variant="outlined"
                startIcon={<ReplayRoundedIcon sx={{ color: '#00000073', transform: 'scaleX(-1)'}} />}
              >
                Reload
              </Button>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '16px',
                }}
              >
                Selected 3 items
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={isOnlySurveyedStandardLots} onChange={() => setIsOnlySurveyedStandardLots(!isOnlySurveyedStandardLots)} 
                  sx={{
                    '&.Mui-checked': {
                      color: "#1677FF",
                    },
                  }} 
                />
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    textAlign: 'left',
                  }}
                >
                  Only Surveyed Standard Lots
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              {
                tab === 0 ? <VisibilityOutlinedIcon sx={{ color: '#1677FF' }} /> : <VisibilityOffOutlinedIcon />
              }
              <Typography
                sx={{
                  color: tab === 0 ? '#1677FF' : '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '16px',
                }}
              >
                Parcels not selected as Standard Lots
              </Typography>
            </Box>
          </Box>
          <Box>
            {
              tab === 0 ? <SelectSampleParcelsTable /> : <SelectSampleParcelsMap />
            }
          </Box>
          <Box sx={{
            border: '1px solid #F0F0F0',
            padding: '24px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <Typography
              sx={{
                color: '#1F1F1F',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
              }}
            >
              Recalculates the land prices of the remaining Standard Lots using the Surveyed Standard Lots and the selected model.
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{
                display: 'flex',
                gap: '16px',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Box sx={{ width: '120px' }} >
                  <Typography component="label" htmlFor="year" sx={{ display: 'block', mb: 0.5 }}>
                    Year
                  </Typography>
                  <FormControl fullWidth error={formik.touched.year && Boolean(formik.errors.year)}>
                    <Select
                      id="year"
                      name="year"
                      value={formik.values.year}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      displayEmpty
                      sx={{
                        height: '40px',
                        '& fieldset': { borderColor: formik.touched.year && formik.errors.year ? 'red' : 'rgba(0, 0, 0, 0.23) !important'}
                      }}
                    >
                      <MenuItem sx={{ display: 'none' }} disabled value="">
                        <Box></Box>
                      </MenuItem>
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2023}>2023</MenuItem>
                      <MenuItem value={2022}>2022</MenuItem>
                    </Select>
                    {formik.touched.year && formik.errors.year && (
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
                        {formik.errors.year}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ width: '120px', flex: 1 }}>
                  <Typography component="label" htmlFor="year" sx={{ display: 'block', mb: 0.5 }}>
                    Model
                  </Typography>
                  <FormControl fullWidth error={formik.touched.model && Boolean(formik.errors.model)}>
                    <Select
                      id="model"
                      name="model"
                      value={formik.values.model}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      displayEmpty
                      sx={{
                        height: '40px',
                        '& fieldset': { borderColor: formik.touched.model && formik.errors.model ? 'red' : 'rgba(0, 0, 0, 0.23) !important'}
                      }}
                    >
                      <MenuItem sx={{ display: 'none' }} disabled value="">
                        <Box></Box>
                      </MenuItem>
                      <MenuItem value={10}>Model A</MenuItem>
                      <MenuItem value={20}>Model B</MenuItem>
                      <MenuItem value={30}>Model C</MenuItem>
                    </Select>
                    {formik.touched.model && formik.errors.model && (
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
                        {formik.errors.model}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                <Button
                  sx={{
                    backgroundColor: "#1677FF",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    boxShadow: 'none',
                    height: '40px',
                    '&:hover': {
                      backgroundColor: '#4096ff',
                      boxShadow: 'none',
                    }
                  }}
                  variant="contained"
                  onClick={formik.handleSubmit}
                >
                  Automatic calculation
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      }
      <HistogramModal open={isHistogramModalOpen} onClose={handleCloseHistogramModal} />
      <BoxPlotModal open={isBoxPlotModalOpen} onClose={handleCloseBoxPlotModal} />
    </Box>
  )
}

export default SelectSampleParcels