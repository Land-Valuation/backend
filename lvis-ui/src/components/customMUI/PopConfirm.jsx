import { useState, useEffect, useRef } from 'react';
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
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState('bottom'); // Initialize default placement
  const open = Boolean(anchorEl);
  const popoverRef = useRef(null); // Ref for the popover element
  const triggerRef = useRef(null);

  const handlePlacement = () => {
    if (!triggerRef.current || !popoverRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const spaceAbove = triggerRect.top;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;
    let newPlacement = 'bottom';

    if (spaceAbove > popoverRect.height + 20) {
      newPlacement = 'top';
    }
    else if (spaceRight > popoverRect.width + 20){
      newPlacement = 'right';
    }
    else if (spaceLeft > popoverRect.width + 20){
      newPlacement = 'left';
    }

    setPlacement(newPlacement);
  };


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

  useEffect(() => {
    if (open) {
      handlePlacement();
    }
  }, [open]);

  return (
    <>
      <div onClick={handleClick} style={{ display: 'inline-block', position: 'relative' }} ref={triggerRef}>
        {children}
        {open && (
            <Box
              sx={{
              position: 'absolute',
              zIndex: 9999,
              top: placement === 'top' ? '100%' : placement === 'bottom' ? 'auto' : '50%',
              bottom: placement === 'bottom' ? '100%' : 'auto',
              left: placement === 'right' ? 'auto' : placement === 'left' ? '100%' : '50%',
              right: placement === 'right' ? '100%' : 'auto',
              transform: placement === 'top' || placement === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                borderLeft: placement === 'right' ? 'none' :  '8px solid transparent',
                borderRight: placement === 'left' ? 'none' : '8px solid transparent',
                borderTop: placement === 'bottom' ? '8px solid #fff' : placement === 'left' ? '8px solid transparent' : 'none',
                borderBottom: placement === 'top' ? '8px solid #fff' : placement === 'right' ? '8px solid transparent' : 'none',
                borderLeftColor: placement === 'right' ?  '#fff' : 'transparent',
                borderRightColor: placement === 'left' ? '#fff' : 'transparent',
                top: placement === 'bottom' ? 0 : placement === 'top' ? 'auto': '50%',
                bottom: placement === 'top' ? 0 :  'auto',
                left: placement === 'right' ? 0 : placement === 'left' ? 'auto' : '50%',
                right: placement === 'left' ? 0: 'auto',
                transform: placement === 'top' || placement === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
              }
            }}
          />
        )}
      </div>
      <Popover
        ref={popoverRef}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: placement === 'top' ? 'bottom' : placement === 'bottom' ? 'top' : 'center',
          horizontal: placement === 'left' ? 'right' : placement === 'right' ? 'left' : 'center',
        }}
        transformOrigin={{
          vertical: placement === 'top' ? 'top' : placement === 'bottom' ? 'bottom' : 'center',
          horizontal: placement === 'left' ? 'left' : placement === 'right' ? 'right' : 'center',
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
};

export default PopConfirm;