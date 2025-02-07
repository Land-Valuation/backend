import { Box, Button, Grid2, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { a11yProps, StyledButton, StyledButtonGroup, StyledTab, StyledTabs } from "../common";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import MapIcon from '@mui/icons-material/Map';
import DefineModelTable from "./DefineModelTable";
import DefineModelMap from "./DefineModelMap";
import TableIcon from "../../../../assets/icons/model-base/TableIcon";
import { useTranslation } from 'react-i18next'; // Import translation hook

const DefineModelArea = () => {
  const { t } = useTranslation(); // Initialize translation hook

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
            {t('byVillageBoundary')}
          </StyledButton>
          <StyledButton
            active={activeButton === 'assessment'}
            onClick={() => handleButtonClick('assessment')}
          >
            {t('byAssessmentArea')}
          </StyledButton>
        </StyledButtonGroup>
        <Select
          labelId="province-label"
          id="province-select"
          value={province}
          onChange={handleProvinceChange}
          displayEmpty
          size="small"
          sx={{ minWidth: '180px', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
        >
          <MenuItem sx={{ display: 'none' }} disabled value="">
            <Box>{t('listOfProvinces')}</Box>
          </MenuItem>
          <MenuItem value={10}>{t('provinceA')}</MenuItem>
          <MenuItem value={20}>{t('provinceB')}</MenuItem>
          <MenuItem value={30}>{t('provinceC')}</MenuItem>
        </Select>
        <Select
          labelId="district-label"
          id="district-select"
          value={district}
          onChange={handleDistrictChange}
          size="small"
          displayEmpty
          sx={{ minWidth: '180px', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
        >
          <MenuItem sx={{ display: 'none' }} disabled value="">
            <Box>{t('listOfDistricts')}</Box>
          </MenuItem>
          <MenuItem value={10}>{t('districtA')}</MenuItem>
          <MenuItem value={20}>{t('districtB')}</MenuItem>
          <MenuItem value={30}>{t('districtC')}</MenuItem>
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
            startIcon={<ReplayRoundedIcon sx={{ color: '#00000073', transform: 'scaleX(-1)'}} />}
          >
            {t('reload')}
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
            {t('selectedItems', { count: 3 })}
          </Typography>
        </Box>
        <Box>
          <Grid2 container alignItems="center" spacing={1}>
            <Grid2 item>
              {t('selectFrom')}
            </Grid2>
            <Grid2 item>
              <StyledTabs
                value={tab}
                onChange={handleTabChange}
                aria-label="select from options"
              >
                <StyledTab icon={<TableIcon color={tab === 0 ? '#1677FF' : '#000000A6'} />} label={t('table')} {...a11yProps(0)} />
                <StyledTab icon={<MapIcon />} label={t('map')} {...a11yProps(1)} />
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