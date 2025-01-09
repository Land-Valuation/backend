import { Box, Button } from "@mui/material"

const DataPreprocessing = () => {
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
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
        >
          Default
        </Button>
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
        >
          Apply All
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: '24px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DataPreprocessing