import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomTable from '../../../components/customMUI/CustomTable';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const data = [
  { parcelId: 'A1-125', price: '6,000,000', province: 'Row data 5', district: 'Row data 5' },
  { parcelId: 'A1-125', price: '5,000,000', province: 'Row data 6', district: 'Row data 6' },
  { parcelId: 'A1-125', price: '5,000,000', province: 'Row data 7', district: 'Row data 7' },
  { parcelId: 'A1-125', price: '5,000,000', province: 'Row data 8', district: 'Row data 8' },
  { parcelId: 'A1-125', price: '5,000,000', province: 'Row data 9', district: 'Row data 9' },
  { parcelId: 'A1-125', price: '5,000,000', province: 'Row data 10', district: 'Row data 10' },
];

const AppliedAreasDialog = ({ open, onClose }) => {
  const { t } = useTranslation();

  const columns = [
    { title: t('parcelID'), dataIndex: 'parcelId', key: 'parcelId' },
    { title: t('price'), dataIndex: 'price', key: 'price', align: 'right' },
    { title: t('province'), dataIndex: 'province', key: 'province' },
    { title: t('district'), dataIndex: 'district', key: 'district' },
  ];

  const letters = Array.from({ length: 7 }, (_, i) => `A${i + 1}`);
  const [letterSelected, setLetterSelected] = useState('A1')

  const selectLetter = (year) => {
    setLetterSelected(year);
  }

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
            {t('appliedAreas')}
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
            padding: '16px 0',
          }}
        >
          <Box sx={{ minWidth: '80px' }}>
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '16px',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              {t('areas')}
            </Typography>
            {letters && letters.length > 0 && letters.map((letter) => (
              <Box
                key={letter}
                onClick={() => selectLetter(letter)}
                sx={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  backgroundColor: letter === letterSelected ? '#E6F4FF' : 'transparent',
                  color: letter === letterSelected ? '#1677FF' : '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: letter === letterSelected ? 600 : 400,
                  lineHeight: '20px',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                {letter}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              flex: '1 1 0%'
            }}
          >
            <Typography
              sx={{
                color: '#000000E0',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '16px',
                marginBottom: '12px',
              }}
            >
              {t('listParcels')}
            </Typography>
            <CustomTable dataSource={data} columns={columns} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

AppliedAreasDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AppliedAreasDialog;