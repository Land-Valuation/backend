import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from "@mui/material";
import LayoutPageCommon from "../../../components/LayoutPageCommon";
import { useState, useEffect } from "react";
import { Check } from "@mui/icons-material";
import PropTypes from "prop-types";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import DefineModelArea from "./define-model-area/DefineModelArea";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SelectSampleParcels from "./select-sample-parcels/SelectSampleParcels";
import DataPreprocessing from "./data-preprocessing/DataPreprocessing";
import DataVerification from "./data-verification/DataVerification";
import SetModelVariables from "./set-model-variables/SetModelVariables";
import SelectOptionalModel from "./select-optional-model/SelectOptionalModel";
import FinalizeAdjustmentTable from "./finalize-adjustment-table/FinalizeAdjustmentTable";
import { useTranslation } from "react-i18next";
import {
  useCreateTaskMutation,
  useSaveDraftMutation,
  useGetDraftQuery,
} from "../../../state/taskApi";
import { useSelector, useDispatch } from "react-redux";
import { initializeDraft, updateDraft } from "../../../state/draftSlice";

const steps = [
  "defineModelArea",
  "selectSampleParcels",
  "dataPreprocessing",
  "dataVerification",
  "setModelVariables",
  "selectOptimalModel",
  "finalizeAdjustmentTable",
];
// const apiUrl = import.meta.env.VITE_DATA_MODEL_API_BASE_URL;

const StepperStyled = styled(Stepper)(({ theme }) => ({
  "& .MuiStepLabel-root": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiStepIcon-root": {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontWeight: "bold",
    color: "#00000073",
    backgroundColor: "#0000000F",
    "&.Mui-active": {
      color: "#1677FF",
      backgroundColor: "#1677FF",
      "& .MuiStepIcon-text": {
        fill: theme.palette.common.white,
      },
    },
    "&.Mui-completed": {
      backgroundColor: "#E6F4FF",
      color: "#1677FF",
    },
  },
  "& .MuiStepIcon-text": {
    fill: theme.palette.common.white,
  },
  "& .MuiStepLabel-label": {
    marginLeft: theme.spacing(1),
    color: "#00000073",
    "&.Mui-active": {
      color: "#1677FF",
    },
    "&.Mui-completed": {
      color: "#000000E0",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        fontWeight: "bold",
        color: "#00000073",
        backgroundColor: "#0000000F",
        ...(active && {
          color: "#1677FF",
          backgroundColor: "#1677FF",
          "& > .MuiTypography-root": {
            color: "white",
          },
        }),
        ...(completed && {
          backgroundColor: "#E6F4FF",
          color: "#1677FF",
        }),
      }}
    >
      {completed ? (
        <Check sx={{ fontSize: 16, color: "#1677FF" }} />
      ) : (
        <Box color={active ? "white" : "inherit"}>{icon}</Box>
      )}
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
    left: "calc(-50% + 12px)",
    right: "calc(50% + 12px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1677FF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1677FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#0000000F",
  },
}));

const CreateNewModel = () => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState([]);
  const [taskId, setTaskId] = useState(localStorage.getItem("taskId"));
  const [activeStep, setActiveStep] = useState(0);
  const latestDraftData = useSelector((state) => state.draft.data);
  const userId = "hoangdm";
  const [createTask] = useCreateTaskMutation();
  const [saveDraft] = useSaveDraftMutation();
  const { data: existingDraftData } = useGetDraftQuery(
    { userId, taskId },
    { skip: !taskId }
  );
  const dispatch = useDispatch();
  const draftData = useSelector((state) => state.draft.data);
  // const zoneNames = selectedRows.map((row) => row.zoneName);
  useEffect(() => {
    dispatch(initializeDraft());
  }, [dispatch]);

  useEffect(() => {
    if (draftData[activeStep]) {
      setSelectedRows(draftData[activeStep].selectedZoneIds || []);
    }
  }, [activeStep, draftData]);

  const breadcrumbData = [
    { name: t("home"), href: "/" },
    { name: t("modelBasedLandValuation"), href: "/model-base" },
  ];

  const totalSteps = steps.length;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = (step, draftDataForStep) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(
      updateDraft({
        step,
        draftData: { ...draftData, [step]: draftDataForStep },
      })
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSelectionChange = (newSelection) => {
  //   setSelectedRows(newSelection);
  // };

  const handleSaveDraft = async () => {
    const currentStep = activeStep + 1;
    console.log("Save draft for step:", currentStep);

    if (selectedRows.length === 0) {
      console.log("No rows selected");
      return;
    }

    if (!taskId) {
      try {
        const response = await createTask({
          userId: userId,
          modelId: "test model 1",
          title: "task 1",
        });

        if (response.error) {
          console.error(`Task creation failed:`, response.error);
          return;
        }
        const newTaskId = response.data.id;
        setTaskId(newTaskId);
        localStorage.setItem("taskId", newTaskId);
        console.log("Task created:", newTaskId);
      } catch (error) {
        console.error("Error creating task:", error);
        return;
      }
    }

    // const zoneNames = selectedRows.map((row) => row.name);
    // const zoneIds = selectedRows.map((row) => row.id);

    // const draftUpdateData = {
    //   1: { modelArea: zoneNames, selectedZoneIds: zoneIds },
    //   2: { selectedParcels: ["Parcel 1", "Parcel 2"] },
    //   3: { preprocessingConfig: { normalize: true } },
    //   4: { verificationResults: "Passed" },
    //   5: { modelVariables: ["Variable A", "Variable B"] },
    //   6: { optimalModel: "Linear Regression" },
    //   7: { adjustmentTable: "Final Adjustments" },
    // };

    // const draftData = {
    //   ...(existingDraftData?.draft_data || {}),
    //   ...draftUpdateData[currentStep],
    // };

    try {
      const result = await saveDraft({
        userId: userId,
        taskId: taskId,
        step: currentStep,
        draftData: latestDraftData,
      });

      if (result.error) {
        console.error("Error saving draft:", result.error);
        return;
      }
      console.log(`Draft for step ${currentStep} saved successfully.`);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const renderComponent = () => {
    switch (activeStep) {
      case 0:
        return <DefineModelArea activeStep={activeStep} onSelectionChange={setSelectedRows} selectedRows={selectedRows}/>;
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
  };

  return (
    <LayoutPageCommon
      breadcrumbData={breadcrumbData}
      title={t("createNewModel")}
      actions={
        <Box sx={{ display: "flex", gap: 1 }}>
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
              boxShadow: "none",
              border: isFirstStep ? "1px solid #0000001A" : "1px solid #1677FF",
              height: "32px",
              "&:hover": {
                backgroundColor: isFirstStep ? "#f0f0f0" : "#e6f4ff",
                boxShadow: "none",
              },
            }}
            variant={isFirstStep ? "contained" : "outlined"}
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            {t("previous")}
          </Button>
          {!isLastStep && (
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
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#4096ff",
                  boxShadow: "none",
                },
              }}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleNext(activeStep + 1, draftData)}
            >
              {t("next")}
            </Button>
          )}
        </Box>
      }
    >
      <Box
        sx={{ display: "flex", gap: "32px", padding: "32px 0", height: "100%" }}
      >
        <Box
          sx={{
            minWidth: "220px",
            maxWidth: "220px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <StepperStyled
            orientation="vertical"
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    {t(label)}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </StepperStyled>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: "#FFB81C",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 16px",
                boxShadow: "none",
                width: "100%",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
              onClick={handleSaveDraft}
            >
              {t("saveAsDraft")}
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircleRoundedIcon />}
              sx={{
                backgroundColor: "#52C41A",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 16px",
                boxShadow: "none",
                width: "100%",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {t("finalization")}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{ width: "1px", height: "auto", backgroundColor: "#0000001A" }}
        ></Box>
        <Box sx={{ width: "100%" }}>{renderComponent()}</Box>
      </Box>
    </LayoutPageCommon>
  );
};

export default CreateNewModel;
