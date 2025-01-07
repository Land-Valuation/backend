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

const data = [
  {
    Variable: 'Row data 1',
    Coefficient: 'Row data 1',
    Std_Error: 'Row data 1',
    t_value: 'Row data 1',
    P_value: 'Row data 1',
    VIF: 'Row data 1',
  },
  {
    Variable: 'Row data 2',
    Coefficient: 'Row data 2',
    Std_Error: 'Row data 2',
    t_value: 'Row data 2',
    P_value: 'Row data 2',
    VIF: 'Row data 2',
  },
  {
    Variable: 'Row data 3',
    Coefficient: 'Row data 3',
    Std_Error: 'Row data 3',
    t_value: 'Row data 3',
    P_value: 'Row data 3',
    VIF: 'Row data 3',
  },
  {
    Variable: 'Row data 4',
    Coefficient: 'Row data 4',
    Std_Error: 'Row data 4',
    t_value: 'Row data 4',
    P_value: 'Row data 4',
    VIF: 'Row data 4',
  },
  {
    Variable: 'Row data 5',
    Coefficient: 'Row data 5',
    Std_Error: 'Row data 5',
    t_value: 'Row data 5',
    P_value: 'Row data 5',
    VIF: 'Row data 5',
  },
  {
    Variable: 'Row data 6',
    Coefficient: 'Row data 6',
    Std_Error: 'Row data 6',
    t_value: 'Row data 6',
    P_value: 'Row data 6',
    VIF: 'Row data 6',
  },
  {
    Variable: 'Row data 7',
    Coefficient: 'Row data 7',
    Std_Error: 'Row data 7',
    t_value: 'Row data 7',
    P_value: 'Row data 7',
    VIF: 'Row data 7',
  },
  {
    Variable: 'Row data 8',
    Coefficient: 'Row data 8',
    Std_Error: 'Row data 8',
    t_value: 'Row data 8',
    P_value: 'Row data 8',
    VIF: 'Row data 8',
  },
  {
    Variable: 'Row data 9',
    Coefficient: 'Row data 9',
    Std_Error: 'Row data 9',
    t_value: 'Row data 9',
    P_value: 'Row data 9',
    VIF: 'Row data 9',
  },
  {
    Variable: 'Row data 10',
    Coefficient: 'Row data 10',
    Std_Error: 'Row data 10',
    t_value: 'Row data 10',
    P_value: 'Row data 10',
    VIF: 'Row data 10',
  },
];

const columns = [
  { title: 'Variable', dataIndex: 'Variable', key: 'Variable' },
  { title: 'Coefficient', dataIndex: 'Coefficient', key: 'Coefficient' },
  { title: 'Std_Error', dataIndex: 'Std_Error', key: 'Std_Error' },
  { title: 't_value', dataIndex: 't_value', key: 't_value' },
  { title: 'P_value', dataIndex: 'P_value', key: 'P_value' },
  { title: 'VIF', dataIndex: 'VIF', key: 'VIF' },
];

const FeatureModal = ({ open, onClose }) => {

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
            Features : 000, 000, 000, 000 ,000, 000
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
          <CustomTable dataSource={data} columns={columns} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

FeatureModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FeatureModal;