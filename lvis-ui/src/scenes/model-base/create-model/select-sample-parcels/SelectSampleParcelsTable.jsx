import { useState } from "react";
import { Box, Checkbox, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../../../state/prototypeApi";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next'; // Import translation hook

const SelectSampleParcelsTable = () => {
  const theme = useTheme();
  const { t } = useTranslation(); // Initialize translation hook
  // values to be sent to the backend
  const [sort, setSort] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
  });

  const columns = [
    {
      field: "_id",
      headerName: t('id'),
      flex: 1,
    },
    {
      field: "userId",
      headerName: t('surveyed'),
      flex: 0.5,
      sortable: false,
      renderCell: () => {
        return (
          <Checkbox
            checked={true}
            sx={{
              '&.Mui-checked': {
                color: "#1677FF",
              },
            }}
          />
        )
      },
    },
    {
      field: "createdAt",
      headerName: t('createdAt'),
      editable: true,
      flex: 1,
    },
    {
      field: "products",
      headerName: t('numberOfProducts'),
      flex: 0.5,
      sortable: false,
      description: t('productColumnDescription'),
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: t('cost'),
      width: 190,
      editable: true,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "action",
      headerName: t('action'),
      width: 150,
      cellClassName: "actions",
      renderCell: () => {
        return (
          <Box sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            height: '100%',
          }}>
            <Box sx={{
              backgroundColor: '#FFF',
              border: '1px solid #D9D9D9',
              borderRadius: '4px',
              padding: '4px',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <BorderColorIcon sx={{ fontSize: '16px' }} />
            </Box>
            <Box sx={{
              backgroundColor: '#FFF',
              border: '1px solid #D9D9D9',
              borderRadius: '4px',
              padding: '4px',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <RemoveIcon sx={{ fontSize: '16px' }} />
            </Box>
          </Box>
        )
      },
    },
  ];

   const getRowClassName = (params) => {
    if (!params.row.userId) {
      return 'row-with-user-id';
    }
    return '';
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
      justifyContent="space-between"
      rowGap="20px"
      columnGap="1.33%"
      sx={{
        height: "calc(100vh - 240px)",
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
        },
          '& .MuiDataGrid-columnHeaders .MuiCheckbox-root.Mui-checked  svg': {
              fill: '#1677FF',
          },
        // Thêm định nghĩa cho class row-with-user-id
        "& .row-with-user-id": {
          backgroundColor: "#E6F7FF !important",
        }
      }}
    >
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.transactions) || []}
        columns={columns}
        rowCount={(data && data.total) || 0} //in case of Unknown row count set it -1
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        pagination
        paginationMode="server"
        pageSizeOptions={[10, 20, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={(newPaginationModel) =>
          setPaginationModel(newPaginationModel)
        }
        disableRowSelectionOnClick
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        getRowClassName={getRowClassName} // Áp dụng hàm getRowClassName
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
    </Box>
  );
};

export default SelectSampleParcelsTable