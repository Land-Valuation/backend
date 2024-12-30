import {
  Box,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import TopBox from "../../components/TopBox";
// import ChooserWidget from "../widgets/ChooserWidget";
import { useTranslation } from "react-i18next";
import '@fontsource/poppins/500.css'; 

const notifications = [
  { title: '2024 Land Price Valuation Standards Update for Lao PDR', date: '2024-01-02' },
  { title: 'Land Price Information System Maintenance Notice', date: '2024-01-02' },
  { title: 'New Land Registration Feature Now Available', date: '2024-01-02' },
];

const NotificationBox = () => {
  return (
    <Box
      sx={{
        mt: '20px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '24px 24px 24px 64px',
        gap: '50px',
        position: 'relative',
      }}
    >
      {/* Icon on the left side */}
      <img
        src="/noti icon.svg"
        alt="Notification Icon"
        style={{ width: '64px', height: '64px',position: 'absolute', left: '-15px', top: '-16px' }}
      />

      {/* Notifications list */}
      <Box sx={{ flex: 1 }}>
        {notifications.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px 0',
              //borderBottom: index !== notifications.length - 1 ? '1px solid #e0e0e0' : 'none',
              gap: '100px',
            }}
          >
            {/* Notification title */}
            <Typography variant="body1">{item.title}</Typography>

            {/* Notification date */}
            <Typography variant="body2" sx={{ color: '#757575' }}>
              {item.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Middle = () => {
  const theme = useTheme();
  const { t } = useTranslation();  
  return (
    <Box
      width="100%"
      display="flex"
      gap="0.5rem"
      flexDirection="column" 
      alignItems="center"
    >
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        sx={{
          "& .MuiTypography-root ": {
            lineHeight: '1.25',           
          },
        }} 
      >
        <Typography fontFamily="Poppins" fontSize="22px" fontWeight="500" color={theme.palette.neutral.medium}>          
        ລະບົບຂໍ້ມູນລາຄາທີ່ດິນໃນ ສປປ ລາວ
        </Typography>     
        <Typography 
              sx={{
                color: theme.palette.neutral.medium,
                fontFamily: "Poppins",
                fontSize: "30px",
                fontWeight: "500",
                position: 'relative',
                paddingBottom: '15px', // Adjust padding to create space for the ::after text
                '::after': {
                  content: '"in Lao PDR"',
                  position: 'absolute',
                  right: 200,
                  bottom: -8,
                  backgroundColor: '#BAE0FF',
                  color: '#1677FF',
                  fontSize: '12px',
                  fontFamily: 'Poppins',
                  padding: '2px 4px',
                  borderRadius: '4px',
                },
              }} 
            >            
              {t("Land Price Information System")}
        </Typography>
      </Box>      
      <NotificationBox />
      {/* <Box
        sx={{
          width: "100%",
          height: "21px",
          padding: "2px 2px 2px 2px", 
          bgcolor: "#002868",
          opacity: "0.5",
          mt: "3rem",
        }}     
      >
      </Box> */}
    </Box>
  );
};



const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{backgroundImage: 'url(/homebg.svg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100%'}}>
      <TopBox /> 
      <Middle />
      {/* MENU CHOOSER */}
      <Box
        width="100%"
        padding="1rem 6%"
        display="flex"
        flexWrap= 'wrap'
        gap="24px"
        justifyContent='center'
        alignItems='center'
        marginTop="55px"
      >
        <Box className="menu-chooser">
          <img src="/land-price.svg" alt="menu1" />
          <Typography sx={{fontFamily:"Poppins", fontWeight:500,fontSize:18}}>Land Price Explorer</Typography>
          <Typography sx={{fontFamily:"Poppins", fontWeight:400,fontSize:14, color:"#000000A6"}}>Lorem ipsum dolor sit amet consectetur. Molestie lacus...</Typography>
          <Link sx={{color:"#1677FF", display: "flex", gap: "8px"}} href="/land-price-explorer" underline="hover"><img src="/arrow.svg" alt="arrow"/>See now</Link>
        </Box>
        <Box className="menu-chooser">
        <img src="/land-valuation.svg" alt="menu2" />
        <Typography sx={{fontFamily:"Poppins", fontWeight:500,fontSize:18}}>Land Valuation</Typography>
          <Typography sx={{fontFamily:"Poppins", fontWeight:400,fontSize:14, color:"#000000A6"}}>Lorem ipsum dolor sit amet consectetur. Molestie lacus...</Typography>
          <Link sx={{color:"#1677FF", display: "flex", gap: "8px"}} href="/land-price-explorer" underline="hover"><img src="/arrow.svg" alt="arrow"/>See now</Link>
        </Box>
        <Box className="menu-chooser">
        <img src="/model-based.svg" alt="menu3" />
        <Typography sx={{fontFamily:"Poppins", fontWeight:500,fontSize:18}}>Model-based land Valuation</Typography>
          <Typography sx={{fontFamily:"Poppins", fontWeight:400,fontSize:14, color:"#000000A6"}}>Lorem ipsum dolor sit amet consectetur. Molestie lacus...</Typography>
          <Link sx={{color:"#1677FF", display: "flex", gap: "8px"}} href="/land-price-explorer" underline="hover"><img src="/arrow.svg" alt="arrow"/>See now</Link>
        </Box>                
        <Box className="menu-chooser">
        <img src="/parcel-survey.svg" alt="menu4" />
        <Typography sx={{fontFamily:"Poppins", fontWeight:500,fontSize:18}}>Parcel Survey Management</Typography>
          <Typography sx={{fontFamily:"Poppins", fontWeight:400,fontSize:14, color:"#000000A6"}}>Lorem ipsum dolor sit amet consectetur. Molestie lacus...</Typography>
          <Link sx={{color:"#1677FF", display: "flex", gap: "8px"}} href="/land-price-explorer" underline="hover"><img src="/arrow.svg" alt="arrow"/>See now</Link>
        </Box>  
        <Box className="menu-chooser">
        <img src="/admin.svg" alt="menu5" />
        <Typography sx={{fontFamily:"Poppins", fontWeight:500,fontSize:18}}>Admin</Typography>
          <Typography sx={{fontFamily:"Poppins", fontWeight:400,fontSize:14, color:"#000000A6"}}>Lorem ipsum dolor sit amet consectetur. Molestie lacus...</Typography>
          <Link sx={{color:"#1677FF", display: "flex", gap: "8px"}} href="/land-price-explorer" underline="hover"><img src="/arrow.svg" alt="arrow"/>See now</Link>
        </Box>                  
      </Box>
    </Box>
  );
};

export default HomePage;
