import { Box, useTheme } from "@mui/material"
import ValuationMap from "../../../../components/map/ValuationMap"

const SelectSampleParcelsMap = () => {
  const theme = useTheme();

  return (
    <Box
      height="75vh"
      border={`1px solid ${theme.palette.secondary[200]}`}
      borderRadius="4px"
    >
      <ValuationMap />
    </Box>
  )
}

export default SelectSampleParcelsMap