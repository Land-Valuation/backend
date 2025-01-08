import React from "react";
import Header from "../../../components/Header";
import BaseInside from "../base/BaseInside";
import {
  Box,
  Button,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  borderColor,
  borderRadius,
  display,
  styled,
  textTransform,
} from "@mui/system";
import Footer from "../../../components/Footer";
import SvgIcon from "@mui/material/SvgIcon";
import { Link } from "react-router-dom";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#52C41A",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: "1 !important",
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

function DraftIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 12 12">
      <g clip-path="url(#clip0_7185_8084)">
        <path
          d="M6 0C2.68661 0 0 2.68661 0 6C0 9.31339 2.68661 12 6 12C9.31339 12 12 9.31339 12 6C12 2.68661 9.31339 0 6 0ZM6 10.9821C3.24911 10.9821 1.01786 8.75089 1.01786 6C1.01786 3.24911 3.24911 1.01786 6 1.01786C8.75089 1.01786 10.9821 3.24911 10.9821 6C10.9821 8.75089 8.75089 10.9821 6 10.9821Z"
          fill="#FAAD14"
        />
        <path
          d="M5.35693 8.35714C5.35693 8.52764 5.42466 8.69115 5.54522 8.81171C5.66578 8.93227 5.82929 9 5.99979 9C6.17029 9 6.3338 8.93227 6.45436 8.81171C6.57492 8.69115 6.64265 8.52764 6.64265 8.35714C6.64265 8.18665 6.57492 8.02313 6.45436 7.90258C6.3338 7.78202 6.17029 7.71429 5.99979 7.71429C5.82929 7.71429 5.66578 7.78202 5.54522 7.90258C5.42466 8.02313 5.35693 8.18665 5.35693 8.35714ZM5.67836 6.85714H6.32122C6.38015 6.85714 6.42836 6.80893 6.42836 6.75V3.10714C6.42836 3.04821 6.38015 3 6.32122 3H5.67836C5.61943 3 5.57122 3.04821 5.57122 3.10714V6.75C5.57122 6.80893 5.61943 6.85714 5.67836 6.85714Z"
          fill="#FAAD14"
        />
      </g>
      <defs>
        <clipPath id="clip0_7185_8084">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
function ProgressIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 12 12">
      <g clip-path="url(#clip0_7185_8095)">
        <path
          d="M1.39289 5.89554C1.40628 5.31027 1.52682 4.74241 1.75316 4.20804C1.98485 3.65893 2.317 3.16741 2.74021 2.74286C3.16343 2.3183 3.65628 1.98616 4.20539 1.75446C4.77325 1.51473 5.37593 1.39286 5.99869 1.39286C6.62146 1.39286 7.22414 1.51473 7.79066 1.75446C8.33819 1.98569 8.83541 2.32141 9.2545 2.74286C9.38709 2.87545 9.51164 3.01607 9.62682 3.16339L8.82057 3.79286C8.80462 3.8052 8.79247 3.82179 8.78553 3.84073C8.77859 3.85966 8.77713 3.88017 8.78133 3.8999C8.78553 3.91963 8.79521 3.93777 8.80926 3.95224C8.82331 3.96671 8.84115 3.97692 8.86075 3.9817L11.2139 4.55759C11.2808 4.57366 11.3465 4.52277 11.3465 4.45446L11.3572 2.0317C11.3572 1.94196 11.2541 1.89107 11.1844 1.94732L10.4291 2.53795C9.39914 1.22009 7.79736 0.375 5.99736 0.375C2.92905 0.375 0.432623 2.83393 0.375033 5.89018C0.374676 5.90447 0.377183 5.91869 0.382407 5.932C0.387632 5.94531 0.395467 5.95744 0.405452 5.96768C0.415437 5.97791 0.427369 5.98605 0.440546 5.9916C0.453723 5.99715 0.467878 6 0.482176 6H1.28575C1.34468 6 1.39155 5.95313 1.39289 5.89554ZM11.5179 6H10.7143C10.6554 6 10.6085 6.04688 10.6072 6.10446C10.5938 6.68973 10.4732 7.25759 10.2469 7.79196C10.0152 8.34107 9.68307 8.83393 9.25986 9.25714C8.83269 9.68608 8.32483 10.0262 7.76558 10.2579C7.20632 10.4896 6.60673 10.6083 6.00137 10.6071C5.39622 10.6083 4.79684 10.4896 4.2378 10.2579C3.67877 10.0262 3.17115 9.68604 2.74423 9.25714C2.61164 9.12455 2.48709 8.98393 2.37191 8.83661L3.17816 8.20714C3.19411 8.1948 3.20626 8.17821 3.2132 8.15927C3.22014 8.14034 3.2216 8.11983 3.2174 8.1001C3.2132 8.08037 3.20352 8.06223 3.18947 8.04776C3.17542 8.03329 3.15757 8.02308 3.13798 8.0183L0.784855 7.44241C0.717891 7.42634 0.652266 7.47723 0.652266 7.54554L0.642891 9.96964C0.642891 10.0594 0.746016 10.1103 0.815659 10.054L1.57102 9.46339C2.60093 10.7799 4.20271 11.625 6.00271 11.625C9.07236 11.625 11.5674 9.16473 11.625 6.10982C11.6254 6.09553 11.6229 6.08131 11.6177 6.068C11.6124 6.05469 11.6046 6.04256 11.5946 6.03232C11.5846 6.02209 11.5727 6.01396 11.5595 6.0084C11.5463 6.00285 11.5322 6 11.5179 6Z"
          fill="#1677FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_7185_8095">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
function RejectIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 12 12">
      <g clip-path="url(#clip0_7185_313)">
        <path
          d="M8.32213 3.88205C8.32213 3.82312 8.27392 3.7749 8.21499 3.7749L7.33106 3.77892L5.99981 5.36597L4.6699 3.78026L3.78463 3.77624C3.7257 3.77624 3.67749 3.82312 3.67749 3.88338C3.67749 3.90883 3.68687 3.93294 3.70294 3.95303L5.44535 6.02892L3.70294 8.10347C3.68675 8.1231 3.67777 8.14768 3.67749 8.17312C3.67749 8.23205 3.7257 8.28026 3.78463 8.28026L4.6699 8.27624L5.99981 6.68919L7.32972 8.2749L8.21365 8.27892C8.27258 8.27892 8.32079 8.23204 8.32079 8.17178C8.32079 8.14633 8.31142 8.12222 8.29535 8.10213L6.55562 6.02758L8.29803 3.95169C8.3141 3.93294 8.32213 3.90749 8.32213 3.88205Z"
          fill="#F5222D"
        />
        <path
          d="M6 0C2.68661 0 0 2.68661 0 6C0 9.31339 2.68661 12 6 12C9.31339 12 12 9.31339 12 6C12 2.68661 9.31339 0 6 0ZM6 10.9821C3.24911 10.9821 1.01786 8.75089 1.01786 6C1.01786 3.24911 3.24911 1.01786 6 1.01786C8.75089 1.01786 10.9821 3.24911 10.9821 6C10.9821 8.75089 8.75089 10.9821 6 10.9821Z"
          fill="#F5222D"
        />
      </g>
      <defs>
        <clipPath id="clip0_7185_313">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
function ApproveIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 12 12">
      <g clip-path="url(#clip0_7185_4076)">
        <path
          d="M8.50443 3.87012H7.8763C7.73969 3.87012 7.60978 3.93574 7.52942 4.04824L5.42407 6.96789L4.4705 5.64467C4.39014 5.53351 4.26157 5.46655 4.12362 5.46655H3.4955C3.40844 5.46655 3.35755 5.56565 3.40844 5.63664L5.07719 7.95092C5.11661 8.00594 5.16858 8.05078 5.22879 8.08171C5.289 8.11263 5.35571 8.12877 5.4234 8.12877C5.49109 8.12877 5.5578 8.11263 5.61801 8.08171C5.67821 8.05078 5.73018 8.00594 5.7696 7.95092L8.59014 4.04021C8.64237 3.96922 8.59148 3.87012 8.50443 3.87012Z"
          fill="#52C41A"
        />
        <path
          d="M6 0C2.68661 0 0 2.68661 0 6C0 9.31339 2.68661 12 6 12C9.31339 12 12 9.31339 12 6C12 2.68661 9.31339 0 6 0ZM6 10.9821C3.24911 10.9821 1.01786 8.75089 1.01786 6C1.01786 3.24911 3.24911 1.01786 6 1.01786C8.75089 1.01786 10.9821 3.24911 10.9821 6C10.9821 8.75089 8.75089 10.9821 6 10.9821Z"
          fill="#52C41A"
        />
      </g>
      <defs>
        <clipPath id="clip0_7185_4076">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

function createData(
  year,
  status,
  province,
  issue,
  area,
  title,
  member,
  duration,
  date
) {
  return { year, status, province, issue, area, title, member, duration, date };
}
function createData2(
  year,
  status,
  submit,
  area,
  title,
  member,
  duration,
  date
) {
  return { year, status, submit, area, title, member, duration, date };
}

const getStatusStyleAndIcon2 = (status) => {
  switch (status) {
    case "Requested":
      return {
        style: {
          backgroundColor: "#FFF",
          border: "1px solid #FFE58F",
          color: "#FAAD14",
        },
        icon: <DraftIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    case "In Progress":
      return {
        style: {
          backgroundColor: "#FFF",
          border: "1px solid #91CAFF",
          color: "#1677FF",
        },
        icon: <ProgressIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    case "Completed":
      return {
        style: {
          backgroundColor: "#FFF",
          border: "1px solid #B7EB8F",
          color: "#52C41A",
        },
        icon: <ApproveIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    default:
      return { style: {}, icon: null };
  }
};

const getStatusStyleAndIcon = (status) => {
  switch (status) {
    case "Draft":
      return {
        style: {
          backgroundColor: "#FFFBE6",
          border: "1px solid #FFE58F",
          color: "#FAAD14",
        },
        icon: <DraftIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    case "In Progress":
      return {
        style: {
          backgroundColor: "#E6F4FF",
          border: "1px solid #91CAFF",
          color: "#1677FF",
        },
        icon: <ProgressIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    case "Rejected":
      return {
        style: {
          backgroundColor: "#FFF1F0",
          border: "1px solid  #FFA39E",
          color: "#F44336",
        },
        icon: <RejectIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    case "Approved":
      return {
        style: {
          backgroundColor: "#F6FFED",
          border: "1px solid #B7EB8F",
          color: "#52C41A",
        },
        icon: <ApproveIcon sx={{ marginRight: "4px", width: "12px" }} />,
      };
    default:
      return { style: {}, icon: null };
  }
};

const StyledTableCell = styled(TableCell)({
  backgroundColor: "#FAFAFA",
  fontWeight: 500,
  fontFamily: "Poppins",
  fontSize: "14px",
  color: "#000000E0",
});

const rows = [
  createData(
    "2024",
    "Draft",
    "Vientiane",
    false,
    "0/11",
    "Title A",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2024 to 09-11-2024",
    "N/A"
  ),
  createData(
    "2024",
    "In Progress",
    "Savannakhet",
    false,
    "2/15",
    "Title B",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2024 to 09-11-2024",
    "N/A"
  ),
  createData(
    "2024",
    "Rejected",
    "Champasak",
    false,
    "0/11",
    "Title C",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2024 to 09-11-2024",
    "N/A"
  ),
  createData(
    "2020",
    "Approved",
    "Xiangkhoang",
    false,
    "15/15",
    "Title D",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2020 to 09-11-2020",
    "09-11-2020"
  ),
  createData(
    "2016",
    "Approved",
    "Xaignabouli",
    true,
    "15/15",
    "Title E",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2016 to 09-11-2016",
    "09-11-2016"
  ),
  createData(
    "2014",
    "Approved",
    "Xaisomboun",
    true,
    "15/15",
    "Title F",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2014 to 09-11-2014",
    "09-11-2014"
  ),
];

const rows2 = [
  createData2(
    "2024",
    "Requested",
    false,
    "0/15",
    "Title A",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2024 to 09-11-2024",
    "N/A"
  ),
  createData2(
    "2024",
    "Requested",
    false,
    "0/15",
    "Title B",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2024 to 09-11-2024",
    "N/A"
  ),
  createData2(
    "2024",
    "In Progress",
    false,
    "5/15",
    "Title C",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2024 to 09-11-2024",
    "N/A"
  ),
  createData2(
    "2020",
    "Completed",
    false,
    "15/15",
    "Title D",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2020 to 09-11-2020",
    "09-11-2020"
  ),
  createData2(
    "2016",
    "Completed",
    true,
    "15/15",
    "Title E",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2016 to 09-11-2016",
    "09-11-2016"
  ),
  createData2(
    "2014",
    "Completed",
    true,
    "15/15",
    "Title F",
    "000,000,000,0000,000,000,000,0000",
    "01-09-2014 to 09-11-2014",
    "09-11-2014"
  ),
];
const Valuation = () => {
  const theme = useTheme();
  const userRole = "central";
  // const userRole = 'local';

  return (
    <>
      {userRole === "central" ? (
        <Box
          m="1.5rem 2.5rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "calc(100% - 6.5rem)",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "32px",
              }}
            >
              <Header
                title="Land Valuation"
                subtitle="Find your land valuation materials."
              />
              <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#1677FF",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    textWrap: "nowrap",
                  }}
                >
                  New Valuation
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    color: "#00000073",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    minWidth: "32px",
                    minHeight: "32px",
                    padding: 0,
                  }}
                  variant="contained"
                >
                  <MoreVertIcon />
                </Button>
              </Box>
            </Box>
            <TableContainer
              sx={{ border: "1px solid #F0F0F0", borderRadius: "8px" }}
              component={Paper}
            >
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Base Year</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Province</StyledTableCell>
                    <StyledTableCell>Issued to Local</StyledTableCell>
                    <StyledTableCell>Applied Area</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Evaluation Member</StyledTableCell>
                    <StyledTableCell>Committee Duration</StyledTableCell>
                    <StyledTableCell>Decision Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { style, icon } = getStatusStyleAndIcon(row.status);
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.year}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/land-valuation/detail`}
                            style={{ textDecoration: "none" }}
                          >
                            <Box
                              sx={{
                                ...style,
                                borderRadius: "4px",
                                padding: "0 8px",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                width: "fit-content",
                                textWrap: "nowrap",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 400,
                              }}
                            >
                              {icon} {row.status}
                            </Box>
                          </Link>
                        </TableCell>
                        <TableCell>{row.province}</TableCell>
                        <TableCell>
                          <AntSwitch
                            checked={row.issue}
                            inputProps={{ "aria-label": "ant design" }}
                          />
                        </TableCell>
                        <TableCell>{row.area}</TableCell>
                        <TableCell sx={{ textWrap: "nowrap" }}>
                          {row.title}
                        </TableCell>
                        <TableCell>{row.member}</TableCell>
                        <TableCell sx={{ textWrap: "nowrap" }}>
                          {row.duration}
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* <Box
        mt="40px"
        height="75.25vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <BaseInside />        
      </Box> */}
        </Box>
      ) : (
        <Box
          m="1.5rem 2.5rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "calc(100% - 6.5rem)",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "32px",
              }}
            >
              <Header
                title="Land Valuation"
                subtitle="Find your land valuation materials."
              />
              <Box>
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    color: "#00000073",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 400,
                    minWidth: "32px",
                    minHeight: "32px",
                    padding: 0,
                  }}
                  variant="contained"
                >
                  <MoreVertIcon />
                </Button>
              </Box>
            </Box>
            <TableContainer
              sx={{ border: "1px solid #F0F0F0", borderRadius: "8px" }}
              component={Paper}
            >
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Base Year</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Submit to Central</StyledTableCell>
                    <StyledTableCell>
                      Number of Evaluation Areas
                    </StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Evaluation Member</StyledTableCell>
                    <StyledTableCell>Committee Duration</StyledTableCell>
                    <StyledTableCell>Decision Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => {
                    const { style, icon } = getStatusStyleAndIcon2(row.status);
                    let backgroundColor;
                    switch (row.status) {
                      case "Requested":
                        backgroundColor = "#FFFBE6";
                        break;
                      case "In Progress":
                        backgroundColor = "#E6F7FF";
                        break;
                      case "Completed":
                        backgroundColor = "#F0F9EB";
                        break;
                      default:
                        backgroundColor = "#ffffff";
                    }
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          backgroundColor: backgroundColor,
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.year}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              ...style,
                              borderRadius: "4px",
                              padding: "0 8px",
                              // fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              width: "fit-content",
                              textWrap: "nowrap",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {icon} {row.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <AntSwitch
                            checked={row.submit}
                            // disabled
                            inputProps={{ "aria-label": "ant design" }}
                          />
                        </TableCell>
                        <TableCell>{row.area}</TableCell>
                        <TableCell sx={{ textWrap: "nowrap" }}>
                          {row.title}
                        </TableCell>
                        <TableCell>{row.member}</TableCell>
                        <TableCell sx={{ textWrap: "nowrap" }}>
                          {row.duration}
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      <Box>
        <Divider />
        <Footer />
      </Box>
    </>
  );
};

export default Valuation;
