import { Box, Button, FormControl, Grid2, InputAdornment, OutlinedInput, Typography } from "@mui/material"
import { a11yProps, StyledTab, StyledTabs } from "../common"
import { useState } from "react";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import MapIcon from '@mui/icons-material/Map';
import HistogramIcon from "../../../../assets/icons/model-base/HistogramIcon";
import BoxPlotIcon from "../../../../assets/icons/model-base/BoxPlotIcon";
import HistogramModal from "../../modal/HistogramModal";
import BoxPlotModal from "../../modal/BoxPlotModal";
import SelectSampleParcelsMap from "./SelectSampleParcelsMap";
import SelectSampleParcelsTable from "./SelectSampleParcelsTable";

const SelectSampleParcels = () => {
  const [tab, setTab] = useState(0);
  const [isHistogramModalOpen, setIsHistogramModalOpen] = useState(false)
  const [isBoxPlotModalOpen, setIsBoxPlotModalOpen] = useState(false)

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ 
        border: '1px solid #F0F0F0',
        padding: '16px',
        borderRadius: '8px',
       }}>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '22px',
            marginBottom: '16px',
          }}
        >
          Exclude Land Price Outliers :
        </Typography>
        <Box sx={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
              }}
            >
              Lower Bound
            </Typography>
            <FormControl sx={{ width: '100px' }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
              }}
            >
              Lower Bound
            </Typography>
            <FormControl sx={{ width: '100px' }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
              />
            </FormControl>
          </Box>
          <Button
            sx={{
              backgroundColor: "#1677FF",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              boxShadow: 'none',
              height: '40px',
              '&:hover': {
                backgroundColor: '#4096ff',
                boxShadow: 'none',
              }
            }}
            variant="contained"
          >
            Exclude Selection
          </Button>
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
        </Box>
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
                <StyledTab icon={<TableRowsOutlinedIcon />} label="Table" {...a11yProps(0)} />
                <StyledTab icon={<MapIcon />} label="Map" {...a11yProps(1)} />
              </StyledTabs>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Box>
        {
          tab === 0 ? <SelectSampleParcelsTable /> : <SelectSampleParcelsMap />
        }
      </Box>
      <HistogramModal open={isHistogramModalOpen} onClose={handleCloseHistogramModal} />
      <BoxPlotModal open={isBoxPlotModalOpen} onClose={handleCloseBoxPlotModal} />
    </Box>
  )
}

export default SelectSampleParcels