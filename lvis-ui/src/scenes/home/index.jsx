import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import TopBox from "../../components/TopBox";
import ChooserWidget from "../widgets/ChooserWidget";
import { useTranslation } from "react-i18next";


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
        padding: '16px',
        gap: '50px',
      }}
    >
      {/* Icon on the left side */}
      <img
        src="/notify_bell.png"
        alt="Notification Icon"
        style={{ width: '40px', height: '40px' }}
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
        gap="30px"
        sx={{
          "& .MuiTypography-root ": {
            lineHeight: '1.25',           
          },
        }} 
      >
        <Typography fontSize="28px" fontWeight="bold" color={theme.palette.neutral.medium}>          
        ລະບົບຂໍ້ມູນລາຄາທີ່ດິນໃນ ສປປ ລາວ
        </Typography>     
        <Typography 
              sx={{
                color: theme.palette.neutral.medium,
                fontSize: "45px",
                fontWeight: "bold",
                position: 'relative',
                paddingBottom: '15px', // Adjust padding to create space for the ::after text
                '::after': {
                  content: '"in Lao PDR"',
                  position: 'absolute',
                  right: -25,
                  bottom: 0,
                  backgroundColor: 'yellow',
                  color: 'red',
                  fontSize: '12px',
                  padding: '2px 4px',
                  borderRadius: '4px',
                },
              }} 
            >            
              {t("Land Price Information System")}
        </Typography>
      </Box>      
      <NotificationBox />
      <Box
        sx={{
          width: "100%",
          height: "21px",
          padding: "2px 2px 2px 2px", 
          bgcolor: "#002868",
          opacity: "0.5",
          mt: "3rem",
        }}     
      >
      </Box>
    </Box>
  );
};



const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <TopBox /> 
      <Middle />
      {/* MENU CHOOSER */}
      <Box
        width="100%"
        padding="1rem 6%"
        display="flex"
        flexWrap= 'wrap'
        gap="0.5rem"
        justifyContent='center'
        alignItems='center'
      >
        <Box>
          <ChooserWidget 
            image="u29.png" 
            title={t("Land Price Explorer")}
            description={t("Check easily land value information by region")}
            link="montoring"
          />
        </Box>
        <Box>
          <ChooserWidget 
            image="u25.png" 
            title={t("Land Valuation Documentation")} 
            description={t("Support to manage various businesses of land valuation process")} 
            link="Search"
          />
        </Box>
        <Box>
          <ChooserWidget 
            image="u26.png" 
            title={t("Model-based Land Valuation")}
            description={t("Calculate, analyze and compare land value by region")} 
            link="Products"
          />
        </Box>                
        <Box>
          <ChooserWidget 
            image="u27.png" 
            title={t("Item 00")} 
            description={t("Provides visualized and statistical analysis based on land value")}  
            link="Dashboard"
          />
        </Box>  
        <Box>
          <ChooserWidget 
            image="u28.png" 
            title={t("Admin")}
            description={t("Implementation of monitoring changes of price in real time mode")} 
            link="Customers"
          />
        </Box>                  
      </Box>
    </Box>
  );
};

export default HomePage;
