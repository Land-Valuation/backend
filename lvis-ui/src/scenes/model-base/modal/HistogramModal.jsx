import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import BarChart from "../../charts/bar/BarChart";

const HistogramModal = ({ open, onClose }) => {
  const data = [
    {
      "id": "Category 1",
      "value": 50
    },
    {
      "id": "Category 2",
      "value": 70
    },
    {
      "id": "Category 3",
      "value": 90
    },
    {
      "id": "Category 4",
      "value": 180
    },
    {
      "id": "Category 5",
      "value": 80
    },
    {
      "id": "Category 6",
      "value": 60
    },
    {
      "id": "Category 7",
      "value": 60
    },
    {
      "id": "Category 8",
      "value": 60
    }
  ]

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
          Histogram
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
          }}
        >
          <Box sx={{
            minHeight: "470px",
            height: "470px",
            width: "100%",
            borderRadius: "4px"
          }}>
            <BarChart data={data} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

HistogramModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistogramModal