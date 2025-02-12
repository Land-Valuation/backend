import {
  Box,
  IconButton,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Grid,
  FormControl,
  List,
  ListItem,
  Divider,
  ListItemText,
  Stack,
  Tabs,
  Tab,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CachedIcon from "@mui/icons-material/Cached";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LayoutPageCommon from "../../../components/LayoutPageCommon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useMemo, useCallback } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Footer from "../../../components/Footer";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import CustomDataGrid from "../../../components/customMUI/CustomDataGrid";
import CustomUploadFile from "../../../components/customMUI/CustomUploadFile";
import { DataGrid } from "@mui/x-data-grid";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  Rectangle,
  GeoJSON,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import UserService from "../../../state/UserService";
import SaveIcon from "../../../assets/icons/model-base/SaveIcon";
import CloseIcon from "../../../assets/icons/land-valuation/CloseIcon";
import CalendarIcon from "../../../assets/icons/land-valuation/CalendarIcon";
import AttachIcon from "../../../assets/icons/land-valuation/AttachIcon";
import DeleteIcon from "../../../assets/icons/land-valuation/DeleteIcon";
import CustomDateDivider from "../../../assets/icons/land-valuation/CustomDateDivider";
import UploadIcon from "../../../assets/icons/land-valuation/UploadIcon";
import DownloadIcon from "../../../assets/icons/land-valuation/DownloadIcon";
import { POSITION_CLASSES } from "../../../utils/constant";
import DistrictList from "./DistrictList";
import CopyIcon from "../../../assets/icons/land-valuation/CopyIcon";
import ExpandIcon from "../../../assets/icons/land-valuation/ExpandIcon";
import ParcelList2 from "./ParcelList2";
import ParcelList from "./ParcelList";
import { attachments, customIcon, customIcon1, customIcon2, CustomTab, FileCard, FileIcon, fileIcons, geoData, geoJsonStyle, position, position1, position2, position3, position4, position5, position6, VisuallyHiddenInput } from "./common";
import { useTranslation } from "react-i18next";
// import {geoData} from "../../../data/geoData";

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

const LandValuationDetail = () => {
  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState(new Date(2024, 0, 1));
  const [selectedProvince, setSelectedProvince] = useState(1);
  const [committeeStatus, setCommitteeStatus] = useState("");
  const [landValuationStatus, setLandValuationStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFiles2, setUploadedFiles2] = useState([]);
  const [uploadedFiles3, setUploadedFiles3] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [showBox, setShowBox] = useState(true);
  const [showBox2, setShowBox2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);
  const { t } = useTranslation();
  const onDelete = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
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

  const userRole = UserService.getTokenParsed().realm_access.roles;
  const hasCentralRole = userRole.some((role) => role.includes("CENTRAL"));

  const BOUNDS_STYLE = { weight: 1 };

  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap();

    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom());
      },
      [parentMap]
    );
    useMapEvent("click", onClick);

    const [bounds, setBounds] = useState(parentMap.getBounds());
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds());
      minimap.setView(parentMap.getCenter(), zoom);
    }, [minimap, parentMap, zoom]);

    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
    useEventHandlers({ instance: parentMap }, handlers);

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
  }

  function MinimapControl({ position, zoom }) {
    const parentMap = useMap();
    const mapZoom = zoom || 0;

    const minimap = useMemo(
      () => (
        <MapContainer
          style={{
            height: 32,
            width: 32,
            borderRadius: "8px",
            border: "2px solid #FFFFFF",
            boxShadow: "0px 2px 4px 0px #0000002E",
          }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      []
    );

    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    );
  }

  const ZoomControl = () => {
    const map = useMap();

    const handleZoomIn = () => {
      map.zoomIn();
    };

    const handleZoomOut = () => {
      map.zoomOut();
    };

    return (
      <div
        className="leaflet-control-zoom"
        style={{
          position: "absolute",
          top: "50px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <a
          href="#"
          className="leaflet-control-zoom-in"
          onClick={(e) => {
            e.preventDefault();
            handleZoomIn();
          }}
        >
          <img src="/zoom in.svg" alt="zoomin" />
        </a>
        <a
          href="#"
          className="leaflet-control-zoom-out"
          onClick={(e) => {
            e.preventDefault();
            handleZoomOut();
          }}
        >
          <img src="/zoom out.svg" alt="zoomout" />
        </a>
      </div>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "memberType",
      headerName: t("Member Type"),
      editable: true,
      flex: 1,
    },
    {
      field: "organization",
      headerName: t("Organization"),
      editable: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: t("Name"),
      editable: true,
      flex: 1,
    },
    {
      field: "position",
      headerName: t("Position"),
      editable: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: t("Phone Number"),
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: t("Email"),
      editable: true,
      flex: 1,
    },
  ];
  const columns1 = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "zone",
      headerName: "Zone",
      editable: true,
      // flex: 1,
      width: 60,
    },
    {
      field: "mainStreet",
      headerName: "Main Street",
      editable: true,
      flex: 1,
    },
    {
      field: "connectingRoad",
      headerName: "Connecting Road",
      editable: true,
      flex: 1,
    },
    {
      field: "junctionStreet",
      headerName: "Junction Street",
      editable: true,
      flex: 1,
    },
    {
      field: "streetAsTheyUsedToBe",
      headerName: "Street As They Used To Be",
      editable: true,
      // flex: 1,
      width: 220,
    },
  ];
  const columns2 = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "mapSheet",
      headerName: "Map Sheet",
      editable: true,
      flex: 1,
    },
    {
      field: "parcelNo",
      headerName: "Parcel No",
      editable: true,
      flex: 1,
    },
    {
      field: "surveyedPrice",
      headerName: "Surveyed Price",
      editable: true,
      width: 150,
      // flex: 1,
    },
    {
      field: "roadType",
      headerName: "Road Type",
      editable: true,
      flex: 1,
    },
    {
      field: "building",
      headerName: "Building",
      editable: true,
      flex: 1,
    },
    {
      field: "landType",
      headerName: "Land Type",
      editable: true,
      flex: 1,
    },
    {
      field: "landUse",
      headerName: "Land Use",
      editable: true,
      flex: 1,
    },
  ];
  const initialRows = [
    {
      id: 1,
      memberType: t("Member"),
      organization: "000 Association",
      name: "Somchai Vongxay",
      position: "Professors",
      phone: "+856 20 5555 1234",
      email: "somchai.vongxay@example.com",
    },
    {
      id: 2,
      memberType: t("Chairperson"),
      organization: "000 Association",
      name: "Chanthavy Inthavong",
      position: "Ph.D., Master",
      phone: "+856 20 5555 1234",
      email: "somchai.vongxay@example.com",
    },
    {
      id: 3,
      memberType: t("Member"),
      organization: "000 Association",
      name: "Soudalay Phommasone",
      position: "Professors",
      phone: "+856 20 5555 1234",
      email: "somchai.vongxay@example.com",
    },
    {
      id: 4,
      memberType: t("Member"),
      organization: "000 Association",
      name: "Khamla Phanthavong",
      position: "Ph.D., Master",
      phone: "+856 20 5555 1234",
      email: "somchai.vongxay@example.com",
    },
    {
      id: 5,
      memberType: t("Member"),
      organization: "000 Association",
      name: "Keo Sihalath",
      position: "Ph.D., Master",
      phone: "+856 20 5555 1234",
      email: "somchai.vongxay@example.com",
    },
  ];
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
  const visibleColumns = columns.filter((column) => column.field !== "id");
  const visibleColumns1 = columns1.filter((column) => column.field != "id");
  const visibleColumns2 = columns2.filter((column) => column.field != "id");

  const [rows, setRows] = useState(initialRows);
  const [rows1, setRows1] = useState(initialRows1);
  const [rows2, setRows2] = useState(initialRows2);

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toLowerCase();
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleDateChange = (range) => {
    setDateRange(range);
  };
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };
  const handleFileUpload2 = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      uploadTime: new Date(),
    }));
    setUploadedFiles2((prevFiles) => [...prevFiles, ...files]);
  };
  const handleFileUpload3 = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      uploadTime: new Date(),
    }));
    setUploadedFiles3((prevFiles) => [...prevFiles, ...files]);
  };
  const handleDeleteFile = (fileId) => {
    setUploadedFiles2((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileId)
    );
    // document.getElementById("fileInputId").value = "";
  };
  const handleDeleteFile2 = (fileId) => {
    setUploadedFiles3((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileId)
    );
  };
  const handleCommitteeStatusChange = (event) => {
    setCommitteeStatus(event.target.value);
  };
  const handleLandValuationStatusChange = (event) => {
    setLandValuationStatus(event.target.value);
  };

  const breadcrumbData = [
    { name: t("home"), href: "/" },
    { name: t("Land Valuation"), href: "/land-valuation" },
  ];

  return (
    <>
      <LayoutPageCommon
        breadcrumbData={breadcrumbData}
        title={t("Detail information on land valuation profile")}
        actions={
          <>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #0000001A",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: "none",
              }}
              variant="contained"
              startIcon={<CloseIcon />}
            >
              {t("cancel")}
            </Button>
            <Button
              sx={{
                backgroundColor: "#1677FF",
                color: "#fff",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                minWidth: "32px",
                minHeight: "32px",
                boxShadow: "none",
              }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              {t("save")}
            </Button>
          </>
        }
      >
        {hasCentralRole ? (
          <>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "20px",
                color: "#00000073",
                marginTop: "22px",
                marginBottom: "16px",
              }}
            >
              {t("Overview")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                }}
              >
                <label htmlFor="calendar">
                  <span style={{ color: "red" }}>*</span> {t("baseYear")}
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="calendar"
                    views={["year"]}
                    value={selectedYear}
                    onChange={(newValue) => {
                      setSelectedYear(newValue);
                    }}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                      "& .MuiPaper-root": {
                        "& .MuiCalendarPicker-root": {
                          height: "300px",
                        },
                      },
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          "& .MuiInputBase-root": {
                            height: "40px",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                }}
              >
                <label htmlFor="province">
                  <span style={{ color: "red" }}>*</span> {t("province")}
                </label>
                <Select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  sx={{ height: "40px" }}
                >
                  <MenuItem value="1">{t("Vientiane")}</MenuItem>
                </Select>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <label htmlFor="province">
                  <span style={{ color: "red" }}>*</span> {t("title")}
                </label>
                <TextField
                  placeholder={t("enterTitle")}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                    },
                  }}
                ></TextField>
              </Box>
            </Box>
            <label style={{ marginTop: "17px" }}>{t("note")}</label>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                },
              }}
              placeholder={t("enterContent")}
            ></TextField>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "32px",
                marginTop: "32px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #D9D9D9",
                  borderRadius: "8px",
                  p: 2,
                  mt: 2,
                  position: "relative",
                  width: "50%",
                  marginTop: "0",
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
                    backgroundColor: "#ffffff",
                    padding: "0 8px",
                    color: "#000000E0",
                  }}
                >
                  {t("Approval Status")}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <label
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22px",
                        }}
                      >
                        <span style={{ color: "red" }}>*</span>
                        {t("Committee Approval Status")}
                      </label>
                      <Select
                        displayEmpty
                        defaultValue={t("Select")}
                        value={committeeStatus}
                        onChange={handleCommitteeStatusChange}
                        sx={{ height: "40px" }}
                      >
                        <MenuItem disabled value="">
                        {t("Select")}
                        </MenuItem>
                        <MenuItem value="approved">{t("Approved")}</MenuItem>
                        <MenuItem value="pending">{t("Pending")}</MenuItem>
                        <MenuItem value="rejected">{t("Rejected")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <label
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22px",
                        }}
                      >
                        <span style={{ color: "red" }}>*</span>
                        {t("Land Valuation Result Approval Status")}
                      </label>
                      <Select
                        displayEmpty
                        defaultValue="Select"
                        value={landValuationStatus}
                        onChange={handleLandValuationStatusChange}
                        sx={{ height: "40px" }}
                      >
                        <MenuItem disabled value="">
                        {t("Select")}
                        </MenuItem>
                        <MenuItem value="approved">{t("Approved")}</MenuItem>
                        <MenuItem value="pending">{t("Pending")}</MenuItem>
                        <MenuItem value="rejected">{t("Rejected")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<AttachIcon />}
                  sx={{
                    border: "1px solid #1677FF",
                    borderRadius: "6px",
                    textTransform: "none",
                    color: "#1677FF",
                  }}
                >
                  {t("Attach")}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileUpload}
                    multiple
                  />
                </Button>
                {uploadedFiles.length > 0 && (
                  <List>
                    {uploadedFiles.map((file, index) => {
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            width: "100%",
                            padding: '0 8px',
                            "&:hover": {
                              backgroundColor: "#F5F5F5",
                              borderRadius: "4px",
                              padding: '0 8px',
                            },
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(-1)}
                        >
                          <Box sx={{
                            width: 16,
                            height: 16,
                            mr: '5px',
                          }}>
                            <AttachIcon color="#8C8C8C" />
                          </Box>
                          <ListItemText primary={file.name} />
                          {hoveredIndex === index && (
                            <IconButton
                              onClick={() => onDelete(index)}
                              size="small"
                              sx={{ marginLeft: "auto" }}
                            >
                              <DeleteIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "20px",
                color: "#00000073",
                marginTop: "22px",
                marginBottom: "24px",
              }}
            >
              {t("Land Valuation Committee Information")}
            </Typography>
            <Box
              sx={{
                height: "452px",
                border: "1px solid #D9D9D9",
                borderRadius: "12px",
                position: "relative",
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
                {t("Committee Information")}
              </Typography>
              <Box
                sx={{
                  padding: "16px 24px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "24px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "70%",
                  }}
                >
                  <label>
                    <span style={{ color: "red" }}>*</span> {t("Description")}
                  </label>
                  <TextField
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                    }}
                    placeholder={t("enterTitle")}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                  }}
                >
                  <label>
                    <span style={{ color: "red" }}>*</span>{" "}
                    {t("Committee Duration")}
                  </label>
                  <DateRangePicker
                    clearIcon={null}
                    onChange={handleDateChange}
                    value={dateRange}
                    calendarIcon={<CalendarIcon />}
                    rangeDivider={<CustomDateDivider />}
                    // dayPlaceholder="Start date"
                    // monthPlaceholder=""
                    // yearPlaceholder=""
                  />
                </Box>
              </Box>
              <Box
                sx={{ height: "320px", margin: "24px", paddingBottom: "12px" }}
              >
                <CustomDataGrid />
              </Box>
            </Box>
            <Box
              sx={{
                height: "fit-content",
                border: "1px solid #D9D9D9",
                borderRadius: "12px",
                position: "relative",
                marginTop: "32px",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingBottom: "24px",
                // overflowY:"auto"
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
                {t("Land Valuation Reference Data (To Local Government)")}
                {/* <span style={{ fontWeight: 400 }}> (To Local Government)</span> */}
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<UploadIcon />}
                sx={{
                  textTransform: "none",
                  marginTop: "32px",
                  // marginBottom: "24px",
                  borderRadius: "6px",
                  border: "1px solid #1677FF",
                  color: "#1677FF",
                }}
              >
                {t("Upload document")}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload2}
                  id="fileInputId"
                  multiple
                />
              </Button>
              <CustomUploadFile
                files={uploadedFiles2}
                onDelete={handleDeleteFile}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "20px",
                color: "#00000073",
                marginTop: "32px",
                marginBottom: "24px",
              }}
            >
              {t("Data Received from Local Government")}
            </Typography>
            <Box
              sx={{
                height: "700px",
                border: "1px solid #D9D9D9",
                borderRadius: "12px",
                display: "flex",
                width:"100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  width: "260px",
                  borderRadius: "12px 0 0 12px",
                }}
              >
                <Typography
                  sx={{
                    padding: "16px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  {t("district")}
                </Typography>
                <Stack spacing={"8px"} sx={{ margin: "0 16px 16px 16px" }}>
                  <DistrictList />
                </Stack>
              </Box>
              <Box sx={{ width: "100%", padding: "8px 24px 8px 24px", flex: 1 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  indicatorColor="transparent"
                  sx={{
                    borderBottom: "1px solid #F0F0F0",
                    width: "100%",
                    "& .MuiTab-root": {
                      color: "##000000E0",
                      textTransform: "none",
                      fontFamily: "SF Pro Text",
                      fontSize: "14px",
                      fontWeight: 400,
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "#1677FF",
                      fontWeight: 600,
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#1677FF",
                    },
                  }}
                >
                  <Tab label={t("Overview")} />
                  <Tab label={t("Land Valuation")} />
                </Tabs>
                {value === 0 && (
                  <Box
                    sx={{ height: "600px", overflow: "auto", width: "100%" }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          margin: "16px 0",
                          color: "#000000E0",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        {t("Land Valuation Result")}
                      </Typography>
                      <Box sx={{ display: "flex", gap: "24px" }}>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          sx={{
                            color: "#1677FF",
                            textTransform: "none",
                            width: "50%",
                            border: "1px solid #1677FF",
                            borderRadius: "8px",
                          }}
                        >
                          {t("Download All Land Valuation Areas")} (*.shp)
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          sx={{
                            color: "#1677FF",
                            textTransform: "none",
                            width: "50%",
                            border: "1px solid #1677FF",
                            borderRadius: "8px",
                          }}
                        >
                          {t("Download All Land Valuation Tables")} (*.xlsx)
                        </Button>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        margin: "24px 0 12px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#00000073",
                      }}
                    >
                      {t("Attachments")}:
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px",
                      }}
                    >
                      {attachments.map((file) => {
                        const fileExtension = getFileExtension(file.name);
                        const iconSrc = fileIcons[fileExtension];
                        return (
                          <FileCard
                            key={file.name}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <FileIcon
                              src={iconSrc}
                              alt={`${fileExtension} icon`}
                            />
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  textOverflow: "ellipsis",
                                  maxWidth: "210px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                }}
                              >
                                {file.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#888" }}
                              >
                                {file.size}
                              </Typography>
                            </Box>
                            <IconButton>
                              <DownloadIcon sx={{ color: "#00000073" }} />
                            </IconButton>
                          </FileCard>
                        );
                      })}
                    </Box>
                    <Typography
                      sx={{
                        margin: "32px 0 8px 0",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "22px",
                        color: "#000000E0",
                      }}
                    >
                      {t("Committee Members")}
                    </Typography>
                    <Typography
                      sx={{
                        margin: "8px 0 2px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#00000073",
                      }}
                    >
                      {t("Description")}:
                    </Typography>
                    <Typography
                      sx={{
                        margin: "8px 0 2px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#1F1F1F",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur. Enim est in odio
                      nulla felis morbi at sit eget. Enim aliquam non quis
                      egestas risus aliquet arcu. Nullam dapibus blandit sed sit
                      diam. Rhoncus nec sed hendrerit a nam tellus proin.
                    </Typography>
                    <Typography
                      sx={{
                        margin: "12px 0 2px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#00000073",
                      }}
                    >
                      {t("Committee Duration")}:
                    </Typography>
                    <Typography sx={{ marginBottom: "16px" }}>
                      01-09-2024 to 09-11-2024
                    </Typography>
                    <Box
                      mt="20px"
                      height="360px"
                      display="grid"
                      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                      justifyContent="space-between"
                      rowGap="20px"
                      columnGap="1.33%"
                      sx={{
                        "& > div": { gridColumn: "span 12" },
                        width: "100%",
                        "& .MuiDataGrid-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiDataGrid-cell": {
                          borderBottom: "none",
                        },
                        "& .MuiDataGrid-container--top [role=row]": {
                          borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {},
                        "& .MuiDataGrid-footerContainer": {
                          borderTop: "none",
                        },
                      }}
                    >
                      <DataGrid
                        rows={rows}
                        columns={visibleColumns}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        pageSizeOptions={[5]}
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
                  </Box>
                )}
                {value === 1 && (
                  <Box
                    sx={{
                      height: "600px",
                      overflow: "auto",
                      width: "100%",
                      display: "flex",
                      gap: "24px",
                      marginTop: "16px",
                    }}
                  >
                    <Box sx={{ width: "240px" }}>
                      <Tabs
                        value={value1}
                        onChange={handleChange1}
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
                        }}
                      >
                        <CustomTab label={t("Zone")} />
                        <CustomTab label={t("Survey")} />
                      </Tabs>
                      {value1 === 0 && (
                        <Box
                          sx={{
                            height: "550px",
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <ParcelList />
                        </Box>
                      )}
                      {value1 === 1 && (
                        <Box
                          sx={{
                            height: "550px",
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <ParcelList2 />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ width: "calc(100% - 240px)" }}>
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
                      <Box>
                        <MapContainer
                          center={position}
                          zoom={19}
                          style={{
                            height: "560px",
                            width: "100%",
                            borderRadius: "8px",
                          }}
                          zoomControl={false}
                          key="map1"
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <GeoJSON data={geoData} style={geoJsonStyle} />
                          <ZoomControl />
                          <MinimapControl position="topright" zoom={15} />
                          <Marker position={position} icon={customIcon1}>
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
                                    Vientiane / Phonhong
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
                                      {t("Connecting Roads")}:
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
                                      {t("Junction Street")}:
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
                                      {t("Streets as they used to be")}:
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
                          <Marker
                            position={position1}
                            icon={customIcon}
                          ></Marker>
                          <Marker
                            position={position2}
                            icon={customIcon}
                          ></Marker>
                          <Marker
                            position={position3}
                            icon={customIcon}
                          ></Marker>
                          <Marker
                            position={position4}
                            icon={customIcon2}
                          ></Marker>
                          <Marker
                            position={position5}
                            icon={customIcon2}
                          ></Marker>
                          <Marker
                            position={position6}
                            icon={customIcon2}
                          ></Marker>
                        </MapContainer>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </>
        ) : (
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
                  <Typography variant="h6">Overview</Typography>
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
                              Status
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
                              Decision Date
                            </TableCell>
                            <TableCell sx={{ ...defaultCellStyle }}>
                              N/A
                            </TableCell>
                            <TableCell
                              sx={{
                                ...defaultCellStyle,
                                ...backgroundGreyCellStyle,
                              }}
                            >
                              Base Year
                            </TableCell>
                            <TableCell sx={{ ...defaultCellStyle }}>
                              2024
                            </TableCell>
                            <TableCell
                              sx={{
                                ...defaultCellStyle,
                                ...backgroundGreyCellStyle,
                              }}
                            >
                              Province
                            </TableCell>
                            <TableCell sx={{ ...defaultCellStyle }}>
                              Vientiane
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                ...defaultCellStyle,
                                ...backgroundGreyCellStyle,
                              }}
                            >
                              Evaluation Member
                            </TableCell>
                            <TableCell colSpan={3} sx={{ ...defaultCellStyle }}>
                              000,000,000,0000,000,000,000,0000
                            </TableCell>
                            <TableCell
                              sx={{
                                ...defaultCellStyle,
                                ...backgroundGreyCellStyle,
                              }}
                            >
                              Committee Duration
                            </TableCell>
                            <TableCell colSpan={3} sx={{ ...defaultCellStyle }}>
                              01-09-2024 to 09-11-2024
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                ...defaultCellStyle,
                                ...backgroundGreyCellStyle,
                              }}
                            >
                              Title
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
                                  Title name
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
                              Note
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
                                Lorem ipsum dolor sit amet consectetur. Enim est
                                in odio nulla felis morbi at sit eget. Enim
                                aliquam non quis egestas risus aliquet arcu.
                                Nullam dapibus blandit sed sit diam. Rhoncus nec
                                sed hendrerit a nam tellus proin. At tincidunt
                                arcu eget ut nibh. Leo rhoncus mauris tortor
                                tristique tortor fames fermentum vel. Vulputate
                                adipiscing id lacus eu viverra. Et id
                                suspendisse tristique mi enim sit elit.
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
                              Attach
                            </TableCell>
                            <TableCell
                              colSpan={7}
                              sx={{
                                ...defaultCellStyle,
                              }}
                            >
                              <Box sx={{ display: "flex", gap: "8px" }}>
                                <Box
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
                                  <Typography>Approval decision.pdf</Typography>
                                  <DownloadIcon
                                    className="download-icon"
                                    sx={{ fontSize: 14, display: "none" }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "9px",
                                    alignItems: "center",
                                    width: "fit-content",
                                    padding: "0 5px",
                                    "&:hover": {
                                      backgroundColor: "#F5F5F5",
                                      borderRadius: "4px",
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
                                  <Typography>
                                    Introduction and User Guide.pdf
                                  </Typography>
                                  <DownloadIcon
                                    className="download-icon"
                                    sx={{ fontSize: 14, display: "none" }}
                                  />
                                </Box>
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
                  <Typography variant="h6">Committee Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "24px",
                      marginBottom: "24px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "70%",
                      }}
                    >
                      <label>
                        <span style={{ color: "red" }}>*</span> Description
                      </label>
                      <TextField
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                          },
                        }}
                        placeholder="Enter title"
                      ></TextField>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "30%",
                      }}
                    >
                      <label>
                        <span style={{ color: "red" }}>*</span> Committee
                        Duration
                      </label>
                      <DateRangePicker
                        clearIcon={null}
                        onChange={handleDateChange}
                        value={dateRange}
                        calendarIcon={<CalendarIcon />}
                        rangeDivider={<CustomDateDivider />}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: "320px",
                      // margin: "24px",
                      // paddingBottom: "12px",
                    }}
                  >
                    <CustomDataGrid />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                marginTop: "32px",
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
                Land Valuation Information
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
                        To register an evaluation area you can either upload a
                        new GIS file or clone a previous land valuation area.
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
                        Upload a new GIS file
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
                        Copy from the previous time
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
                          value={value2}
                          onChange={handleChange2}
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
                        {value2 === 0 && (
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
                        {value2 === 1 && (
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
                                  No surveyed parcel information is currently
                                  registered.
                                  <br />
                                  Please import parcels from the Parcel Survey
                                  Managemaent System.
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
                                    Duration
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
                                  Clone Parcels Surveyed During the Specified
                                  Period
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
                                  Go to Parcel Survey Management System
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
                          Clear all data
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
                            <Typography>Surveyed Parcel</Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: "8px" }}>
                            <img src="/gray pin.svg" alt="surveyed" />
                            <Typography>Not surveyed</Typography>
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
                          Label
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
                                  Vientiane / Phonhong
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
                                    Main Street:
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
                marginTop: "32px",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingBottom: "24px",
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
                Attachments
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<UploadIcon />}
                sx={{
                  textTransform: "none",
                  marginTop: "32px",
                  borderRadius: "6px",
                  border: "1px solid #1677FF",
                  color: "#1677FF",
                }}
              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload3}
                  id="fileInputId2"
                  multiple
                />
              </Button>
              <CustomUploadFile
                files={uploadedFiles3}
                onDelete={handleDeleteFile2}
              />
            </Box>
          </Box>
        )}
      </LayoutPageCommon>
      <Box>
        <Divider />
        <Footer />
      </Box>
    </>
  );
};

export default LandValuationDetail;
