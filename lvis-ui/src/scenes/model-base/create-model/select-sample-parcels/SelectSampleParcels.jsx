import { Box, Button, Grid2, Typography } from "@mui/material"
import DefineModelTable from "../define-model-area/DefineModelTable"
import { a11yProps, StyledTab, StyledTabs } from "../common"
import { useState } from "react";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import MapIcon from '@mui/icons-material/Map';

const SelectSampleParcels = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        
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
          <DefineModelTable />
        </Box>
    </Box>
  )
}

export default SelectSampleParcels