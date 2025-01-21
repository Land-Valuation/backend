import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import EmptyIcon from "../../../assets/icons/model-base/EmptyIcon";
import { CalendarIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "../../../assets/icons/parcel-survey/EditIcon";
import FileViewer from "../../../components/FileViewer";

const SurveyInformation = ({ open, onClose, createHandle, isHasData }) => {
  const [selectDate, setSelectDate] = useState(null);
  // const [isHasData] = useState(false)
  const [surveyDate, setSurveyDate] = useState('');

  const fileList = [
    {
      fileId: '1',
      fileName: '123.png',
      url: 'https://www.vietnambooking.com/wp-content/uploads/2018/12/doc-mien-dat-nuoc-chiem-nguong-canh-dep-viet-nam-19122018-10.jpg',
    },
    {
      fileId: '2',
      fileName: '123.png',
      url: 'https://i.pinimg.com/236x/e5/e3/87/e5e387143f60775541b38e47b8fbf40b.jpg',
    },
    {
      fileId: '3',
      fileName: '123.png',
      url: 'https://www.chudu24.com/wp-content/uploads/2017/03/canh-dep-nhat-ban-5.jpg',
    },{
      fileId: '4',
      fileName: '123.png',
      url: 'https://www.vietnambooking.com/wp-content/uploads/2018/12/doc-mien-dat-nuoc-chiem-nguong-canh-dep-viet-nam-19122018-10.jpg',
    },
    {
      fileId: '5',
      fileName: '123.png',
      url: 'https://www.vietnambooking.com/wp-content/uploads/2018/12/doc-mien-dat-nuoc-chiem-nguong-canh-dep-viet-nam-19122018-10.jpg',
    },
    {
      fileId: '6',
      fileName: '123.png',
      url: 'https://www.vietnambooking.com/wp-content/uploads/2018/12/doc-mien-dat-nuoc-chiem-nguong-canh-dep-viet-nam-19122018-10.jpg',
    },
  ]

  const handleSurveyDateChange = (event) => {
    setSurveyDate(event.target.value);
  };

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
          Survey Information
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: '16px',
              }}
            >
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
              {
                isHasData &&
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
                    boxShadow: 'none'
                  }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => createHandle(true)}
                >
                  Add new
                </Button>
              }
            </Box>
            {
              !isHasData ? 
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
                    onClick={() => createHandle(true)}
                  >
                    Create survey
                  </Button>
                </Box>
              </Box> : 
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px'}}>
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
                    Surveyed Date:
                  </Typography>
                  <Select
                    labelId="survey-date"
                    id="survey-date-select"
                    value={surveyDate}
                    onChange={handleSurveyDateChange}
                    displayEmpty
                    size="small"
                    sx={{ minWidth: '140px', height: '32px', borderRadius: '6px', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
                  >
                    <MenuItem sx={{ display: 'none' }} disabled value="">
                      <Box>Date</Box>
                    </MenuItem>
                    <MenuItem value={10}>04-12-2020</MenuItem>
                    <MenuItem value={20}>04-12-2020</MenuItem>
                    <MenuItem value={30}>04-12-2020</MenuItem>
                  </Select>
                  <Button
                    sx={{
                      backgroundColor: "#fff",
                      color: "#1677FF",
                      textTransform: "none",
                      borderRadius: "6px",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      boxShadow: 'none',
                      border: '1px solid #1677FF',
                      height: '32px',
                      '&:hover': {
                        backgroundColor: '#e6f4ff',
                        boxShadow: 'none',
                      }
                    }}
                    variant={"outlined"}
                    startIcon={<EditIcon />}
                  >
                    Edit current date data
                  </Button>
                </Box>
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      Building Information
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ flexBasis: '20%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '20%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '20%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '20%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '20%', paddingRight: '20px' }}>
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
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      Building Information
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      Price Information
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ flexBasis: '50%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '50%', paddingRight: '20px' }}>
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
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      Building Information
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                    <Box sx={{ flexBasis: '25%', paddingRight: '20px' }}>
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
                <Box sx={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '18px', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    padding: '0 8px',
                    backgroundColor: '#FFF'
                  }}>
                    <Typography
                      sx={{
                        color: '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                      }}
                    >
                      Attach image
                    </Typography>
                  </Box>
                  <Box>
                    <FileViewer fileList={fileList} />
                  </Box>
                </Box>
              </Box>
            }
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
  isHasData: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createHandle: PropTypes.func,
};

export default SurveyInformation