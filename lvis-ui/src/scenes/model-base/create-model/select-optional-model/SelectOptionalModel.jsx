import { Box, Button, IconButton, TextField, Typography } from "@mui/material"
import { BorderLinearProgress } from "../common"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SelectOptionalModelTable from "./SelectOptionalModelTable";
import { useTranslation } from 'react-i18next';

const SelectOptionalModel = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '100%',
    }}>
      <Box sx={{
        border: '1px solid #F0F0F0',
        borderRadius: '8px',
      }}>
        <Box>
          <Box sx={{
            padding: '24px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '22px',
                  }}
                >
                  {t('adjRSquare')}
                </Typography>
                <Box>
                  <ArrowBackIosNewIcon sx={{ fontSize: 14, color: '#00000073' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    border: '1px solid #D9D9D9',
                    backgroundColor: '#00000005',
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}>
                    <IconButton aria-label="decrease">
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    defaultValue="0.50"
                    sx={{ 
                      width: 80, 
                      textAlign: 'center', 
                      borderRadius: 0,
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' },
                      '& .MuiInputBase-root' : {
                        borderRadius: 0,
                        height: 38, 
                      }
                    }}
                    inputProps={{ style: { textAlign: 'center', borderRadius: 0 } }}
                  />
                  <Box sx={{ 
                    border: '1px solid #D9D9D9',
                    backgroundColor: '#00000005',
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}>
                    <IconButton aria-label="increase">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '22px',
                  }}
                >
                  {t('fStatistic')}
                </Typography>
                <Box>
                  <ArrowBackIosNewIcon sx={{ fontSize: 14, color: '#00000073' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    border: '1px solid #D9D9D9',
                    backgroundColor: '#00000005',
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}>
                    <IconButton aria-label="decrease">
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    defaultValue="1.50"
                    sx={{ 
                      width: 80, 
                      textAlign: 'center', 
                      borderRadius: 0,
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' },
                      '& .MuiInputBase-root' : {
                        borderRadius: 0,
                        height: 38, 
                      }
                    }}
                    inputProps={{ style: { textAlign: 'center', borderRadius: 0 } }}
                  />
                  <Box sx={{ 
                    border: '1px solid #D9D9D9',
                    backgroundColor: '#00000005',
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}>
                    <IconButton aria-label="increase">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box>
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
                  startIcon={<RestartAltIcon />}
                >
                  {t('runAnalysis')}
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <Typography
                sx={{
                  color: '#000000A6',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                }}
              >
                {t('analyzingVariables')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography
                  sx={{
                    color: '#1677FF',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  100
                </Typography>
                <Typography
                  sx={{
                    color: '#000000A6',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  /1000
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <BorderLinearProgress variant="determinate" value={50} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '22px',
            mb: '16px',
          }}
        >
          {t('analysisResults')}
        </Typography>
        <Box>
          <SelectOptionalModelTable />
        </Box>
      </Box>
    </Box>
  )
}

export default SelectOptionalModel