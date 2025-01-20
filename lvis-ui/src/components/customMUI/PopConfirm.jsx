import { useState } from 'react';
import {
  Button,
  Popover,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

const PopConfirm = ({
  title,
  content,
  onConfirm,
  onCancel,
  children,
  placement = 'bottom',
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  return (
    <>
      <div onClick={handleClick} style={{display: 'inline-block'}}>
        {children}
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: placement === 'top' ? 'bottom' : 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: placement === 'top' ? 'top' : 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
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
            {title}
          </Typography>
          <Typography
            sx={{
              color: '#000000E0',
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '22px',
            }}
          >
            {content}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
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
                height: '24px',
                '&:hover': {
                  backgroundColor: '#e6f4ff',
                  boxShadow: 'none',
                }
              }}
              variant={"outlined"}
              onClick={handleCancel}
            >
              No
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
                lineHeight: "20px",
                boxShadow: 'none',
                height: '24px',
                '&:hover': {
                  backgroundColor: '#4096ff',
                  boxShadow: 'none',
                }
              }}
              variant="contained"
              onClick={handleConfirm}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

PopConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom']),
};

export default PopConfirm;