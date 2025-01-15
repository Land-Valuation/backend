import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PlaceIcon from '@mui/icons-material/Place';
import LoopIcon from '@mui/icons-material/Loop';
import { Typography, useTheme } from '@mui/material';
import LandCharacteristicsDialog from '../../modal/LandCharacteristicsDialog';

const columns = [
  {
    field: 'parcelId',
    headerName: 'Parcel ID',
    flex: 1,
    renderCell: (params) => (
      <Typography
        sx={{
          color: '#1677FF',
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          cursor: 'pointer',
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'referenceParcel',
    headerName: 'Reference Parcel',
    flex: 2,
    sortable: false,
    renderHeader: () => (
      <Box display="flex" alignItems="center" gap={'10px'} flexWrap={true}>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '22px',
            wordBreak: 'break-word',
          }}
        >
          Reference Parcel
        </Typography>
        <Button
          sx={{
            backgroundColor: "#1677FF",
            color: "#fff",
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            boxShadow: 'none',
            padding: '4px 8px',
            '&:hover': {
              backgroundColor: '#4096ff',
              boxShadow: 'none',
            }
          }}
          variant="contained"
          startIcon={<LoopIcon />}
        >
          Auto
        </Button>
      </Box>
    ),
    renderCell: (params) => (
      <Box sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {params.value === 'N/A' || params.value === 'No data' ? (
          <PlaceIcon />
        ) : (
          <PlaceIcon sx={{ color: '#1677FF' }} />
        )}
        {params.value}
      </Box>
    ),
  },
  { field: 'price', headerName: 'Price (LAK/m²)', flex: 1 },
  { field: 'characteristic1', headerName: 'Characteristic 1', flex: 1 },
  { field: 'characteristic2', headerName: 'Characteristic 2', flex: 1 },
  { field: 'characteristic3', headerName: 'Characteristic 3', flex: 1 },
  { field: 'characteristic4', headerName: 'Characteristic 4', flex: 1 },
];

const data = [
  { id: 1, parcelId: 'A1-001', referenceParcel: 'A2-123', price: '30,000', characteristic1: 'Row data 1', characteristic2: 'Row data 1', characteristic3: 'Row data 1', characteristic4: 'Row data 1' },
  { id: 2, parcelId: 'A1-002', referenceParcel: 'B1-001', price: '27,000', characteristic1: 'Row data 2', characteristic2: 'Row data 2', characteristic3: 'Row data 2', characteristic4: 'Row data 2' },
  { id: 3, parcelId: 'A1-003', referenceParcel: 'N/A', price: 'N/A', characteristic1: 'Row data 3', characteristic2: 'Row data 3', characteristic3: 'Row data 3', characteristic4: 'Row data 3' },
  { id: 4, parcelId: 'A1-004', referenceParcel: 'A2-015', price: '30,000', characteristic1: 'Row data 4', characteristic2: 'Row data 4', characteristic3: 'Row data 4', characteristic4: 'Row data 4' },
  { id: 5, parcelId: 'A1-005', referenceParcel: 'C2-019', price: '27,000', characteristic1: 'Row data 5', characteristic2: 'Row data 5', characteristic3: 'Row data 5', characteristic4: 'Row data 5' },
  { id: 6, parcelId: 'A1-006', referenceParcel: 'D2-125', price: '30,000', characteristic1: 'Row data 6', characteristic2: 'Row data 6', characteristic3: 'Row data 6', characteristic4: 'Row data 6' },
  { id: 7, parcelId: 'A1-007', referenceParcel: 'E2-041', price: '27,000', characteristic1: 'Row data 7', characteristic2: 'Row data 7', characteristic3: 'Row data 7', characteristic4: 'Row data 7' },
  { id: 8, parcelId: 'A1-008', referenceParcel: 'No data', price: 'N/A', characteristic1: 'Row data 8', characteristic2: 'Row data 8', characteristic3: 'Row data 8', characteristic4: 'Row data 8' },
  { id: 9, parcelId: 'A1-009', referenceParcel: 'No data', price: 'N/A', characteristic1: 'Row data 9', characteristic2: 'Row data 9', characteristic3: 'Row data 9', characteristic4: 'Row data 9' },
  { id: 10, parcelId: 'A1-010', referenceParcel: 'No data', price: 'N/A', characteristic1: 'Row data 10', characteristic2: 'Row data 10', characteristic3: 'Row data 10', characteristic4: 'Row data 10' },
];

const ParcelTable = () => {
  const theme = useTheme();

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
      justifyContent="space-between"
      rowGap="20px"
      columnGap="1.33%"
      sx={{
        height: "calc(100vh - 180px)",
        minHeight: "500px",
        "& > div": { gridColumn: "span 12" },
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          borderBottom: "none",
          color: '#000000E0',
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 500,
          height: '60px',
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          color: '#000000E0',
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 400,
          padding: '0 16px',
        },           
        "& .MuiDataGrid-container--top [role=row]": {
          backgroundColor: `${theme.palette.grey[50]} !important`,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.background.alt,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.grey[0],
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
        "& .MuiDataGrid-row.Mui-selected": {
          backgroundColor: "#E6F7FF !important",
        },
        '& .MuiDataGrid-row.Mui-selected .MuiCheckbox-root svg': {
          fill: '#1677FF',
        }
      }}
    >
      <DataGrid 
        columns={columns} 
        rows={data}
        sx={{
          '& .MuiDataGrid-cell:hover': {
            color: '#1677FF',
          },
          '@media print': {
            '.MuiDataGrid-main': {
              width: "fit-content",
              fontSize: "14px",
              height: "fit-content",
              overflow: "visible",
            },
            marginBottom: "20px",
          },
        }}
      />
      <LandCharacteristicsDialog />
    </Box>
  )
}

export default ParcelTable