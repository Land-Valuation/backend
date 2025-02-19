import {Box, Typography, useTheme, SvgIcon} from '@mui/material';
import TopBox from '../../components/TopBox';
import Sidebar from '../../components/Sidebar';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {useIsAuthenticated} from '@/hooks/useAuth';

const notifications = [
  {
    title: '2024 Land Price Valuation Standards Update for Lao PDR',
    date: '2024-01-02',
  },
  {
    title: 'Land Price Information System Maintenance Notice',
    date: '2024-01-02',
  },
  {title: 'New Land Registration Feature Now Available', date: '2024-01-02'}];

const NotificationBox = () => {
  return (<Box
      sx={{
        mt: '32px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        padding: '24px 24px 24px 64px',
        gap: '50px',
        position: 'relative',
        backgroundColor: '#FFFFFF99',
      }}
  >
    <img
        src="/noti icon.svg"
        alt="Notification Icon"
        style={{
          width: '80px',
          height: '80px',
          position: 'absolute',
          left: '-15px',
          top: '-16px',
        }}
    />
    <Box sx={{flex: 1}}>
      {notifications.map((item, index) => (<Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 0',
            gap: '270px',
          }}
      >
        <Typography variant="body1">{item.title}</Typography>
        <Typography variant="body2"
                    sx={{color: '#757575'}}>{item.date}</Typography>
      </Box>))}
    </Box>
  </Box>);
};

const Middle = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  return (<Box width="100%" display="flex" flexDirection="column"
               alignItems="center" marginTop="107px">
    <Box display="flex" flexDirection="column" justifyContent="center"
         alignItems="center" gap="8px">
      <Typography
          sx={{
            color: theme.palette.neutral.medium,
            fontFamily: 'Poppins',
            fontSize: '30px',
            fontWeight: '500',
            position: 'relative',
            paddingBottom: '15px',
          }}
      >
        {t('Land Price Information System')}
      </Typography>
      <Typography
          sx={{
            backgroundColor: '#BAE0FF',
            color: '#1677FF',
            fontSize: '12px',
            fontFamily: 'Poppins',
            padding: '2px 4px',
            borderRadius: '4px',
          }}
      >
        {t('in Lao PDR')}
      </Typography>
    </Box>
    <NotificationBox/>
  </Box>);
};

const HomePage = () => {
  const [isBoxVisible, setBoxVisible] = useState(true);
  const isAuthenticated = useIsAuthenticated();

  const handleClose = () => {
    setBoxVisible(false);
  };

  return (<Box
      sx={{
        backgroundImage: 'url(/homebg.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
      }}
  >
    { isAuthenticated && <Sidebar/> }
    <TopBox/>
    <Middle/>
    {isBoxVisible && (<Box
        sx={{
          width: '400px',
          height: '420px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          display: 'none',
        }}
    >
      <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '32px',
            backgroundColor: 'white',
            boxShadow: '0px 9px 28px 8px #0000000D',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '-20px',
            right: '50%',
            marginRight: '-20px',
            cursor: 'pointer',
          }}
          onClick={handleClose}
      >
        <img src="/x.svg" alt=""/>
      </Box>
    </Box>)}
  </Box>);
};

export default HomePage;
