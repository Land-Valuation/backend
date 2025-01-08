import { Box, Button, Grid2, MenuItem, Select, Typography } from "@mui/material"
import { useState } from "react";
import { a11yProps, StyledButton, StyledButtonGroup, StyledTab, StyledTabs } from "../common";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import MapIcon from '@mui/icons-material/Map';
import DefineModelTable from "./DefineModelTable";
import DefineModelMap from "./DefineModelMap";

const DefineModelArea = () => {
  const [activeButton, setActiveButton] = useState('village');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [tab, setTab] = useState(0);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        <StyledButtonGroup variant="outlined" size="medium" aria-label="contained button group">
          <StyledButton
            active={activeButton === 'village'}
            onClick={() => handleButtonClick('village')}
          >
            By Village Boundary
          </StyledButton>
          <StyledButton
            active={activeButton === 'assessment'}
            onClick={() => handleButtonClick('assessment')}
          >
            By Assessment Area
          </StyledButton>
        </StyledButtonGroup>
        <Select
          labelId="province-label"
          id="province-select"
          value={province}
          onChange={handleProvinceChange}
          displayEmpty
          size="small"
          sx={{ minWidth: '180px' }}
        >
          <MenuItem disabled value="">
            <Box>List of province</Box>
          </MenuItem>
          <MenuItem value={10}>Province A</MenuItem>
          <MenuItem value={20}>Province B</MenuItem>
          <MenuItem value={30}>Province C</MenuItem>
        </Select>
        <Select
          labelId="district-label"
          id="district-select"
          value={district}
          onChange={handleDistrictChange}
          size="small"
          displayEmpty
          sx={{ minWidth: '180px' }}
        >
          <MenuItem disabled value="">
            <Box>List of district</Box>
          </MenuItem>
          <MenuItem value={10}>District A</MenuItem>
          <MenuItem value={20}>District B</MenuItem>
          <MenuItem value={30}>District C</MenuItem>
        </Select>
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
            startIcon={<ReplayRoundedIcon sx={{ color: '#00000073'}} />}
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
            tab === 0 ? <DefineModelTable /> : <DefineModelMap />
          }
        </Box>
    </Box>
  )
}

export default DefineModelArea