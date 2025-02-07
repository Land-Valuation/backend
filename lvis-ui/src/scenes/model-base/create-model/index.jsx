import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Step, StepLabel, Stepper, styled, Typography } from "@mui/material";
import LayoutPageCommon from '../../../components/LayoutPageCommon';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import PropTypes from 'prop-types';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import DefineModelArea from './define-model-area/DefineModelArea';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SelectSampleParcels from './select-sample-parcels/SelectSampleParcels';
import DataPreprocessing from './data-preprocessing/DataPreprocessing';
import DataVerification from './data-verification/DataVerification';
import SetModelVariables from './set-model-variables/SetModelVariables';
import SelectOptionalModel from './select-optional-model/SelectOptionalModel';
import FinalizeAdjustmentTable from './finalize-adjustment-table/FinalizeAdjustmentTable';
import { useTranslation } from 'react-i18next';

const steps = [
  'defineModelArea',
  'selectSampleParcels',
  'dataPreprocessing',
  'dataVerification',
  'setModelVariables',
  'selectOptimalModel',
  'finalizeAdjustmentTable',
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
  const { t } = useTranslation();

  const breadcrumbData = [
    { name: t('home'), href: '/' },
    { name: t('modelBasedLandValuation'), href: '/model-base' },
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
    switch (activeStep) {
      case 0:
        return <DefineModelArea />;
      case 1:
        return <SelectSampleParcels />;
      case 2:
        return <DataPreprocessing />;
      case 3:
        return <DataVerification />;
      case 4:
        return <SetModelVariables />;
      case 5:
        return <SelectOptionalModel />;
      case 6:
        return <FinalizeAdjustmentTable />;
      default:
        return null;
    }
  }

  return (
    <LayoutPageCommon
      breadcrumbData={breadcrumbData}
      title={t('createNewModel')}
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
            {t('previous')}
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
              {t('next')}
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
                    {t(label)}
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
              {t('saveAsDraft')}
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
              {t('finalization')}
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '1px', height: 'auto', backgroundColor: '#0000001A'}}></Box>
        <Box sx={{  width: '100%' }}>
          {renderComponent()}
        </Box>
      </Box>
    </LayoutPageCommon>
  );
};

export default CreateNewModel