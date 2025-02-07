import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Radio, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import MarkerIcon from '../../../assets/icons/model-base/MarkerIcon';
import { useState } from 'react';
import ValuationMap from '../../../components/map/ValuationMap';
import { useTranslation } from 'react-i18next';

const SelectSampleParcelLandModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const data = [
    {
      idPrefix: 'A1',
      idNumber: '001',
      description: 'Soukthavy Thephavong, 12 Ru',
      area: '100,000 m²',
      price: '1,000,000 LAK/m²',
    },
    {
      idPrefix: 'A1',
      idNumber: '002',
      description: 'Soukthavy Thephavong, 12 Ru',
      area: '100,000 m²',
      price: '1,000,000 LAK/m²',
    },
    {
      idPrefix: 'A1',
      idNumber: '003',
      description: 'Soukthavy Thephavong, 12 Ru',
      area: '100,000 m²',
      price: '1,000,000 LAK/m²',
    },
    {
      idPrefix: 'A1',
      idNumber: '004',
      description: 'Soukthavy Thephavong, 12 Ru',
      area: '100,000 m²',
      price: '1,000,000 LAK/m²',
    },
    {
      idPrefix: 'A1',
      idNumber: '005',
      description: 'Soukthavy Thephavong, 12 Ru',
      area: '100,000 m²',
      price: '1,000,000 LAK/m²',
    },
    {
      idPrefix: 'B2',
      idNumber: '001',
      description: 'Soukthavy Thephavong, 12 Ruiririr',
      area: '100,000 m²',
      price: '? LAK/m²',
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
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
          {t('selectSampleParcel')}
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
            gap: '24px',
            pt: '16px'
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            minWidth: '300px',
          }}>
            <Box>
              <Box sx={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                mb: '12px',
              }}>
                <MarkerIcon color='#F65751' />
                <Typography
                  sx={{
                    color: '#000000E0', 
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  {t('parcelNeedValuation')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#F8F8F8',
                  cursor: 'pointer',
                  gap: '12px',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: '#000000E0', 
                      fontFamily: 'Poppins',
                      fontSize: '12px',
                      fontWeight: 600,
                      lineHeight: '17px',
                      textAlign: 'center',
                    }}
                  >
                    B2
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000E0', 
                      fontFamily: 'Poppins',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '17px',
                      textAlign: 'center',
                    }}
                  >
                    001
                  </Typography>
                </Box>
                <Box sx={{ width: '1px', height: '40px', backgroundColor: '#0000000F'}}></Box>
                <Box>
                  <Typography
                    sx={{
                      color: '#000000E0', 
                      fontFamily: 'Poppins',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '17px',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      maxWidth: '100%',
                      mb: '4px',
                    }}
                  >
                    Soukthavy Thephavong, 12 Ruiririr
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}>
                    <Typography
                      sx={{
                        color: '#00000073', 
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textAlign: 'center',
                      }}
                    >
                      100,000 m2
                    </Typography>
                    <Typography
                      sx={{
                        color: '#00000073', 
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textAlign: 'center',
                      }}
                    >
                      ? LAK/m2
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                mb: '12px',
              }}>
                <MarkerIcon />
                <Typography
                  sx={{
                    color: '#000000E0', 
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  {t('referenceParcels')}
                </Typography>
              </Box>
              {data.map((item) => (
                <Box
                  key={`${item.idPrefix}-${item.idNumber}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#9FCEFF' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    backgroundColor: selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#E6F4FF' : '#F8F8F8',
                    cursor: 'pointer',
                    gap: '12px',
                    marginBottom: '8px', // Added margin for spacing
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#1677FF' : '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: '17px',
                        textAlign: 'center',
                      }}
                    >
                      {item.idPrefix}
                    </Typography>
                    <Typography
                      sx={{
                        color: selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#1677FF' : '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '17px',
                        textAlign: 'center',
                      }}
                    >
                      {item.idNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '1px', height: '40px', backgroundColor: '#0000000F' }}></Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#1677FF' : '#000000E0',
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '17px',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        maxWidth: '180px',
                        mb: '4px',
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                      }}
                    >
                      <Typography
                        sx={{
                          color: selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#1677FF' : '#00000073',
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '17px',
                          textAlign: 'center',
                        }}
                      >
                        {item.area}
                      </Typography>
                      <Typography
                        sx={{
                          color: selectedValue === `${item.idPrefix}-${item.idNumber}` ? '#1677FF' : '#00000073',
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '17px',
                          textAlign: 'center',
                        }}
                      >
                        {item.price}
                      </Typography>
                    </Box>
                  </Box>
                  <Radio
                    checked={selectedValue === `${item.idPrefix}-${item.idNumber}`}
                    onChange={handleChange}
                    value={`${item.idPrefix}-${item.idNumber}`}
                    name="item-selection"
                    sx={{ 
                      '& .MuiSvgIcon-root': { fontSize: 20 }, 
                      '&.Mui-checked': {
                        color: "#1677FF",
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #F0F0F0',
              overflow: 'hidden',
            }}
          >
            <ValuationMap />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{
        padding: '0 24px 24px 24px'
      }}>
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
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
        <Button
          sx={{
            backgroundColor: "#1677FF",
            color: "#fff",
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            minWidth: "32px",
            height: "32px",
            boxShadow: "none",
          }}
          variant="contained"
          type="submit"
        >
          {t('ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SelectSampleParcelLandModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SelectSampleParcelLandModal