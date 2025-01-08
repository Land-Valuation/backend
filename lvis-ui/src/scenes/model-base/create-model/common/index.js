import { Button, ButtonGroup, styled, Tab, Tabs } from "@mui/material";

export const StyledButtonGroup = styled(ButtonGroup)(() => ({
  border: '1px solid #D9D9D9',
  borderRadius: '4px',
}));

export const StyledButton = styled(Button)(({ active }) => ({
  textTransform: 'none',
  color: active ? '#1677FF' : '#000',
  border: active ? `1px solid #1677FF !important` : '1px solid #ced4da;',
  fontFamily: 'Poppins',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  '&:hover': {
    backgroundColor: active ? '#BBD3FF' : '#f8f9fa',
  },
  '&.MuiButton-outlined': {
    border: 'none',
    '&:not(:last-of-type)': {
      borderRight: '1px solid #ced4da',
    },
  },
}));

 export const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'auto',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    minHeight: '32px',
    padding: '2px',
    backgroundColor: '#F5F5F5',
  },
}));

export const StyledTab = styled(Tab, { shouldForwardProp: (prop) => prop !== 'active' })(
  ({ theme }) => ({
    textTransform: 'none',
    minHeight: 'auto',
    padding: theme.spacing(0.5, 2),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    '& .MuiTab-icon' : {
      margin: 0
    },
    '&.Mui-selected': {
      color: '#1677FF',
      backgroundColor: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      borderRadius: 4,
      padding: 4,
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
  }),
);

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};