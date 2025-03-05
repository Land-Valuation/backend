import { Box, Button, FormControl, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTranslation } from "react-i18next";
import CalendarIcon from "../../../../assets/icons/land-valuation/CalendarIcon";
import AttachIcon from "../../../../assets/icons/land-valuation/AttachIcon";
import { VisuallyHiddenInput } from "../common";
import DeleteIcon from "../../../../assets/icons/land-valuation/DeleteIcon";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import CustomDateDivider from "../../../../assets/icons/land-valuation/CustomDateDivider";
import UploadIcon from "../../../../assets/icons/land-valuation/UploadIcon";
import CustomUploadFile from "../../../../components/customMUI/CustomUploadFile";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useGetAllProvincesQuery } from "../../../../state/provinceApi";
import { useGetAllCommitteeStatusTypesQuery } from "../../../../state/committeeStatusTypeApi";
import { useGetAllValuationStatusTypesQuery } from "../../../../state/valuationStatusTypeApi";
import CommitteeTable from "./CommitteeTable";
import PropTypes from "prop-types";
import { useCreateValuationMasterMutation } from "../../../../state/valuationMasterApi";
import { useNavigate } from "react-router-dom";

const CreateForCentral = ({ formikRef }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const now = new Date();
  const year = now.getFullYear();
  const currentYear = new Date(year, 0, 1)
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [uploadOverviewAttachFiles, setUploadOverviewAttachFiles] = useState([]);
  const [uploadToLocalFiles, setUploadToLocalFiles] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [provinces, setProvinces] = useState([])
  const [firstProvinceCode, setFirstProvinceCode] = useState('');
  const [committeeStatusList, setCommitteeStatusList] = useState([])
  const [landValuationStatusList, setLandValuationStatusList] = useState([])
  const [committeeData, setCommitteeData] = useState([]);

  const { data: allProvinceData } = useGetAllProvincesQuery();
  const { data: allCommitteeStatusTypes } = useGetAllCommitteeStatusTypesQuery();
  const { data: valuationStatusTypes } = useGetAllValuationStatusTypesQuery();
  const [createValuationMaster] = useCreateValuationMasterMutation();

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

  const handleRangeDateChange = (newDateRange) => {
    formik.setFieldValue('dateRange', newDateRange); 
    formik.setFieldTouched('dateRange', true);
  };

  const onUploadOverviewAttachFile = (event) => {
    const files = Array.from(event.target.files);
    console.log('files :>> ', files);
    setUploadOverviewAttachFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const onUploadToLocalFile = (event) => {
    const files = Array.from(event.target.files);
    setUploadToLocalFiles((prevFiles) => [...prevFiles, ...files]);
  };
  
  const onDeleteToLocalFile = (fileId) => {
    setUploadToLocalFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileId)
    );
  };

  const onDeleteApprovalStatus = (index) => {
    const newFiles = uploadOverviewAttachFiles.filter((_, i) => i !== index);
    setUploadOverviewAttachFiles(newFiles);
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
      .nullable()
      .test(
        'is-valid-range',
        'Ngày bắt đầu và ngày kết thúc là bắt buộc',
        (value) => {
          if (!value) {
            return true;
          }
          if (value.length !== 2) {
            return false;
          }
          return value[0] !== null && value[1] !== null;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      baseYear: selectedYear,
      title: '',
      note: '',
      province: firstProvinceCode ?? '',
      committeeStatus: '',
      landValuationStatus: '',
      descriptionCommittee: '',
      dateRange: [null, null],
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newData = {
        title: values.title,
        description: values.note,
        provice_code: values.province,
        base_year: values.baseYear.getFullYear(),
        commmittee_status_code: values.committeeStatus,
        valuation_status_code: values.landValuationStatus,
        committee: {
          title: values.descriptionCommittee,
          committe_sdate: values.dateRange[0],
          committe_edate: values.dateRange[1],
        },
        committeeMembers: committeeData,
      };
      
      const formData = new FormData();
      
      formData.append('newData', JSON.stringify(newData));
      
      uploadOverviewAttachFiles.forEach(file => {
        formData.append('overviewAttachFiles', file);
      });
      
      uploadToLocalFiles.forEach(file => {
        formData.append('toLocalFiles', file);
      });
      saveData(formData)
    },
  });

  const saveData = async (data) => {
    try {
      await createValuationMaster(data).unwrap();
      navigate('/land-valuation')
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  const handleCommitteeDataChange = (data) => {
    setCommitteeData(data);
  };

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formikRef, formik]);

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
                          '& fieldset': { borderColor: formik.touched.committeeStatus && Boolean(formik.errors.committeeStatus) ? 'red' : 'rgba(0, 0, 0, 0.23) !important'}
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
                          '& fieldset': { borderColor: formik.touched.landValuationStatus && Boolean(formik.errors.landValuationStatus) ? 'red' : 'rgba(0, 0, 0, 0.23) !important'}
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
                  onChange={onUploadOverviewAttachFile}
                  multiple
                />
              </Button>
              {uploadOverviewAttachFiles.length > 0 && (
                <List>
                  {uploadOverviewAttachFiles.map((file, index) => {
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
              border: "1px solid #D9D9D9",
              borderRadius: "12px",
              position: "relative",
              padding: '24px',
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
              {t("Committee Information")}
            </Typography>
            <Box
              sx={{
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
                    id="dateRange"
                    name="dateRange"
                    clearIcon={null}
                    onChange={handleRangeDateChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateRange}
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
              sx={{ height: "320px" }}
            >
              <CommitteeTable onDataChange={handleCommitteeDataChange} />
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
              {t("Land Valuation Reference Data (To Local Government)")}
              {/* <span style={{ fontWeight: 400 }}> (To Local Government)</span> */}
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
                  onChange={onUploadToLocalFile}
                  id="fileInputId"
                  multiple
                />
              </Button>
            </Box>
            {uploadToLocalFiles && uploadToLocalFiles.length > 0 && (
              <CustomUploadFile
                files={uploadToLocalFiles}
                onDelete={onDeleteToLocalFile}
              />
            )}
          </Box>
        </Box>
      </form>
    </Box>
  )
}

CreateForCentral.propTypes = {
  formikRef: PropTypes.shape({
    current: PropTypes.shape({
      handleSubmit: PropTypes.func,
    }),
  }),
};

export default CreateForCentral