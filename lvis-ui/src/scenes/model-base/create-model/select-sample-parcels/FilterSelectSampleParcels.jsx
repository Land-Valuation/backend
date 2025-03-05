import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FilterSelectSampleParcels = ({ onChangeView }) => {
  const { t } = useTranslation();
  const [stdLotValue, setStdLotValue] = useState(2000);
  const [svdLotValue, setSvdLotValue] = useState(30);
  const generateRamdonHandler = () => {
    console.log("gen random std lot");
    
    onChangeView(true);
  };

  const handleDecreaseStdLot = () => {
    console.log("decrease std");
    setStdLotValue((prevValue) => {
      const newValue = prevValue - 100;
      return newValue >= 0 ? newValue : 0;
    });
  };
  const handleIncreaseStdLot = () => {
    console.log("increase std");
    setStdLotValue((prevValue) => {
      return prevValue + 100;
    });
  };
  const handleDecreaseSvdLot = () => {
    console.log("decrease svd");
    setSvdLotValue((prevValue) => {
      const newValue = prevValue - 10;
      return newValue >= 0 ? newValue : 0;
    });
  };
  const handleIncreaseSvdLot = () => {
    console.log("increase svd");
    setSvdLotValue((prevValue) => {
      return prevValue + 10;
    });
  };
  const handleTextFieldChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setStdLotValue(isNaN(newValue) ? 0 : newValue);
  };
  const handleTextField2Change = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setSvdLotValue(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ color: "#00000073", fontSize: "32px" }} />
        <Typography
          sx={{
            color: "#000000E0",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "16px",
          }}
        >
          {t("pleaseFilterLandParcels")}
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid #F0F0F0",
          borderRadius: "12px",
          boxShadow: "0px 24px 24px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          sx={{
            boxShadow: "0px -12px 24px 0px rgba(0, 0, 0, 0.04)",
            padding: "32px",
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Typography
              sx={{
                color: "#000000E0",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "22px",
              }}
            >
              {t("limitOnStandardLandPlots")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000E0",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {t("totalStandardLot")}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    border: "1px solid #D9D9D9",
                    backgroundColor: "#00000005",
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <IconButton
                    aria-label="decrease"
                    onClick={handleDecreaseStdLot}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
                <TextField
                  value={stdLotValue}
                  onChange={handleTextFieldChange}
                  sx={{
                    width: 80,
                    textAlign: "center",
                    borderRadius: 0,
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23) !important",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: 0,
                      height: 38,
                    },
                  }}
                  inputProps={{
                    style: { textAlign: "center", borderRadius: 0 },
                  }}
                />
                <Box
                  sx={{
                    border: "1px solid #D9D9D9",
                    backgroundColor: "#00000005",
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <IconButton
                    aria-label="increase"
                    onClick={handleIncreaseStdLot}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000E0",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {t("surveyedStandardLot")}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    border: "1px solid #D9D9D9",
                    backgroundColor: "#00000005",
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <IconButton
                    aria-label="decrease"
                    onClick={handleDecreaseSvdLot}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
                <TextField
                  value={svdLotValue}
                  onChange={handleTextField2Change}
                  sx={{
                    width: 80,
                    textAlign: "center",
                    borderRadius: 0,
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23) !important",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: 0,
                      height: 38,
                    },
                  }}
                  inputProps={{
                    style: { textAlign: "center", borderRadius: 0 },
                  }}
                />
                <Box
                  sx={{
                    border: "1px solid #D9D9D9",
                    backgroundColor: "#00000005",
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <IconButton
                    aria-label="increase"
                    onClick={handleIncreaseSvdLot}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ width: "1px", height: "auto", backgroundColor: "#0000000F" }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Typography
              sx={{
                color: "#000000E0",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "22px",
              }}
            >
              {t("excludeLandPriceOutliers")}
            </Typography>
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "#000000E0",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {t("lowerBound")}
              </Typography>
              <FormControl sx={{ width: "100px" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  sx={{
                    height: "40px",
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23) !important",
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "#000000E0",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {t("upperBound")}
              </Typography>
              <FormControl sx={{ width: "100px" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  sx={{
                    height: "40px",
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23) !important",
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{ width: "1px", height: "auto", backgroundColor: "#0000000F" }}
          ></Box>
          <Box>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
                backgroundColor: "#1677FF",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                boxShadow: "none",
                padding: "16px",
                height: "100%",
                "&:hover": {
                  backgroundColor: "#4096ff",
                  boxShadow: "none",
                },
              }}
              variant="contained"
              onClick={generateRamdonHandler}
            >
              <Box>{t("generate")}</Box>
              <Box>{t("random")}</Box>
              <Box>{t("standardLot")}</Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

FilterSelectSampleParcels.propTypes = {
  onChangeView: PropTypes.func,
};

export default FilterSelectSampleParcels;
