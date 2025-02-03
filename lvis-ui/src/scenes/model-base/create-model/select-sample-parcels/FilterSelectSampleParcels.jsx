import { Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FilterSelectSampleParcels = () => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    }}>
      <Box sx={{
        padding: '32px',
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ErrorOutlineIcon sx={{ color: '#00000073', fontSize: '32px' }} />
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '16px',
          }}
        >
          Please filter out the standard land parcels in the tool below.
        </Typography>
      </Box>
      <Box sx={{
        border: '1px solid #F0F0F0',
        borderRadius: '12px',
        boxShadow: '0px 24px 24px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <Box sx={{
          boxShadow: '0px -12px 24px 0px rgba(0, 0, 0, 0.04)',
          padding: '32px',
          display: "flex",
          gap: "8px",
          justifyContent: "space-between",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '22px',
              }}
            >
              Limit on the number of standard land plots:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'}}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                }}
              >
                Total Standard Lot
              </Typography>
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
                  defaultValue="2000"
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'}}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                }}
              >
                Surveyed Standard Lot
              </Typography>
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
                  defaultValue="30"
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
          </Box>
          <Box sx={{ width: '1px', height: 'auto', backgroundColor: '#0000000F' }}></Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '22px',
              }}
            >
              Exclude Land Price Outliers:
            </Typography>
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
          </Box>
          <Box sx={{ width: '1px', height: 'auto', backgroundColor: '#0000000F' }}></Box>
          <Box>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1677FF",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                boxShadow: 'none',
                padding: '16px',
                height: '100%',
                '&:hover': {
                  backgroundColor: '#4096ff',
                  boxShadow: 'none',
                }
              }}
              variant="contained"
            >
              <Box>Generate</Box>
              <Box>Random</Box>
              <Box>Standard Lot</Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FilterSelectSampleParcels