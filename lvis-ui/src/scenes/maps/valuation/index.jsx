import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import {
  Box,
  Button,
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
  styled,
} from "@mui/system";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import UserService from "../../../state/UserService";
import { useTranslation } from "react-i18next";
import DraftIcon from "../../../assets/icons/land-valuation/DraftIcon";
import ProgressIcon from "../../../assets/icons/land-valuation/ProgressIcon";
import ApproveIcon from "../../../assets/icons/land-valuation/ApproveIcon";
import RejectIcon from "../../../assets/icons/land-valuation/RejectIcon";
import DataReceivedLocalGovernmentModal from "./detail/DataReceivedLocalGovernmentModal";
import { useGetAllValuationMastersQuery } from "../../../state/valuationMasterApi";
import CustomTable from "../../../components/customMUI/CustomTable";
import { useGetAllProvincesQuery } from "../../../state/provinceApi";
import dayjs from "dayjs";
import { FORMAT_DATE } from "../../../utils/constant";

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
    case "inProgress":
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

const Valuation = () => {
  // const theme = useTheme();
  const { t } = useTranslation();
  const [
    isDataReceivedLocalGovernmentOpen,
    setIsDataReceivedLocalGovernmentOpen,
  ] = useState(false);

  const handleOpenDataReceivedLocalGovernmentModal = () => {
    setIsDataReceivedLocalGovernmentOpen(true);
  };

  const handleCloseDataReceivedLocalGovernmentModal = () => {
    setIsDataReceivedLocalGovernmentOpen(false);
  };

  const userRole = UserService.getTokenParsed().realm_access.roles;
  const hasCentralRole = userRole.some((role) => role.includes("CENTRAL"));

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

  const [listForCentral, setListForCentral] = useState([])
  const [listProvince, setListProvince] = useState([])

  const { data: allValuationMasters } = useGetAllValuationMastersQuery();
  const { data: allProvinceData } = useGetAllProvincesQuery();
  
  useEffect(() => {
    if (allValuationMasters && allValuationMasters.length > 0) {
      setListForCentral(allValuationMasters)
    }
  }, [allValuationMasters])

  useEffect(() => {
    if (allProvinceData && allProvinceData.length > 0) {
      setListProvince(allProvinceData)
    }
  }, [allProvinceData])
  

  const getStatusText = (status) => {
    const statusMap = {
      annulled: t("Annulled"),
      approved: t("Approved"),
      completed: t("Completed"),
      draft: t("Draft"),
      inProgress: t("In Progress"),
      lodged: t("Lodged"),
      rejected: t("Rejected"),
      requisitioned: t("Requisitioned"),
    };
  
    return statusMap[status] || "";
  }

  const getProvinceName = (proviceCode) => {
    const province = listProvince.find(item => item.provinceCode === proviceCode)
    return province ? province.provinceEnglish : ''
  }

  const columns = [
    {
      key: "baseYear",
      title: t("baseYear"),
      dataIndex: "baseYear",
      align: "left",
    },
    {
      key: "valuationStatusCode",
      title: t("status"),
      dataIndex: "valuationStatusCode",
      align: "left",
      render: (status) => {
        const { style, icon } = getStatusStyleAndIcon(status);
        return (
          <Link to={`/land-valuation/detail`} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                ...style,
                borderRadius: "4px",
                padding: "0 8px",
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                textWrap: "nowrap",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              {icon} {getStatusText(status)}
            </Box>
          </Link>
        );
      },
    },
    {
      key: "proviceCode",
      title: t("province"),
      dataIndex: "proviceCode",
      align: "left",
      sortable: true,
      render: (proviceCode) => (
        <Box>{getProvinceName(proviceCode)}</Box>
      ),
    },
    {
      key: "issuedToLocal",
      title: t("issuedToLocal"),
      dataIndex: "issue",
      align: "center",
      render: (issue) => (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AntSwitch
            checked={issue}
            inputProps={{ "aria-label": "ant design" }}
          />
        </Box>
      ),
    },
    {
      key: "zoneNumber",
      title: t("appliedArea"),
      dataIndex: "zoneNumber",
      align: "center",
      render: (zoneNumber) => (
        <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleOpenDataReceivedLocalGovernmentModal}>
          {zoneNumber}
        </Box>
      ),
    },
    {
      key: "title",
      title: t("title"),
      dataIndex: "title",
      align: "left",
    },
    {
      key: "member",
      title: t("Evaluation Member"),
      dataIndex: "member",
      align: "left",
    },
    {
      key: "committeSdate",
      title: t("Committee Duration"),
      dataIndex: "committeSdate",
      align: "left",
      render: (committeSdate, record) => (
        <Box>{committeSdate && record?.committeEdate ? `${dayjs(committeSdate).format(FORMAT_DATE.DMY)} to ${dayjs(record?.committeEdate).format(FORMAT_DATE.DMY)}` : ''}</Box>
      )
    },
    {
      key: "updatedAt",
      title: t("Decision Date"),
      dataIndex: "updatedAt",
      align: "left",
      render: (updatedAt) => (
        <Box>{dayjs(updatedAt).format(FORMAT_DATE.DMY)}</Box>
      )
    },
  ];

  return (
    <>
      {hasCentralRole ? (
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
                title={t("Land Valuation")}
                subtitle="Find your land valuation materials."
              />
              <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
                <Link
                  to={`/land-valuation/detail`}
                  style={{ textDecoration: "none" }}
                >
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
                    {t("New Valuation")}
                  </Button>
                </Link>
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
            <CustomTable
              dataSource={listForCentral}
              columns={columns}
            />
          </Box>
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
                title={t("Land Valuation")}
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
                    <StyledTableCell>{t("baseYear")}</StyledTableCell>
                    <StyledTableCell>{t("status")}</StyledTableCell>
                    <StyledTableCell>{t("submitToCentral")}</StyledTableCell>
                    <StyledTableCell>
                      {t("Number of Evaluation Areas")}
                    </StyledTableCell>
                    <StyledTableCell>{t("title")}</StyledTableCell>
                    <StyledTableCell>{t("Evaluation Member")}</StyledTableCell>
                    <StyledTableCell>{t("Committee Duration")}</StyledTableCell>
                    <StyledTableCell>{t("Decision Date")}</StyledTableCell>
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
                        key={row.title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          backgroundColor: backgroundColor,
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.year}
                        </TableCell>
                        <TableCell>
                          <Link
                            to="/land-valuation/detail"
                            style={{ textDecoration: "none" }}
                          >
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
                              {icon} {t(row.status)}
                            </Box>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <AntSwitch
                            // checked={row.submit}
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
      <DataReceivedLocalGovernmentModal
        open={isDataReceivedLocalGovernmentOpen}
        onClose={handleCloseDataReceivedLocalGovernmentModal}
      />
    </>
  );
};

export default Valuation;
