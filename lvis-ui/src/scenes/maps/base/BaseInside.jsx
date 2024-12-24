import React from "react";
import { Box } from "@mui/material";
import LeftBar from "../../../components/toolbars/LeftBar";
import ValuationMap from "../../../components/map/ValuationMap";

const BaseInside = () => {
  return (
    <Box display="flex" width="100%" height="100%">
      <Box flexGrow={1}>
        <Box
          height="100%"
          position= "relative"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            gridTemplateRows: "repeat(2, 1fr)",
            gridTemplateAreas: `"left map map map"
            "left map map map"`,
          }}
        >
          <Box sx={{ gridArea: "left" }}>
            <LeftBar />
          </Box>
          <Box sx={{ gridArea: "1/1/3/5" }}>
            <ValuationMap />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BaseInside;
