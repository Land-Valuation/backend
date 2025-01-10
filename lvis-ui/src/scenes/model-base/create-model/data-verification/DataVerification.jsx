import { Box, Button } from "@mui/material"
import ExportIcon from "../../../../assets/icons/model-base/ExportIcon"
import DataVerificationTable from "./DataVerificationTable"

const DataVerification = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box>
        <Button
          sx={{
            color: "#000000E0",
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            boxShadow: 'none',
            border: '1px solid #D9D9D9',
            '&:hover': {
              boxShadow: 'none',
            },
          }}
          variant="outlined"
          startIcon={<ExportIcon />}
        >
          Export
        </Button>
      </Box>
      <Box>
        <DataVerificationTable />
      </Box>
    </Box>
  )
}

export default DataVerification