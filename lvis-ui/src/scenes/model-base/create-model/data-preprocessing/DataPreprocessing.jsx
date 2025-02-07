import { Box, Button, Checkbox, MenuItem, Select, Typography } from "@mui/material"
import { useState } from "react"
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import SortIcon from "../../../../assets/icons/model-base/SortIcon";
import CustomTableDataPreprocessing from "./CustomTableDataPreprocessing";
import { useTranslation } from 'react-i18next';

const DataPreprocessing = () => {
  const { t } = useTranslation();
  const [adjLength, setAdjLength] = useState(false)
  const [saveAdjLength, setSaveAdjLength] = useState(false)
  const [binningMethod, setBinningMethod] = useState('');
  const [binningMethodValue, setBinningMethodValue] = useState(5);

  const handleBinningMethodChange = (event) => {
    setBinningMethod(event.target.value);
  };

  const handleBinningMethodValueChange = (event) => {
    setBinningMethodValue(event.target.value);
  };

  const data = [
    { id: 1, value1: 100, value2: 200 },
    { id: 2, value1: 200, value2: 300 },
    { id: 3, value1: 300, value2: 400 },
    { id: 4, value1: 400, value2: 500 },
    { id: 5, value1: 500, value2: 600 },
    { id: 6, value1: 600, value2: 700 },
    { id: 7, value1: 700, value2: 800 },
  ];

  const data1 = [
    { id: 3, value1: 'Ef', value2: 'Ef' },
    { id: 2, value1: 'N', value2: 'N' },
    { id: 1, value1: 'NE', value2: 'NE' },
    { id: 4, value1: 'UAa', value2: 'UAa' },
    { id: 5, value1: 'UBb', value2: 'UBb' },
    { id: 6, value1: 'UDb', value2: 'UDb' },
    { id: 7, value1: 'UEa', value2: 'UEa' },
    { id: 8, value1: 'UEb', value2: 'UEb' },
    { id: 9, value1: 'UEi', value2: 'UEi' },
    { id: 10, value1: 'UF', value2: 'UF' },
  ];

  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
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
        >
          {t('default')}
        </Button>
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
        >
          {t('applyAll')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 8px 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={adjLength} onChange={() => setAdjLength(!adjLength)} 
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
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    textAlign: 'left',
                  }}
                >
                  {t('roadFrontageLength')}
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: saveAdjLength ? "#1677FF" : "#fff",
                  color: saveAdjLength ? "#fff" : "#1677FF",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  border: saveAdjLength ? '1px solid #0000001A' : '1px solid #1677FF',
                  height: '32px',
                  '&:hover': {
                    boxShadow: 'none',
                  }
                }}
                variant={saveAdjLength ? "contained" : "outlined"}
                onClick={() => setSaveAdjLength(!saveAdjLength)}
              >
                {saveAdjLength ? t('saved') : t('apply')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px', backgroundColor: '#F5F5F5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <Select
                  value={binningMethod}
                  onChange={handleBinningMethodChange}
                  size="small"
                  sx={{ minWidth: '200px', backgroundColor: '#fff', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
                >
                  <MenuItem value={10}>{t('binningMethod')}</MenuItem>
                  <MenuItem value={20}>{t('binningMethod')}</MenuItem>
                  <MenuItem value={30}>{t('binningMethod')}</MenuItem>
                </Select>
                <Select
                  value={binningMethodValue}
                  onChange={handleBinningMethodValueChange}
                  size="small"
                  sx={{ width: '70px', backgroundColor: '#fff', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckOutlinedIcon />
                <Typography
                  sx={{
                    color: '#000000A6',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {t('bestSuggestionFollowed')}
                </Typography>
              </Box>
              <Box>
                <CustomTableDataPreprocessing data={data} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 8px 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={adjLength} onChange={() => setAdjLength(!adjLength)} 
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
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    textAlign: 'left',
                  }}
                >
                  {t('descriptionField')}
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: saveAdjLength ? "#1677FF" : "#fff",
                  color: saveAdjLength ? "#fff" : "#1677FF",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  border: saveAdjLength ? '1px solid #0000001A' : '1px solid #1677FF',
                  height: '32px',
                  '&:hover': {
                    boxShadow: 'none',
                  }
                }}
                variant={saveAdjLength ? "contained" : "outlined"}
                onClick={() => setSaveAdjLength(!saveAdjLength)}
              >
                {saveAdjLength ? t('saved') : t('apply')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px', backgroundColor: '#F5F5F5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <Select
                  value={binningMethod}
                  onChange={handleBinningMethodChange}
                  size="small"
                  sx={{ minWidth: '200px', backgroundColor: '#fff', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
                >
                  <MenuItem value={10}>{t('binningMethod')}</MenuItem>
                  <MenuItem value={20}>{t('binningMethod')}</MenuItem>
                  <MenuItem value={30}>{t('binningMethod')}</MenuItem>
                </Select>
                <Select
                  value={binningMethodValue}
                  onChange={handleBinningMethodValueChange}
                  size="small"
                  sx={{ width: '70px', backgroundColor: '#fff', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <SortIcon />
                <Typography
                  sx={{
                    color: '#1677FF',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {t('bestArrangement')}
                </Typography>
              </Box>
              <Box>
                <CustomTableDataPreprocessing data={data} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 8px 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={adjLength} onChange={() => setAdjLength(!adjLength)} 
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
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    textAlign: 'left',
                  }}
                >
                  {t('landUse')}
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: saveAdjLength ? "#1677FF" : "#fff",
                  color: saveAdjLength ? "#fff" : "#1677FF",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  border: saveAdjLength ? '1px solid #0000001A' : '1px solid #1677FF',
                  height: '32px',
                  '&:hover': {
                    boxShadow: 'none',
                  }
                }}
                variant={saveAdjLength ? "contained" : "outlined"}
                onClick={() => setSaveAdjLength(!saveAdjLength)}
              >
                {saveAdjLength ? t('saved') : t('apply')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px', backgroundColor: '#F5F5F5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <SortIcon />
                <Typography
                  sx={{
                    color: '#1677FF',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {t('bestArrangement')}
                </Typography>
              </Box>
              <Box>
                <CustomTableDataPreprocessing data={data1} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 8px 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={adjLength} onChange={() => setAdjLength(!adjLength)} 
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
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    textAlign: 'left',
                  }}
                >
                  {t('descriptionField')}
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: saveAdjLength ? "#1677FF" : "#fff",
                  color: saveAdjLength ? "#fff" : "#1677FF",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  boxShadow: 'none',
                  border: saveAdjLength ? '1px solid #0000001A' : '1px solid #1677FF',
                  height: '32px',
                  '&:hover': {
                    boxShadow: 'none',
                  }
                }}
                variant={saveAdjLength ? "contained" : "outlined"}
                onClick={() => setSaveAdjLength(!saveAdjLength)}
              >
                {saveAdjLength ? t('saved') : t('apply')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px', backgroundColor: '#F5F5F5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckOutlinedIcon />
                <Typography
                  sx={{
                    color: '#000000A6',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
                >
                  {t('bestSuggestionFollowed')}
                </Typography>
              </Box>
              <Box>
                <CustomTableDataPreprocessing data={data1} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DataPreprocessing