import {
  Box,
  IconButton,
  Button,
  SvgIcon,
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
} from "@mui/material";
import { styled } from "@mui/system";
import LayoutPageCommon from "../../../components/LayoutPageCommon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Footer from "../../../components/Footer";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CustomDateDivider(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M13.6422 9.31563L11.0797 6.06563C11.033 6.00629 10.9734 5.95832 10.9055 5.92531C10.8375 5.89229 10.763 5.87509 10.6875 5.875H9.675C9.57031 5.875 9.5125 5.99531 9.57656 6.07812L11.8313 8.9375H2.375C2.30625 8.9375 2.25 8.99375 2.25 9.0625V10C2.25 10.0687 2.30625 10.125 2.375 10.125H13.2484C13.6672 10.125 13.9 9.64375 13.6422 9.31563Z"
        fill="black"
        fill-opacity="0.25"
      />
    </SvgIcon>
  );
}
function CalendarIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <g clip-path="url(#clip0_7280_6269)">
        <path
          d="M14.5717 2.14509H11.5717V1.00223C11.5717 0.923661 11.5074 0.859375 11.4289 0.859375H10.4289C10.3503 0.859375 10.286 0.923661 10.286 1.00223V2.14509H5.71457V1.00223C5.71457 0.923661 5.65028 0.859375 5.57171 0.859375H4.57171C4.49314 0.859375 4.42885 0.923661 4.42885 1.00223V2.14509H1.42885C1.11278 2.14509 0.857422 2.40045 0.857422 2.71652V14.5737C0.857422 14.8897 1.11278 15.1451 1.42885 15.1451H14.5717C14.8878 15.1451 15.1431 14.8897 15.1431 14.5737V2.71652C15.1431 2.40045 14.8878 2.14509 14.5717 2.14509ZM13.8574 13.8594H2.14314V7.07366H13.8574V13.8594ZM2.14314 5.85938V3.4308H4.42885V4.28795C4.42885 4.36652 4.49314 4.4308 4.57171 4.4308H5.57171C5.65028 4.4308 5.71457 4.36652 5.71457 4.28795V3.4308H10.286V4.28795C10.286 4.36652 10.3503 4.4308 10.4289 4.4308H11.4289C11.5074 4.4308 11.5717 4.36652 11.5717 4.28795V3.4308H13.8574V5.85938H2.14314Z"
          fill="black"
          fill-opacity="0.25"
        />
      </g>
      <defs>
        <clipPath id="clip0_7280_6269">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
function AttachIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M12.7728 2.37098C11.0907 0.688839 8.35138 0.688839 6.67103 2.37098L2.01031 7.02812C1.97996 7.05848 1.96388 7.09955 1.96388 7.14241C1.96388 7.18527 1.97996 7.22634 2.01031 7.2567L2.66924 7.91562C2.69936 7.94561 2.74013 7.96245 2.78263 7.96245C2.82514 7.96245 2.86591 7.94561 2.89603 7.91562L7.55674 3.25848C8.13531 2.67991 8.90495 2.36205 9.72281 2.36205C10.5407 2.36205 11.3103 2.67991 11.8871 3.25848C12.4657 3.83705 12.7835 4.6067 12.7835 5.42277C12.7835 6.24062 12.4657 7.00848 11.8871 7.58705L7.1371 12.3353L6.36746 13.1049C5.64781 13.8246 4.47817 13.8246 3.75853 13.1049C3.41031 12.7567 3.21924 12.2942 3.21924 11.8013C3.21924 11.3085 3.41031 10.846 3.75853 10.4978L8.47103 5.78705C8.59067 5.6692 8.74781 5.60312 8.91567 5.60312H8.91746C9.08531 5.60312 9.24067 5.6692 9.35853 5.78705C9.47817 5.9067 9.54245 6.06384 9.54245 6.2317C9.54245 6.39777 9.47638 6.55491 9.35853 6.67277L5.50674 10.521C5.47638 10.5513 5.46031 10.5924 5.46031 10.6353C5.46031 10.6781 5.47638 10.7192 5.50674 10.7496L6.16567 11.4085C6.19579 11.4385 6.23656 11.4553 6.27906 11.4553C6.32156 11.4553 6.36234 11.4385 6.39246 11.4085L10.2425 7.55848C10.5978 7.20312 10.7925 6.7317 10.7925 6.22991C10.7925 5.72812 10.596 5.25491 10.2425 4.90134C9.50853 4.16741 8.31567 4.1692 7.58174 4.90134L7.1246 5.36027L2.87103 9.61205C2.58233 9.89905 2.35349 10.2405 2.19777 10.6166C2.04205 10.9928 1.96255 11.396 1.96388 11.8031C1.96388 12.6299 2.2871 13.4067 2.87103 13.9906C3.47638 14.5942 4.26924 14.896 5.0621 14.896C5.85495 14.896 6.64781 14.5942 7.25138 13.9906L12.7728 8.47277C13.5853 7.65848 14.0353 6.57455 14.0353 5.42277C14.0371 4.2692 13.5871 3.18527 12.7728 2.37098Z"
        fill="#1677FF"
      />
    </SvgIcon>
  );
}

function AttachIcon2(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M12.7728 2.37098C11.0907 0.688839 8.35138 0.688839 6.67103 2.37098L2.01031 7.02812C1.97996 7.05848 1.96388 7.09955 1.96388 7.14241C1.96388 7.18527 1.97996 7.22634 2.01031 7.2567L2.66924 7.91562C2.69936 7.94561 2.74013 7.96245 2.78263 7.96245C2.82514 7.96245 2.86591 7.94561 2.89603 7.91562L7.55674 3.25848C8.13531 2.67991 8.90495 2.36205 9.72281 2.36205C10.5407 2.36205 11.3103 2.67991 11.8871 3.25848C12.4657 3.83705 12.7835 4.6067 12.7835 5.42277C12.7835 6.24062 12.4657 7.00848 11.8871 7.58705L7.1371 12.3353L6.36746 13.1049C5.64781 13.8246 4.47817 13.8246 3.75853 13.1049C3.41031 12.7567 3.21924 12.2942 3.21924 11.8013C3.21924 11.3085 3.41031 10.846 3.75853 10.4978L8.47103 5.78705C8.59067 5.6692 8.74781 5.60312 8.91567 5.60312H8.91746C9.08531 5.60312 9.24067 5.6692 9.35853 5.78705C9.47817 5.9067 9.54245 6.06384 9.54245 6.2317C9.54245 6.39777 9.47638 6.55491 9.35853 6.67277L5.50674 10.521C5.47638 10.5513 5.46031 10.5924 5.46031 10.6353C5.46031 10.6781 5.47638 10.7192 5.50674 10.7496L6.16567 11.4085C6.19579 11.4385 6.23656 11.4553 6.27906 11.4553C6.32156 11.4553 6.36234 11.4385 6.39246 11.4085L10.2425 7.55848C10.5978 7.20312 10.7925 6.7317 10.7925 6.22991C10.7925 5.72812 10.596 5.25491 10.2425 4.90134C9.50853 4.16741 8.31567 4.1692 7.58174 4.90134L7.1246 5.36027L2.87103 9.61205C2.58233 9.89905 2.35349 10.2405 2.19777 10.6166C2.04205 10.9928 1.96255 11.396 1.96388 11.8031C1.96388 12.6299 2.2871 13.4067 2.87103 13.9906C3.47638 14.5942 4.26924 14.896 5.0621 14.896C5.85495 14.896 6.64781 14.5942 7.25138 13.9906L12.7728 8.47277C13.5853 7.65848 14.0353 6.57455 14.0353 5.42277C14.0371 4.2692 13.5871 3.18527 12.7728 2.37098Z"
        fill="#8C8C8C"
      />
    </SvgIcon>
  );
}
function UploadIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M5.99986 4.53606H7.3195V10.5771C7.3195 10.6557 7.38379 10.72 7.46236 10.72H8.53379C8.61236 10.72 8.67665 10.6557 8.67665 10.5771V4.53606H9.99986C10.1195 4.53606 10.1856 4.39856 10.1124 4.30571L8.11236 1.77356C8.099 1.75649 8.08192 1.74268 8.06243 1.73318C8.04294 1.72369 8.02154 1.71875 7.99986 1.71875C7.97818 1.71875 7.95678 1.72369 7.93729 1.73318C7.9178 1.74268 7.90072 1.75649 7.88736 1.77356L5.88736 4.30392C5.81415 4.39856 5.88022 4.53606 5.99986 4.53606ZM14.5356 10.0414H13.4641C13.3856 10.0414 13.3213 10.1057 13.3213 10.1843V12.9343H2.67843V10.1843C2.67843 10.1057 2.61415 10.0414 2.53557 10.0414H1.46415C1.38557 10.0414 1.32129 10.1057 1.32129 10.1843V13.72C1.32129 14.0361 1.57665 14.2914 1.89272 14.2914H14.107C14.4231 14.2914 14.6784 14.0361 14.6784 13.72V10.1843C14.6784 10.1057 14.6141 10.0414 14.5356 10.0414Z"
        fill="#1677FF"
      />
    </SvgIcon>
  );
}
function CloseIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M8.92473 7.99916L13.6122 2.41166C13.6908 2.31881 13.6247 2.17773 13.5033 2.17773H12.0783C11.9944 2.17773 11.914 2.21523 11.8587 2.27952L7.99258 6.88845L4.12651 2.27952C4.07294 2.21523 3.99258 2.17773 3.90687 2.17773H2.48187C2.36044 2.17773 2.29437 2.31881 2.37294 2.41166L7.06044 7.99916L2.37294 13.5867C2.35534 13.6074 2.34405 13.6327 2.3404 13.6596C2.33676 13.6865 2.34092 13.7139 2.35239 13.7386C2.36386 13.7632 2.38216 13.784 2.40511 13.7985C2.42806 13.8131 2.4547 13.8207 2.48187 13.8206H3.90687C3.9908 13.8206 4.07115 13.7831 4.12651 13.7188L7.99258 9.10988L11.8587 13.7188C11.9122 13.7831 11.9926 13.8206 12.0783 13.8206H13.5033C13.6247 13.8206 13.6908 13.6795 13.6122 13.5867L8.92473 7.99916Z"
        fill="black"
        fill-opacity="0.45"
      />
    </SvgIcon>
  );
}

function DeleteIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <path
        d="M4.625 1.87402H4.5C4.56875 1.87402 4.625 1.81777 4.625 1.74902V1.87402H9.375V1.74902C9.375 1.81777 9.43125 1.87402 9.5 1.87402H9.375V2.99902H10.5V1.74902C10.5 1.19746 10.0516 0.749023 9.5 0.749023H4.5C3.94844 0.749023 3.5 1.19746 3.5 1.74902V2.99902H4.625V1.87402ZM12.5 2.99902H1.5C1.22344 2.99902 1 3.22246 1 3.49902V3.99902C1 4.06777 1.05625 4.12402 1.125 4.12402H2.06875L2.45469 12.2959C2.47969 12.8287 2.92031 13.249 3.45313 13.249H10.5469C11.0813 13.249 11.5203 12.8303 11.5453 12.2959L11.9313 4.12402H12.875C12.9438 4.12402 13 4.06777 13 3.99902V3.49902C13 3.22246 12.7766 2.99902 12.5 2.99902ZM10.4266 12.124H3.57344L3.19531 4.12402H10.8047L10.4266 12.124Z"
        fill="#8C8C8C"
      />
    </SvgIcon>
  );
}
function SaveIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <g clip-path="url(#clip0_7223_11716)">
        <path
          d="M14.8092 4.09688L11.9056 1.1933C11.7717 1.05937 11.6074 0.961161 11.4289 0.907589V0.859375H1.42885C1.11278 0.859375 0.857422 1.11473 0.857422 1.4308V14.5737C0.857422 14.8897 1.11278 15.1451 1.42885 15.1451H14.5717C14.8878 15.1451 15.1431 14.8897 15.1431 14.5737V4.90402C15.1431 4.60045 15.0235 4.31116 14.8092 4.09688ZM5.71457 2.14509H10.286V4.00223H5.71457V2.14509ZM13.8574 13.8594H2.14314V2.14509H4.57171V4.57366C4.57171 4.88973 4.82707 5.14509 5.14314 5.14509H10.8574C11.1735 5.14509 11.4289 4.88973 11.4289 4.57366V2.53438L13.8574 4.96295V13.8594ZM8.00028 6.75223C6.58064 6.75223 5.42885 7.90402 5.42885 9.32366C5.42885 10.7433 6.58064 11.8951 8.00028 11.8951C9.41992 11.8951 10.5717 10.7433 10.5717 9.32366C10.5717 7.90402 9.41992 6.75223 8.00028 6.75223ZM8.00028 10.7522C7.21099 10.7522 6.57171 10.1129 6.57171 9.32366C6.57171 8.53438 7.21099 7.89509 8.00028 7.89509C8.78957 7.89509 9.42885 8.53438 9.42885 9.32366C9.42885 10.1129 8.78957 10.7522 8.00028 10.7522Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7223_11716">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

const LandValuationDetail = () => {
  const [selectedYear, setSelectedYear] = useState(new Date(2024, 0, 1));
  const [selectedProvince, setSelectedProvince] = useState(1);
  const [committeeStatus, setCommitteeStatus] = useState("");
  const [landValuationStatus, setLandValuationStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "firstName",
      headerName: "Member Type",
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Organization",
      editable: true,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Name",
      editable: true,
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Position",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 1000 },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const visibleColumns = columns.filter((column) => column.field !== "id");

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleCommitteeStatusChange = (event) => {
    setCommitteeStatus(event.target.value);
  };

  const handleLandValuationStatusChange = (event) => {
    setLandValuationStatus(event.target.value);
  };

  const breadcrumbData = [
    { name: "Home", href: "/" },
    { name: "Land Valuation", href: "/land-valuation" },
  ];

  return (
    <>
      <LayoutPageCommon
        breadcrumbData={breadcrumbData}
        title="Detail information on land valuation profile"
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
              Cancel
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
              Save
            </Button>
          </>
        }
      >
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
          Overview
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
              <span style={{ color: "red" }}>*</span> Base year
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
                    height: "40px", // Custom height for the input
                  },
                  "& .MuiPaper-root": {
                    "& .MuiCalendarPicker-root": {
                      height: "300px", // Custom height for the popup calendar
                    },
                  },
                }}
                slotProps={{
                  textField: {
                    sx: {
                      "& .MuiInputBase-root": {
                        height: "40px", // Ensure consistent input height
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
              <span style={{ color: "red" }}>*</span> Province
            </label>
            <Select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              sx={{ height: "40px" }}
            >
              <MenuItem value="1">Vientiane</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <label htmlFor="province">
              <span style={{ color: "red" }}>*</span> Title
            </label>
            <TextField
              placeholder="Enter title"
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                },
              }}
            ></TextField>
          </Box>
        </Box>
        <label style={{ marginTop: "17px" }}>Note</label>
        <TextField
          sx={{
            "& .MuiInputBase-root": {
              height: "40px",
            },
          }}
          placeholder="Enter content"
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
              Approval Status
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
                    <span style={{ color: "red" }}>*</span> Committee Approval
                    Status
                  </label>
                  <Select
                    displayEmpty
                    defaultValue="Select"
                    value={committeeStatus}
                    onChange={handleCommitteeStatusChange}
                    sx={{ height: "40px" }}
                  >
                    <MenuItem disabled value="">
                      Select
                    </MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
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
                    <span style={{ color: "red" }}>*</span> Land Valuation
                    Result Approval Status
                  </label>
                  <Select
                    displayEmpty
                    defaultValue="Select"
                    value={landValuationStatus}
                    onChange={handleLandValuationStatusChange}
                    sx={{ height: "40px" }}
                  >
                    <MenuItem disabled value="">
                      Select
                    </MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
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
              Attach
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
                        padding: 0,
                        "&:hover": {
                          backgroundColor: "#F5F5F5",
                          borderRadius: "4px",
                          padding: 0,
                        },
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                    >
                      <AttachIcon2 sx={{ fontSize: 12, margin: "0 5px" }} />
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
          Land Valuation Committee Information
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
            Committee Information
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
                <span style={{ color: "red" }}>*</span> Committee Duration
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
          <Box sx={{ height: "300px", margin: "24px" }}>
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
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: "337px",
            border: "1px solid #D9D9D9",
            borderRadius: "12px",
            position: "relative",
            marginTop: "32px",
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
            Land Valuation Reference Data 
            <span style={{ fontWeight: 400 }}>(To Local Government)</span>
          </Typography>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<UploadIcon />}
            sx={{
              textTransform: "none",
              margin: "32px 24px",
              borderRadius: "6px",
              border: "1px solid #1677FF",
              color: "#1677FF",
            }}
          >
            Upload document
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
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
          Data Received from Local Government
        </Typography>
        <Box
          sx={{
            height: "700px",
            border: "1px solid #D9D9D9",
            borderRadius: "12px",
            // marginBottom: "44px",
          }}
        ></Box>
      </LayoutPageCommon>
      <Box>
        <Divider />
        <Footer />
      </Box>
    </>
  );
};

export default LandValuationDetail;
