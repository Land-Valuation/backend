import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import BaseInside from "../base/BaseInside";

const Valuation = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LAND VALUATION DOCUMENTATION" subtitle="Find your land valuation materials." />
      <Box
        mt="40px"
        height="75.25vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <BaseInside />        
      </Box>
    </Box>
  );
};

export default Valuation;
