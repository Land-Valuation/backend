import { Box, Button, Typography } from "@mui/material"
import CustomTable from "../../../../components/customMUI/CustomTable"
import Header from "../../../../components/Header"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { FORMAT_DATE } from "../../../../utils/constant";
import dayjs from "dayjs";
import { IOSSwitch } from "../../../../components/customMUI/CustomIOSSwitch";
import { Link } from "react-router-dom";
import DraftIcon from "../../../../assets/icons/land-valuation/DraftIcon";
import ProgressIcon from "../../../../assets/icons/land-valuation/ProgressIcon";
import RejectIcon from "../../../../assets/icons/land-valuation/RejectIcon";
import ApproveIcon from "../../../../assets/icons/land-valuation/ApproveIcon";
import { useTranslation } from "react-i18next";
import { useGetAllLocalValuationsQuery } from "../../../../state/localValuationApi";

const ValuationForLocal = () => {
  const { t } = useTranslation();
  const [listForLocal, setListForLocal] = useState([])

  const { data: localValuation } = useGetAllLocalValuationsQuery();

  useEffect(() => {
      if (localValuation && localValuation?.data.length > 0) {
        const convertData = localValuation?.data.map((item) => {
          return {
            id: item.id,
            title: item?.valuationMaster?.title ?? '',
            baseYear: item?.valuationMaster?.baseYear ?? '',
            zoneNumber: item?.valuationMaster?.zoneNumber ?? '',
            nameMembers: item?.valuationMaster?.nameMembers ?? '',
            committeSdate: item?.valuationMaster?.committeSdate ?? '',
            committeEdate: item?.valuationMaster?.committeEdate ?? '',
            valuationStatusCode: item?.valuationMaster?.valuationStatusCode ?? '',
          }
        })
        setListForLocal(convertData)
      }
    }, [localValuation])

  const columns = [
    {
      key: "baseYear",
      title: t("baseYear"),
      dataIndex: "baseYear",
      align: "left",
      sortable: true,
    },
    {
      key: "valuationStatusCode",
      title: t("status"),
      dataIndex: "valuationStatusCode",
      align: "left",
      render: (status, record) => {
        const { style, icon } = getStatusStyleAndIcon(status);
        return (
          <Link to={`/land-valuation/detail/${record.id}`} style={{ textDecoration: "none" }}>
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
      key: "submit",
      title: t("submitToCentral"),
      dataIndex: "submit",
      align: "center",
      render: () => (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IOSSwitch />
        </Box>
      ),
    },
    {
      key: "zoneNumber",
      title: t("Number of Evaluation Areas"),
      dataIndex: "zoneNumber",
      align: " ",
      sortable: true,
      render: (zoneNumber) => (
        <Box sx={{ 
          textWrap: "nowrap",
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          color: '#000000E0',
        }}>
          0/{zoneNumber}
        </Box>
      ),
    },
    {
      key: "title",
      title: t("title"),
      dataIndex: "title",
      align: "left",
      sortable: true,
      render: (title) => (
        <Typography sx={{ 
          textWrap: "nowrap",
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          color: '#000000E0',
        }}>
          {title}
        </Typography>
      ),
    },
    {
      key: "nameMembers",
      title: t("Evaluation Member"),
      dataIndex: "nameMembers",
      align: "left",
    },
    {
      key: "committeSdate",
      title: t("Committee Duration"),
      dataIndex: "committeSdate",
      align: "left",
      render: (committeSdate, record) => (
        <Box sx={{ 
          textWrap: "nowrap",
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          color: '#000000E0',
        }}>
          {committeSdate && record?.committeEdate ? `${dayjs(committeSdate).format(FORMAT_DATE.DMY)} to ${dayjs(record?.committeEdate).format(FORMAT_DATE.DMY)}` : ''}
        </Box>
      )
    },
    {
      key: "updatedAt",
      title: t("Decision Date"),
      dataIndex: "updatedAt",
      align: "left",
      render: (updatedAt) => (
        <Box sx={{ 
          textWrap: "nowrap",
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          color: '#000000E0',
        }}>
          {dayjs(updatedAt).format(FORMAT_DATE.DMY)}
        </Box>
      )
    },
  ];

  const rowStyle = (row) => {
    let backgroundColor;
    switch (row.valuationStatusCode) {
      case "requested":
        backgroundColor = "#FFFBE6";
        break;
      case "inProgress":
        backgroundColor = "#E6F7FF";
        break;
      case "approved":
        backgroundColor = "#F0F9EB";
        break;
      default:
        backgroundColor = "#ffffff";
    }
    return {
      backgroundColor,
      "&:last-child td, &:last-child th": { border: 0 },
    };
  };

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

  const getStatusStyleAndIcon = (status) => {
    switch (status) {
      case "draft":
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
      case "rejected":
        return {
          style: {
            backgroundColor: "#FFF1F0",
            border: "1px solid  #FFA39E",
            color: "#F44336",
          },
          icon: <RejectIcon sx={{ marginRight: "4px", width: "12px" }} />,
        };
      case "approved":
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

  return (
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
        <CustomTable
          dataSource={listForLocal} 
          columns={columns}
          rowStyle={rowStyle}
        />
      </Box>
    </Box>
  )
}

export default ValuationForLocal