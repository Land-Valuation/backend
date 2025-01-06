import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ title, backUrl, children }) => {
  const navigate = useNavigate();

  const onBack = () => {
    backUrl ? navigate(backUrl) : navigate(-1);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '16px',
          cursor: 'pointer',
        }}
        onClick={onBack}
      >
        <ArrowBackIcon />
        <Box
          sx={{
            color: "#000000E0",
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "28px",
          }}
        >
          {title}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  backUrl: PropTypes.string,
  children: PropTypes.node,
};

export default Header;