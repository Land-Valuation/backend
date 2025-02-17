import { Box, Button, Checkbox, FormControl, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTranslation } from "react-i18next";
import CalendarIcon from "../../../../assets/icons/land-valuation/CalendarIcon";
import AttachIcon from "../../../../assets/icons/land-valuation/AttachIcon";
import { attachments, customIcon, customIcon1, customIcon2, CustomTab, FileCard, FileIcon, fileIcons, geoData, geoJsonStyle, getFileExtension, position, position1, position2, position3, position4, position5, position6, VisuallyHiddenInput } from "../common";
import DeleteIcon from "../../../../assets/icons/land-valuation/DeleteIcon";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import CustomDateDivider from "../../../../assets/icons/land-valuation/CustomDateDivider";
import CustomDataGrid from "../../../../components/customMUI/CustomDataGrid";
import UploadIcon from "../../../../assets/icons/land-valuation/UploadIcon";
import CustomUploadFile from "../../../../components/customMUI/CustomUploadFile";
import DistrictList from "./DistrictList";
import DownloadIcon from "../../../../assets/icons/land-valuation/DownloadIcon";
import { DataGrid } from "@mui/x-data-grid";
import ParcelList from "./ParcelList";
import ParcelList2 from "./ParcelList2";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import ZoomControl from "./ZoomControl";
import MinimapControl from "./MinimapControl";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useGetAllProvincesQuery } from "../../../../state/provinceApi";
import { useGetAllCommitteeStatusTypesQuery } from "../../../../state/committeeStatusTypeApi";
import { useGetAllValuationStatusTypesQuery } from "../../../../state/valuationStatusTypeApi";

const DetailForCentral = () => {
  const { t } = useTranslation();

  const now = new Date();
  const year = now.getFullYear();
  const currentYear = new Date(year, 0, 1)
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFiles2, setUploadedFiles2] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [provinces, setProvinces] = useState([])
  const [firstProvinceCode, setFirstProvinceCode] = useState('');
  const [committeeStatusList, setCommitteeStatusList] = useState([])
  const [landValuationStatusList, setLandValuationStatusList] = useState([])

  const { data: allProvinceData } = useGetAllProvincesQuery();
  const { data: allCommitteeStatusTypes } = useGetAllCommitteeStatusTypesQuery();
  const { data: valuationStatusTypes } = useGetAllValuationStatusTypesQuery();

  useEffect(() => {
    if (allProvinceData && allProvinceData.length > 0) {
      setProvinces(allProvinceData || []);
      setFirstProvinceCode(allProvinceData[0]?.provinceCode ?? '');
    }
  }, [allProvinceData])

  useEffect(() => {
    if (allCommitteeStatusTypes && allCommitteeStatusTypes.length > 0) {
      setCommitteeStatusList(allCommitteeStatusTypes || []);
    }
  }, [allCommitteeStatusTypes])
  
  useEffect(() => {
    if (valuationStatusTypes && valuationStatusTypes.length > 0) {
      setLandValuationStatusList(valuationStatusTypes || []);
    }
  }, [valuationStatusTypes])

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

  const visibleColumns = columns.filter((column) => column.field !== "id");
  const [rows] = useState(initialRows);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const handleRangeDateChange = (newDateRange) => {
    setDateRange(newDateRange);
    formik.setFieldValue('dateRange', newDateRange); 
    formik.setFieldTouched('dateRange', true);
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
  
  const handleDeleteFile = (fileId) => {
    setUploadedFiles2((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileId)
    );
  };

  const onDeleteApprovalStatus = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const validationSchema = Yup.object({
    baseYear: Yup.string().required(t('Base Year is Required')),
    title: Yup.string().required(t('Title is Required')),
    province: Yup.string().required(t('Province is Required')),
    committeeStatus: Yup.string().required(t('Committee Status is Required')),
    landValuationStatus: Yup.string().required(t('Land Valuation Status is Required')),
    descriptionCommittee: Yup.string().required(t('Description is Required')),
    dateRange: Yup.array()
      .of(Yup.date().nullable())
      .test(
        'is-valid-range',
        'Ngày bắt đầu và ngày kết thúc là bắt buộc',
        (value) => {
          if (!value || value.length !== 2) {
            return false;
          }
          return value[0] !== null && value[1] !== null;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      baseYear: '',
      title: '',
      note: '',
      province: firstProvinceCode ?? '',
      committeeStatus: '',
      landValuationStatus: '',
      descriptionCommittee: '',
      dateRange: [null, null]
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box sx={{ padding: '24px 0'}}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "20px",
              color: "#00000073",
            }}
          >
            {t("Overview")}
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  gap: "16px",
                }}
              >
                <Box sx={{ width: "120px" }}>
                  <Typography component="label" htmlFor="baseYear" 
                    sx={{ 
                      display: 'block', 
                      mb: 0.5,
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                    }}
                  >
                    <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t('baseYear')}
                  </Typography>
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
                            '&:hover fieldset': { borderColor: formik.touched.title && Boolean(formik.errors.title) ? 'red' : 'rgba(0, 0, 0, 0.23) !important' }
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ width: "160px" }}>
                  <Typography component="label" htmlFor="province"
                    sx={{ 
                      display: 'block', 
                      mb: 0.5,
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                    }}
                  >
                    <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t('province')}
                  </Typography>
                  <FormControl fullWidth error={formik.touched.province && Boolean(formik.errors.province)}>
                    <Select
                      id="province"
                      name="province"
                      value={formik.values.province}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      displayEmpty
                      sx={{
                        height: '40px',
                        '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'}
                      }}
                    >
                      <MenuItem sx={{ display: 'none' }} disabled value="">
                        <Box>{t("province")}</Box>
                      </MenuItem>
                      {(provinces ?? []).map((item) => (
                        <MenuItem key={item.provinceCode} value={item.provinceCode}>
                          {item.provinceEnglish}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.province && formik.errors.province && (
                      <Typography
                        sx={{
                          color: 'red',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          mt: '3px',
                        }}
                      >
                        {formik.errors.province}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <Typography component="label" htmlFor="title" 
                    sx={{ 
                      display: 'block', 
                      mb: 0.5,
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                    }}
                  >
                    <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t('title')}
                  </Typography>
                  <FormControl fullWidth error={formik.touched.title && Boolean(formik.errors.title)}>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      sx={{ 
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                        '&:hover fieldset': { borderColor: formik.touched.title && Boolean(formik.errors.title) ? 'red' : 'rgba(0, 0, 0, 0.23) !important' }
                      }}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <Typography
                        sx={{
                          color: 'red',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          mt: '3px',
                        }}
                      >
                        {formik.errors.title}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography component="label" htmlFor="note" 
                  sx={{ 
                    display: 'block', 
                    mb: 0.5,
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                  }}
                >
                  {t('note')}
                </Typography>
                <FormControl fullWidth error={formik.touched.note && Boolean(formik.errors.note)}>
                  <TextField
                    fullWidth
                    id="note"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    sx={{ 
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "32px",
              mt: '12px'
            }}
          >
            <Box
              sx={{
                border: "1px solid #D9D9D9",
                borderRadius: "8px",
                padding: '16px',
                position: "relative",
                width: "50%",
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
                  <Box>
                    <Typography component="label" htmlFor="committeeStatus" 
                      sx={{ 
                        display: 'block', 
                        mb: 0.5,
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                      }}>
                      <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t("Committee Approval Status")}
                    </Typography>
                    <FormControl fullWidth error={formik.touched.committeeStatus && Boolean(formik.errors.committeeStatus)}>
                      <Select
                        id="committeeStatus"
                        name="committeeStatus"
                        value={formik.values.committeeStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        displayEmpty
                        sx={{
                          height: '40px',
                          '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'}
                        }}
                      >
                        <MenuItem sx={{ display: 'none' }} disabled value="">
                          <Box>{t("Select")}</Box>
                        </MenuItem>
                        {(committeeStatusList ?? []).map((item) => (
                          <MenuItem key={item.code} value={item.code}>
                            {item.display_value}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.committeeStatus && formik.errors.committeeStatus && (
                        <Typography
                          sx={{
                            color: 'red',
                            fontFamily: 'Poppins',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '22px',
                            mt: '3px',
                          }}
                        >
                          {formik.errors.committeeStatus}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography component="label" htmlFor="landValuationStatus" 
                      sx={{ 
                        display: 'block', 
                        mb: 0.5,
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                      }}
                    >
                      <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t("Land Valuation Result Approval Status")}
                    </Typography>
                    <FormControl fullWidth error={formik.touched.landValuationStatus && Boolean(formik.errors.landValuationStatus)}>
                      <Select
                        id="landValuationStatus"
                        name="landValuationStatus"
                        value={formik.values.landValuationStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        displayEmpty
                        sx={{
                          height: '40px',
                          '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'}
                        }}
                      >
                        <MenuItem sx={{ display: 'none' }} disabled value="">
                          <Box>{t("Select")}</Box>
                        </MenuItem>
                        {(landValuationStatusList ?? []).map((item) => (
                          <MenuItem key={item.code} value={item.code}>
                            {item.display_value}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.landValuationStatus && formik.errors.landValuationStatus && (
                        <Typography
                          sx={{
                            color: 'red',
                            fontFamily: 'Poppins',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '22px',
                            mt: '3px',
                          }}
                        >
                          {formik.errors.landValuationStatus}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
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
                            onClick={() => onDeleteApprovalStatus(index)}
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
        </Box>
        <Box>
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
                <Typography component="label" htmlFor="descriptionCommittee" 
                  sx={{ 
                    display: 'block', 
                    mb: 0.5,
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                  }}
                >
                  <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t('Description')}
                </Typography>
                <FormControl fullWidth error={formik.touched.descriptionCommittee && Boolean(formik.errors.descriptionCommittee)}>
                  <TextField
                    fullWidth
                    id="descriptionCommittee"
                    name="descriptionCommittee"
                    value={formik.values.descriptionCommittee}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.descriptionCommittee && Boolean(formik.errors.descriptionCommittee)}
                    sx={{ 
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                      '&:hover fieldset': { borderColor: formik.touched.descriptionCommittee && Boolean(formik.errors.descriptionCommittee) ? 'red' : 'rgba(0, 0, 0, 0.23) !important' }
                    }}
                  />
                  {formik.touched.descriptionCommittee && formik.errors.descriptionCommittee && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        mt: '3px',
                      }}
                    >
                      {formik.errors.descriptionCommittee}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30%",
                }}
              >
                <Typography component="label" htmlFor="dateRange"
                  sx={{
                    display: 'block',
                    mb: 0.5,
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                  }}
                >
                  <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t("Committee Duration")}
                </Typography>
                <FormControl fullWidth error={formik.touched.dateRange && Boolean(formik.errors.dateRange)}>
                  <DateRangePicker
                    clearIcon={null}
                    onChange={handleRangeDateChange}
                    value={dateRange}
                    calendarIcon={<CalendarIcon />}
                    rangeDivider={<CustomDateDivider />}
                  />
                  {formik.touched.dateRange && formik.errors.dateRange && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        mt: '3px',
                      }}
                    >
                      {formik.errors.dateRange}
                    </Typography>
                  )}
                </FormControl>
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
        </Box>
        <Box>
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
        </Box>
      </form>
    </Box>
  )
}

export default DetailForCentral