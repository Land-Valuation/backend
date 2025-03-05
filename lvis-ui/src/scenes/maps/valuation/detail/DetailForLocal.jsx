import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, createTheme, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, ThemeProvider, Typography } from "@mui/material"
import UploadIcon from "../../../../assets/icons/land-valuation/UploadIcon"
import { customIcon, CustomTab, position, VisuallyHiddenInput } from "../common"
import CustomUploadFile from "../../../../components/customMUI/CustomUploadFile"
import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import CalendarIcon from "../../../../assets/icons/land-valuation/CalendarIcon"
import CustomDateDivider from "../../../../assets/icons/land-valuation/CustomDateDivider"
import ExpandIcon from "../../../../assets/icons/land-valuation/ExpandIcon"
import AttachIcon from "../../../../assets/icons/land-valuation/AttachIcon"
import DownloadIcon from "../../../../assets/icons/land-valuation/DownloadIcon"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CachedIcon from "@mui/icons-material/Cached";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import CopyIcon from "../../../../assets/icons/land-valuation/CopyIcon"
import { DataGrid } from "@mui/x-data-grid"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import ZoomControl from "./ZoomControl"
import MinimapControl from "./MinimapControl"
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom"
import CommitteeTableForLocal from "./CommitteeTableForLocal"
import dayjs from "dayjs"
import { FORMAT_DATE } from "../../../../utils/constant"
import { useGetLocalValuationByIdQuery, useUpdateLocalValuationMutation } from "../../../../state/localValuationApi"
import { BASE_URL } from "../../../../utils/env"

const theme = createTheme({
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          alignItems: "center",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
        },
      },
    },
  },
});

const renderStatus = (status) => {
  const statusConfigs = {
    Requested: {
      color: "#FAAD14",
      borderColor: "#FFE58F",
      icon: <ErrorOutlineIcon style={{ color: "#FAAD14", fontSize: "14px" }} />,
    },
    Confirmed: {
      color: "#52C41A",
      borderColor: "#B7EB8F",
      icon: (
        <CheckCircleOutlineIcon
          style={{ color: "#52C41A", fontSize: "14px" }}
        />
      ),
    },
    Inprogress: {
      color: "#1677FF",
      borderColor: "#91CAFF",
      icon: <CachedIcon style={{ color: "#1677FF", fontSize: "14px" }} />,
    },
  };
  const config = statusConfigs[status];

  if (config) {
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          color: config.color,
          border: `1px solid ${config.borderColor}`,
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 400,
          fontFamily: "Poppins",
          cursor: "pointer",
        }}
      >
        {config.icon} {status}
      </Box>
    );
  }
  return null;
};

const defaultCellStyle = {
  fontSize: "14px",
  fontWeight: 400,
  fontFamily: "Poppins",
  border: "1px solid #F0F0F0",
};

const backgroundGreyCellStyle = {
  backgroundColor: "#FAFAFA",
};

const DetailForLocal = forwardRef((props, ref) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const [showBox, setShowBox] = useState(true);
  const [showBox2, setShowBox2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [committeeData, setCommitteeData] = useState([]);
  const [fromLocalUploadedFiles, setFromLocalUploadedFiles] = useState([]);
  const [tabInformationIndex, setTabInformationIndex] = useState(0);
  const [valuationMaster, setValuationMaster] = useState(null)
  const [overviewAttachFiles, setOverviewAttachFiles] = useState([])

  const { data: localValuation } = useGetLocalValuationByIdQuery(id, { skip: !id });
  const [updateLocalValuation] = useUpdateLocalValuationMutation();

  useEffect(() => {
    if (localValuation) {
      setValuationMaster(localValuation?.data?.valuationMaster)
      const convertOverviewAttachFiles = (localValuation?.data?.valuationMaster?.overviewAttachFiles ?? []).map(item => {
        return {
          ...item,
          size: item.fileSize,
          url: `${BASE_URL.FILE_API}${item.filePath}`
        }
      })
      setOverviewAttachFiles(convertOverviewAttachFiles)
      const convertData = (localValuation?.data?.valuationMaster?.committeeMembers ?? []).map(item => {
        return {
          ...item,
          id: item.id,
          memberType: item.memberTypeDisplayValue,
          position: item.memberPosition,
          isNew: false,
        };
      })
      setCommitteeData(convertData);
    }
  }, [localValuation]);

  const submit = () => {
    const formData = new FormData();
    fromLocalUploadedFiles.forEach(file => {
      formData.append('fromLocalUploadedFiles', file);
    });
    handleSave(formData);
  };

  const handleSave = async (data) => {
    try {
      await updateLocalValuation({ id: id, body: data }).unwrap();
      navigate('/land-valuation')
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  useImperativeHandle(ref, () => ({
    submit
  }));
  
  const handleTabInformationChange = (event, newValue) => {
    setTabInformationIndex(newValue);
  };

  const handleCloneButton = () => {
    setShowBox2(false);
  };

  const handleUploadClick = () => {
    setShowBox(false);
    setShowMarker(true);
  };

  const handleClearButton = () => {
    setShowBox(true);
    setShowMarker(false);
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const handleFromLocalFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setFromLocalUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFromLocalUploadFileDelete = (fileId) => {
    setFromLocalUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileId)
    );
  };
  const initialRows1 = [
    {
      id: 1,
      zone: "A1",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 2,
      zone: "A2",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 3,
      zone: "A3",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 4,
      zone: "A4",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 5,
      zone: "A5",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 6,
      zone: "A6",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 7,
      zone: "A7",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 8,
      zone: "A8",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 9,
      zone: "A9",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
    {
      id: 10,
      zone: "A10",
      mainStreet: 6500000,
      connectingRoad: 4800000,
      junctionStreet: 3200000,
      streetAsTheyUsedToBe: 1600000,
    },
  ];
  const initialRows2 = [
    {
      id: 1,
      mapSheet: 11,
      parcelNo: 17,
      surveyedPrice: 4800000,
      roadType: 1,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 2,
      mapSheet: 14,
      parcelNo: 17,
      surveyedPrice: 4800000,
      roadType: 3,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 3,
      mapSheet: 71,
      parcelNo: 43,
      surveyedPrice: 4800000,
      roadType: 2,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 4,
      mapSheet: 11,
      parcelNo: 61,
      surveyedPrice: 4800000,
      roadType: 4,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 5,
      mapSheet: 15,
      parcelNo: 21,
      surveyedPrice: 4800000,
      roadType: 1,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 6,
      mapSheet: 21,
      parcelNo: 44,
      surveyedPrice: 4800000,
      roadType: 3,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 7,
      mapSheet: 32,
      parcelNo: 65,
      surveyedPrice: 4800000,
      roadType: 2,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 8,
      mapSheet: 58,
      parcelNo: 29,
      surveyedPrice: 4800000,
      roadType: 2,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 9,
      mapSheet: 39,
      parcelNo: 38,
      surveyedPrice: 4800000,
      roadType: 4,
      building: 1,
      landType: 1,
      landUse: 1,
    },
    {
      id: 10,
      mapSheet: 46,
      parcelNo: 54,
      surveyedPrice: 4800000,
      roadType: 1,
      building: 1,
      landType: 1,
      landUse: 1,
    },
  ];

  const columns1 = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "zone",
      headerName: t("Zone"),
      editable: true,
      // flex: 1,
      width: 60,
    },
    {
      field: "mainStreet",
      headerName: t("Main Street"),
      editable: true,
      flex: 1,
    },
    {
      field: "connectingRoad",
      headerName: t("Connecting Roads"),
      editable: true,
      flex: 1,
    },
    {
      field: "junctionStreet",
      headerName: t("Junction Street"),
      editable: true,
      flex: 1,
    },
    {
      field: "streetAsTheyUsedToBe",
      headerName: t("Streets as they used to be"),
      editable: true,
      // flex: 1,
      width: 220,
    },
  ];
  const columns2 = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "mapSheet",
      headerName: t("Map Sheet"),
      editable: true,
      flex: 1,
    },
    {
      field: "parcelNo",
      headerName: t("Parcel Number"),
      editable: true,
      flex: 1,
    },
    {
      field: "surveyedPrice",
      headerName: t("Surveyed Price"),
      editable: true,
      width: 150,
      // flex: 1,
    },
    {
      field: "roadType",
      headerName: t("Road type"),
      editable: true,
      flex: 1,
    },
    {
      field: "building",
      headerName: t("Building"),
      editable: true,
      flex: 1,
    },
    {
      field: "landType",
      headerName: t("Land type"),
      editable: true,
      flex: 1,
    },
    {
      field: "landUse",
      headerName: t("landUse"),
      editable: true,
      flex: 1,
    },
  ];

  const [rows1] = useState(initialRows1);
  const [rows2] = useState(initialRows2);

  const visibleColumns1 = columns1.filter((column) => column.field != "id");
  const visibleColumns2 = columns2.filter((column) => column.field != "id");

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    }}>
      <Box>
        <ThemeProvider theme={theme}>
          <Accordion
            defaultExpanded
            sx={{
              "&.MuiAccordionSummary-content.Mui-expanded": {
                alignItems: "center",
              },
              "&.MuiAccordionSummary-content": {
                alignItems: "center !important",
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ExpandIcon style={{ marginRight: "8px", width: "16px" }} />
              <Typography variant="h6">{t("Overview")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <TableContainer
                  sx={{ border: "1px solid #F0F0F0", borderRadius: "8px" }}
                >
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("status")}
                        </TableCell>
                        <TableCell sx={{ ...defaultCellStyle }}>
                          {renderStatus("Requested")}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("Decision Date")}
                        </TableCell>
                        <TableCell sx={{ ...defaultCellStyle }}>
                          {dayjs(valuationMaster?.updatedAt).format(FORMAT_DATE.DMY)}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("baseYear")}
                        </TableCell>
                        <TableCell sx={{ ...defaultCellStyle }}>
                          {valuationMaster?.baseYear}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("province")}
                        </TableCell>
                        <TableCell sx={{ ...defaultCellStyle }}>
                          {t("Vientiane")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("Evaluation Member")}
                        </TableCell>
                        <TableCell colSpan={3} sx={{ ...defaultCellStyle }}>
                          {valuationMaster?.nameMembers ?? ''}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("Committee Duration")}
                        </TableCell>
                        <TableCell colSpan={3} sx={{ ...defaultCellStyle }}>
                          {valuationMaster && valuationMaster?.committeEdate ? `${dayjs(valuationMaster?.committeSdate).format(FORMAT_DATE.DMY)} to ${dayjs(valuationMaster?.committeEdate).format(FORMAT_DATE.DMY)}` : ''}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("title")}
                        </TableCell>
                        <TableCell colSpan={7} sx={{ ...defaultCellStyle }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#1F1F1F",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "22px",
                              }}
                            >
                              {valuationMaster?.title ?? ''}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("note")}
                        </TableCell>
                        <TableCell colSpan={7} sx={{ ...defaultCellStyle }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            {valuationMaster?.description ?? ''}
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            ...defaultCellStyle,
                            ...backgroundGreyCellStyle,
                          }}
                        >
                          {t("Attach")}
                        </TableCell>
                        <TableCell
                          colSpan={7}
                          sx={{
                            ...defaultCellStyle,
                          }}
                        >
                          <Box sx={{ display: "flex", gap: "8px" }}>
                            {
                              overviewAttachFiles.map((item, index) => {
                                return (
                                  <Box
                                    key={index}
                                    sx={{
                                      display: "flex",
                                      gap: "9px",
                                      alignItems: "center",
                                      width: "fit-content",
                                      paddingLeft: "5px",
                                      paddingRight: "19px",
                                      marginRight: "33px",
                                      "&:hover": {
                                        backgroundColor: "#F5F5F5",
                                        borderRadius: "4px",
                                        paddingRight: "5px",
                                        marginRight: "24px",
                                        "& .download-icon": {
                                          display: "block",
                                        },
                                      },
                                    }}
                                  >
                                    <Box sx={{
                                      width: 16,
                                      height: 16,
                                      mr: '5px',
                                    }}>
                                      <AttachIcon color="#8C8C8C" />
                                    </Box>
                                    <Typography>{item.name}</Typography>
                                    <DownloadIcon
                                      className="download-icon"
                                      sx={{ fontSize: 14, display: "none" }}
                                    />
                                  </Box>
                                )
                              })
                            }
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              "&.MuiAccordionSummary-content.Mui-expanded": {
                alignItems: "center",
              },
              "&.MuiAccordionSummary-content": {
                alignItems: "center !important",
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel1a-content1"
              id="panel1a-header1"
            >
              <ExpandIcon style={{ marginRight: "8px", width: "16px" }} />
              <Typography variant="h6">{t("Committee Information")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '8px'
                  }}
                >
                  <Typography
                    sx={{ 
                      display: 'block', 
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                    }}
                  >
                    {t('Description')}
                  </Typography>
                  { valuationMaster?.committeeDescription && 
                    <Typography
                      sx={{ 
                        display: 'block', 
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                      }}
                    >
                      {valuationMaster?.committeeDescription}
                    </Typography>
                  }
                </Box>
                <Box sx={{ height: "320px" }} >
                  <CommitteeTableForLocal initialData={committeeData} />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 500,
            color: "#000000E0",
          }}
        >
          {t("Land Valuation Information")}
        </Typography>
        <Box
          sx={{
            height: "700px",
            borderRadius: "12px",
            border: "1px solid #F0F0F0",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "50%",
              borderRight: "1px solid  #F0F0F0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {showBox ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "300px",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <img
                  src="/Illustration.svg"
                  alt="illus"
                  style={{ width: "97px" }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "SF Pro Text",
                    marginTop: "8px",
                  }}
                >
                  {t("To register an evaluation area you can either upload a new GIS file or clone a previous land valuation area.")}
                </Typography>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "#1677FF",
                    textTransform: "none",
                    width: "290px",
                    marginBottom: "12px",
                    marginTop: "8px",
                  }}
                  variant="outlined"
                  startIcon={<UploadIcon sx={{ fill: "#fff" }} />}
                  onClick={handleUploadClick}
                >
                  {t("Upload a new GIS file")}
                </Button>
                <Button
                  sx={{
                    color: "#1677FF",
                    backgroundColor: "white",
                    borderColor: "#1677FF",
                    textTransform: "none",
                    width: "290px",
                  }}
                  variant="outlined"
                  startIcon={<CopyIcon />}
                  onClick={handleUploadClick}
                >
                  {t("Copy from the previous time")}
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                  width: "100%",
                  height: "90%",
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Tabs
                    value={tabInformationIndex}
                    onChange={handleTabInformationChange}
                    textColor="inherit"
                    indicatorColor="transparent"
                    sx={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: "6px",
                      padding: "2px",
                      "&.MuiTabs-root": {
                        minHeight: "32px",
                      },
                      alignItems: "center",
                      gap: "2px",
                      marginBottom: "12px",
                      marginLeft: "16px",
                      marginTop: "16px",
                      width: "fit-content",
                    }}
                  >
                    <CustomTab
                      label="Zone"
                      sx={{ width: "fit-content", minWidth: "0" }}
                    />
                    <CustomTab
                      label="Survey"
                      sx={{ width: "fit-content", minWidth: "0" }}
                    />
                  </Tabs>
                  {tabInformationIndex === 0 && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        padding: "0 16px",
                      }}
                    >
                      <DataGrid
                        rows={rows1}
                        columns={visibleColumns1}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 10,
                            },
                          },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        disableColumnSorting
                        disableColumnFilter
                        disableColumnMenu
                        sx={{
                          width: "100%",
                          "& .MuiDataGrid-columnHeaders": {
                            color: "#000000E0",
                          },
                          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader":
                            {
                              background: "#FAFAFA",
                            },
                          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle":
                            {
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              fontWeight: 500,
                            },
                        }}
                      />
                    </Box>
                  )}
                  {tabInformationIndex === 1 && (
                    <Box sx={{ height: "100%" }}>
                      {showBox2 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "473px",
                            height: "100%",
                            textAlign: "center",
                            margin: "auto",
                            gap: "16px",
                          }}
                        >
                          <img
                            src="/Illustration.svg"
                            alt="illus"
                            style={{ width: "97px" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins",
                              marginTop: "8px",
                            }}
                          >
                            {t("No surveyed parcel information is currently registered. Please import parcels from the Parcel Survey Management System.")}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "100%",
                            }}
                          >
                            <label
                              style={{
                                fontSize: "14px",
                                fontWeight: 400,
                                fontFamily: "Poppins",
                              }}
                            >
                              <span style={{ color: "red" }}>*</span>{" "}
                              {t("Duration")}
                            </label>
                            <DateRangePicker
                              clearIcon={null}
                              onChange={handleDateChange}
                              value={dateRange}
                              calendarIcon={<CalendarIcon />}
                              rangeDivider={<CustomDateDivider />}
                            />
                          </Box>
                          <Button
                            sx={{
                              color: "white",
                              backgroundColor: "#1677FF",
                              textTransform: "none",
                              marginTop: "8px",
                              width: "100%",
                              fontSize: "16px",
                              fontWeight: 400,
                              fontFamily: "Poppins",
                            }}
                            variant="outlined"
                            startIcon={
                              <CopyIcon sx={{ fill: "white" }} />
                            }
                            onClick={handleCloneButton}
                          >
                            {t("Clone Parcels Surveyed During the Specified Period")}
                          </Button>
                          <Button
                            sx={{
                              color: "#1677FF",
                              backgroundColor: "white",
                              borderColor: "#1677FF",
                              textTransform: "none",
                              width: "100%",
                              padding: 0,
                              fontSize: "16px",
                              fontWeight: 400,
                              fontFamily: "Poppins",
                            }}
                            variant="text"
                          >
                            {t("Go to Parcel Survey Management System")}
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={{ padding: "0 16px 16px 16px" }}>
                          <DataGrid
                            rows={rows2}
                            columns={visibleColumns2}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 10,
                                },
                              },
                            }}
                            pageSizeOptions={[10]}
                            disableRowSelectionOnClick
                            disableColumnSorting
                            disableColumnFilter
                            disableColumnMenu
                            sx={{
                              width: "100%",
                              "& .MuiDataGrid-columnHeaders": {
                                color: "#000000E0",
                              },
                              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader":
                                {
                                  background: "#FAFAFA",
                                },
                              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle":
                                {
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                },
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginRight: "16px",
                    position: "absolute",
                    right: 0,
                    top: "22px",
                    cursor: "pointer",
                  }}
                  onClick={handleClearButton}
                >
                  <img src="/clear.svg" alt="clear" />
                  <Typography sx={{ color: "#FAAD14" }}>
                    {t("Clear all data")}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ width: "50%", padding: "16px", height: "100%" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {showMarker && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "24px" }}>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      <img src="/red pin.svg" alt="surveyed" />
                      <Typography>{t("Surveyed Parcel")}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      <img src="/gray pin.svg" alt="surveyed" />
                      <Typography>{t("Not surveyed")}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Checkbox
                      defaultChecked
                      sx={{
                        "&.Mui-checked": {
                          color: "#1677FF",
                        },
                      }}
                    />
                    {t("Label")}
                  </Box>
                </Box>
              )}
              <MapContainer
                center={position}
                zoom={19}
                style={{
                  height: showMarker ? "90%" : "100%",
                  width: "100%",
                  borderRadius: "8px",
                }}
                zoomControl={false}
                key="map2"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl />
                <MinimapControl position="topright" zoom={15} />
                {showMarker && (
                  <Marker position={position} icon={customIcon}>
                    <Popup closeButton={false}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{
                              margin: "0 !important",
                              fontFamily: "SF Pro Text",
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#00000073",
                            }}
                          >
                                    {t("Vientiane")} / {t("Phonhong")}
                                    </Typography>
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <span style={{ fontWeight: 600 }}>A1</span>
                          (1,100.21 m<sup>2</sup>)
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#000000A6",
                                margin: "0 !important",
                              }}
                            >
                              {t("Main Street")}:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#000000E0",
                                margin: "0 !important",
                              }}
                            >
                              6,500,000
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#000000A6",
                                margin: "0 !important",
                              }}
                            >
                              Connecting Roads:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#000000E0",
                                margin: "0 !important",
                              }}
                            >
                              4,800,000
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#000000A6",
                                margin: "0 !important",
                              }}
                            >
                              Junction Street:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#000000E0",
                                margin: "0 !important",
                              }}
                            >
                              3,200,000
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#000000A6",
                                maxWidth: "120px",
                                textAlign: "left",
                                margin: "0 !important",
                              }}
                            >
                              Streets as they used to be:
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#000000E0",
                                margin: "0 !important",
                              }}
                            >
                              1,600,000
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "fit-content",
          border: "1px solid #D9D9D9",
          borderRadius: "12px",
          position: "relative",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            mb: 2,
            position: "absolute",
            top: "-15px",
            left: "15px",
            backgroundColor: "#ffffff",
            padding: "0 8px",
            color: "#000000E0",
          }}
        >
          {t("Attachments")}
        </Typography>
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<UploadIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              border: "1px solid #1677FF",
              color: "#1677FF",
            }}
          >
            {t("Upload")}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFromLocalFileUpload}
              id="fileInputId2"
              multiple
            />
          </Button>
        </Box>
        {
          fromLocalUploadedFiles.length > 0 && 
          <CustomUploadFile
            files={fromLocalUploadedFiles}
            onDelete={handleFromLocalUploadFileDelete}
          />
        }
      </Box>
    </Box>
  )
})

DetailForLocal.displayName = 'DetailForLocal'

export default DetailForLocal