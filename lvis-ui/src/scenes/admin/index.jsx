import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Header from '@/components/Header.jsx';
import {Box, useTheme} from '@mui/material';
import {useTranslation} from 'react-i18next';
import UseTabCustom from '@/scenes/admin/user';
import GroupManagement from '@/scenes/admin/group/index.jsx';

function CustomTabPanel(props) {
  const {children, value, index, ...other} = props;

  return (<div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
  >
    {value === index && <Box sx={{p: 0}}>{children}</Box>}
  </div>);
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabNames = ['User', 'Group'];

const getTabIndexFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  const index = tabNames.indexOf(hash);
  return index !== -1 ? index : 0;
};

export default function Admin() {
  const [value, setValue] = React.useState(getTabIndexFromHash);
  const theme = useTheme();
  const {t} = useTranslation();


  React.useEffect(() => {
    const handleHashChange = () => {
      setValue(getTabIndexFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    window.location.hash = tabNames[newValue];
  };

  return (<Box m="1.5rem 2.5rem">
    <Header title="ADMINISTRATION" subtitle="List of Users"/>
    <Box
        mt="20px"
        height="75vh"
        display="grid"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          '& > div': {gridColumn: 'span 12'}, width: '100%', '& .actions': {
            color: theme.palette.secondary[200],
          }, '& .textPrimary': {
            color: theme.palette.secondary[200],
          }, '& .MuiDataGrid-root': {
            border: 'none',
          }, '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          }, '& .MuiDataGrid-container--top [role=row]': {
            backgroundColor: `${theme.palette.neutral.main} !important`,
            borderBottom: 'none',
          }, '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.background.alt,
          }, '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.neutral.main,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          }, '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
    >
      <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange}
                sx={{
                  '.MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                aria-label="basic tabs example">
            {tabNames.map((tab, index) => (<Tab
                key={index}
                label={t(`AdminTab.${tab}.Title`)}
                {...a11yProps(index)}
                sx={{
                  backgroundColor: value === index ?
                      theme.palette.primary.light :
                      'transparent',
                  color: value === index ? 'black' : theme.palette.text.primary,
                  fontWeight: value === index ? 'bold' : 'normal',
                  transition: 'all 0.3s ease-in-out',
                  "&.Mui-selected": {
                    color: "black"
                  },
                }}
            />))}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UseTabCustom />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <GroupManagement />
        </CustomTabPanel>
      </Box>
    </Box>
  </Box>);
}