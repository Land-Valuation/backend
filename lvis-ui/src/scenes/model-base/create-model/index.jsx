import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Step, StepLabel, Stepper, styled, Typography } from "@mui/material";
import LayoutPageCommon from '../../../components/LayoutPageCommon';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import PropTypes from 'prop-types';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import DefineModelArea from './DefineModelArea';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const steps = [
  'Define Model Area',
  'Select Sample Parcels',
  'Data Preprocessing',
  'Data verification',
  'Set Model Variables',
  'Select Optimal Model',
  'Finalize Adjustment Table',
];

const StepperStyled = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiStepIcon-root': {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontWeight: 'bold',
    color: '#00000073',
    backgroundColor: '#0000000F',
    '&.Mui-active': {
      color: '#1677FF',
      backgroundColor: '#1677FF',
      '& .MuiStepIcon-text': {
        fill: theme.palette.common.white,
      },
    },
    '&.Mui-completed': {
      backgroundColor: '#E6F4FF',
      color: '#1677FF',
    },
  },
  '& .MuiStepIcon-text': {
    fill: theme.palette.common.white,
  },
  '& .MuiStepLabel-label': {
    marginLeft: theme.spacing(1),
    color: '#00000073',
    '&.Mui-active': {
      color: '#1677FF',
    },
    '&.Mui-completed': {
      color: '#000000E0',
    },
  },
}));

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;

  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontWeight: 'bold',
        color: '#00000073',
        backgroundColor: '#0000000F',
        ...(active && {
          color: '#1677FF',
          backgroundColor: '#1677FF',
          '& > .MuiTypography-root': {
            color: 'white',
          },
        }),
        ...(completed && {
          backgroundColor: '#E6F4FF',
          color: '#1677FF',
        }),
      }}
    >
      {completed ? <Check sx={{ fontSize: 16, color: '#1677FF' }} /> : <Box color={active ? 'white' : 'inherit'}>{icon}</Box>}
    </Box>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 12px)',
    right: 'calc(50% + 12px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1677FF',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1677FF',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#0000000F',
  },
}));

const CreateNewModel = () => {
  const breadcrumbData = [
    { name: 'Home', href: '/' },
    { name: 'MODEL-BASED LAND VALUATION', href: '/model-base' },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = steps.length;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderComponent = () => {
    console.log('activeStep :>> ', activeStep);
    switch (activeStep) {
      case 0:
        return <DefineModelArea />;
    
      default:
        return null;
    }
  }

  return (
    <LayoutPageCommon
      breadcrumbData={breadcrumbData}
      title="Create a new model"
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            disabled={isFirstStep}
            sx={{
              backgroundColor: isFirstStep ? "#f0f0f0" : "#fff",
              color: isFirstStep ? "#00000073" : "#1677FF",
              textTransform: "none",
              borderRadius: "6px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              boxShadow: 'none',
              border: isFirstStep ? '1px solid #0000001A' : '1px solid #1677FF',
              height: '32px',
              '&:hover': {
                backgroundColor: isFirstStep ? "#f0f0f0" : '#e6f4ff',
                boxShadow: 'none',
              }
            }}
            variant={isFirstStep ? "contained" : "outlined"}
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Previous
          </Button>
          {
            !isLastStep &&
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
                '&:hover': {
                  backgroundColor: '#4096ff',
                  boxShadow: 'none',
                }
              }}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
            >
              Next
            </Button>
          }
        </Box>
      }
    >
      <Box sx={{ display: 'flex', gap: '32px', padding: '32px 0', height: '100%' }}>
        <Box sx={{ minWidth: '220px', maxWidth: '220px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <StepperStyled orientation="vertical" activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '24px',
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </StepperStyled>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: '#FFB81C',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '8px',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 500,
                padding: '8px 16px',
                boxShadow: 'none',
                width: '100%',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Save as Draft
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircleRoundedIcon />}
              sx={{
                backgroundColor: '#52C41A',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '8px',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 500,
                padding: '8px 16px',
                boxShadow: 'none',
                width: '100%',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Finalization
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '1px', height: '100%', backgroundColor: '#0000001A'}}></Box>
        <Box>
          {renderComponent()}
        </Box>
      </Box>
    </LayoutPageCommon>
  );
};

export default CreateNewModel;