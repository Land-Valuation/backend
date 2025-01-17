import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import EmptyIcon from "../../../assets/icons/model-base/EmptyIcon";
import { CalendarIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const SurveyInformation = ({ open, onClose }) => {
  const [selectDate, setSelectDate] = useState(null);

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
          Applied Areas
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
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '24px',
                mb: '8px',
              }}
            >
              General Info
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ flexBasis: '25%', paddingRight: '32px' }}>
                <Box sx={{ borderRight: '1px solid #0000000F', paddingRight: '16px'}}>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Provinces
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Vientiane 
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flexBasis: '25%', paddingRight: '32px' }}>
                <Box sx={{ borderRight: '1px solid #0000000F', paddingRight: '16px'}}>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Provinces
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Vientiane 
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flexBasis: '25%', paddingRight: '32px' }}>
                <Box sx={{ borderRight: '1px solid #0000000F', paddingRight: '16px'}}>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Provinces
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Vientiane 
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flexBasis: '25%', paddingRight: '32px' }}>
                <Box>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Provinces
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '22px',
                      mb: '8px',
                    }}
                  >
                    Vientiane 
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: '1px', backgroundColor: '#0000000F' }}></Box>
          <Box>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px',
              }}
            >
              Register Survey Information
            </Typography>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '400px',
              }}
            >
              <Box 
                sx={{
                  width: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
                <EmptyIcon />
                <Typography
                  sx={{
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  Select a survey date and register the survey information
                </Typography>
                <Box 
                  sx={{ 
                    width: '100%', 
                    '& .MuiTextField-root': {
                      width: '100%',
                    }
                  }}
                >
                  <Typography component="label" htmlFor="characteristic9" sx={{ 
                    color: '#000000E0',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    textAlign: 'center',
                    mb: '8px',
                  }}>
                    <Typography component="span" sx={{ color: 'red' }}>*</Typography> Survey Date
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
                              width: '100%',
                            },
                            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
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
                    width: '100%',
                  }}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Create survey
                </Button>
              </Box>
            </Box>
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SurveyInformation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SurveyInformation