import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updateDraft } from "../../../../state/draftSlice";

const DefineModelTable = ({
  onSelectionChange,
  data = [],
  totalRows = 0,
  paginationModel,
  onPaginationModelChange,
  activeStep,
  // selectedRows
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [sort, setSort] = useState({});
  const [formattedData, setFormattedData] = useState([]);
  const draftData = useSelector((state) => state.draft.data);
  const dispatch = useDispatch();
  const draftFormattedData = useSelector((state) => state.draft.formattedData[activeStep] || []);
  const selectionModel = useSelector(
    (state) => state.draft.data[activeStep]?.selectedZoneIds || []
  );

  useEffect(() => {
    console.log("Redux draft data updated:", draftData);
    console.log(selectionModel);
  }, [draftData]);

  useEffect(() => {
    if (draftFormattedData && draftFormattedData.length > 0) {
      setFormattedData(draftFormattedData);
    } else {
    const transformedData = data.map((item) => ({
      id: item.id,
      name: item.zcode,
      // parcels: item.parcelCount,
      province: "Vientiane",
      district: item.distCode,
    }));
    setFormattedData(transformedData);
  }
  }, [data, draftFormattedData]);

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

  const handleSelectionChange = (newSelectionModel) => {
    const selectedRows = formattedData.filter((row) =>
      newSelectionModel.includes(row.id)
    );
    console.log(selectedRows);
    
    const selectedZoneDetails = selectedRows.map((row) => ({
      id: row.id,
      name: row.name,
      province: row.province,
      district: row.district,
    }));
    // const newFormattedData = formattedData.filter((row) => newSelectionModel.includes(row.id));

    dispatch(
      updateDraft({
        step: activeStep,
        draftData: {
          selectedZoneIds: newSelectionModel,
          selectedZoneDetails: selectedZoneDetails,
        },
        formattedData: formattedData,
      })
    );

    onSelectionChange(newSelectionModel);
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
        selectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectionModel}
        getRowId={(row) => row.id}
        rows={formattedData}
        columns={columns}
        rowCount={totalRows}
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        pagination
        paginationMode="server"
        pageSizeOptions={[10, 20, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        checkboxSelection
        keepNonExistentRowsSelected
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
