import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

 const FinalizeAdjustmentTable = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '16px',
        border: '1px solid #F0F0F0',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22px',
            width: '100%',
            maxWidth: '730px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Model Description: Independent Variables(Variable Name/Coefficient), Accuracy 1, Accuracy 2, Accuracy 3
        </Typography>
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
          Adjustment Table
        </Button>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 0.5 }}>
                Title <Typography component="span" sx={{ color: 'red' }}>*</Typography>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter title"
                variant="outlined"
                size="small"
                sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
              />
            </Box>
            <Box sx={{ flexShrink: 0, width: 150 }}>
              <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 0.5 }}>
                Base year <Typography component="span" sx={{ color: 'red' }}>*</Typography>
              </Typography>
              <TextField
                fullWidth
                value="2024"
                variant="outlined"
                size="small"
                sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarMonthIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 0.5 }}>
              Note
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter content"
              multiline
              rows={1}
              variant="outlined"
              size="small"
              sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FinalizeAdjustmentTable