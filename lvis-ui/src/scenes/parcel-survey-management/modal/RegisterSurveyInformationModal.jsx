import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import { CalendarIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const RegisterSurveyInformationModal = ({ open, onClose }) => {
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
          Register Survey Information
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
          <Box sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '24px',
              }}
            >
              Surveyed Date
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
                        width: '160px',
                        borderRadius: '6px'
                      },
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                    },
                  },
                }}
              />
            </LocalizationProvider>
             
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
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

RegisterSurveyInformationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterSurveyInformationModal