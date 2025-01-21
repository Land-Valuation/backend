import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImagePreview = ({ imageUrl, altText = '', open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '90%',
          maxHeight: '90vh',
          outline: 'none',
          overflow: 'auto',
          borderRadius: '8px'
        }}
      >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'fixed', // Change to fixed position
          top: 16,         // Adjust top padding
          right: 16,        // Adjust right padding
          color: 'white',
          zIndex: 1000, // Ensure it's on top
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <CloseIcon />
      </IconButton>

      <img
        src={imageUrl}
        alt={altText}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      />
      </Box>
    </Modal>
  );
};

ImagePreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagePreview;