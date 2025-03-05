import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDraft,
  updateDraftSelection,
} from "../../../../state/draftSlice";

const DefineModelTable = ({
  province,
  district,
  onSelectionChange,
  data = [],
  totalRows = 0,
  paginationModel,
  onPaginationModelChange,
  activeStep,
  selectedRows,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [sort, setSort] = useState({});
  const [formattedData, setFormattedData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const draftData = useSelector((state) => state.draft.data);
  const dispatch = useDispatch();
  const draftFormattedData = useSelector(
    (state) => state.draft.formattedData[activeStep] || []
  );
  // const selectionModel = useSelector(
  //   (state) => state.draft.data[activeStep]?.selectedZoneIds || []
  // );

  useEffect(() => {
    if (draftData[activeStep]?.selectedZoneIds && data.length > 0) {
      // Filter out selections that don't exist in current data
      const validSelections = draftData[activeStep].selectedZoneIds.filter(id => 
        data.some(item => item.id === id)
      );
      setSelectionModel(validSelections);
    } else {
      setSelectionModel([]);
    }
  }, [activeStep, draftData, data]);

  // useEffect(() => {
  //   if (province || district) {
  //     dispatch(updateDraftSelection({ step: activeStep, selectedZoneIds: [] }));
  //   }
  // }, [province, district, dispatch]);

  useEffect(() => {
    console.log(province +"-"+ district);
    
    const transformedData = data.map((item) => ({
      id: item.id,
      name: item.zcode,
      province: "Vientiane",
      district: item.distCode,
    }));
  
    // Only use draftFormattedData if it matches current district
    if (
      draftFormattedData.length > 0 && 
      draftData[activeStep]?.district === district
    ) {
      setFormattedData(draftFormattedData);
    } else {
      setFormattedData(transformedData);
    }
  }, [data, draftFormattedData, province, district, draftData, activeStep]);

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
    setSelectionModel(newSelectionModel);
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

    dispatch(
      updateDraft({
        step: activeStep,
        draftData: {
          selectedZoneIds: newSelectionModel,
          selectedZoneDetails: selectedZoneDetails,
          district: district,
        },
        formattedData: formattedData,
      })
    );
    setSelectionModel(newSelectionModel);
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
        // selectionModel={selectionModel}
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
        // keepNonExistentRowsSelected
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
