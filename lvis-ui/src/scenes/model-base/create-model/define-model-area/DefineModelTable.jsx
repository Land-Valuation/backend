import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const DefineModelTable = ({
  onSelectionChange,
  data = [],
  totalRows = 0,
  paginationModel,
  onPaginationModelChange,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [sort, setSort] = useState({});
  const [formattedData, setFormattedData] = useState([]);
  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 20,
  // });
  const [selectedIds, setSelectedIds] = useState([]);

  console.log(data);
  useEffect(() => {
    const transformedData = data.map((item) => ({
      id: item.id,
      name: item.zcode,
      // parcels: item.parcelCount,
      province: "Vientiane",
      // district: item.districtName,
    }));
    setFormattedData(transformedData);
  }, [data]);

  const columns = [
    {
      field: "name",
      headerName: t("Zone name or Village name"),
      flex: 1,
    },
    {
      field: "province",
      headerName: t("province"),
      editable: true,
      flex: 1,
    },
    {
      field: "district",
      headerName: t("district"),
      editable: true,
      flex: 1,
    },
    {
      field: "parcels",
      headerName: t("Number of Parcels"),
      flex: 1,
      sortable: false,
      description: t("columnDescription"),
    },
    {
      field: "value",
      headerName: t("Parcels with Land Value"),
      width: 190,
      editable: true,
    },
  ];

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
          color: "#000000E0",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: 500,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          color: "#000000E0",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: 400,
          padding: "0 16px",
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
        "& .MuiDataGrid-row.Mui-selected .MuiCheckbox-root svg": {
          fill: "#1677FF",
        },
        "& .MuiDataGrid-columnHeaders .MuiCheckbox-root.Mui-checked  svg": {
          fill: "#1677FF",
        },
      }}
    >
      <DataGrid
        // loading={isLoading || !data}
        onRowSelectionModelChange={(newSelection) => {
          const selectedRows = formattedData.filter((row) =>
            newSelection.includes(row.id)
          );
          console.log("Selected Rows:", selectedRows);
          setSelectedIds(newSelection);
          onSelectionChange(selectedRows);
        }}
        getRowId={(row) => row.id}
        rows={formattedData}
        columns={columns}
        rowCount={totalRows} //in case of Unknown row count set it -1
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        pagination
        paginationMode="server"
        pageSizeOptions={[10, 20, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        checkboxSelection
        disableRowSelectionOnClick
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "#1677FF",
          },
          "@media print": {
            ".MuiDataGrid-main": {
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

export default DefineModelTable;
