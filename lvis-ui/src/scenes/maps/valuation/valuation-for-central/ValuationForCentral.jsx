import { Box, Button } from "@mui/material"
import CustomTable from "../../../../components/customMUI/CustomTable"
import { Link } from "react-router-dom"
import Header from "../../../../components/Header"
import { useEffect, useState } from "react"
import { useGetAllValuationMastersQuery } from "../../../../state/valuationMasterApi"
import { useGetAllProvincesQuery } from "../../../../state/provinceApi"
import dayjs from "dayjs"
import { FORMAT_DATE } from "../../../../utils/constant"
import { IOSSwitch } from "../../../../components/customMUI/CustomIOSSwitch"
import { useTranslation } from "react-i18next"
import DataReceivedLocalGovernmentModal from "../detail/DataReceivedLocalGovernmentModal"
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DraftIcon from "../../../../assets/icons/land-valuation/DraftIcon"
import ProgressIcon from "../../../../assets/icons/land-valuation/ProgressIcon"
import RejectIcon from "../../../../assets/icons/land-valuation/RejectIcon"
import ApproveIcon from "../../../../assets/icons/land-valuation/ApproveIcon"

const ValuationForCentral = () => {
  const { t } = useTranslation();

  const [listForCentral, setListForCentral] = useState([])
  const [listProvince, setListProvince] = useState([])
  const [isDataReceivedLocalGovernmentOpen, setIsDataReceivedLocalGovernmentOpen] = useState(false);

  const handleOpenDataReceivedLocalGovernmentModal = () => {
    setIsDataReceivedLocalGovernmentOpen(true);
  };

  const handleCloseDataReceivedLocalGovernmentModal = () => {
    setIsDataReceivedLocalGovernmentOpen(false);
  };

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
            <IOSSwitch
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
              to={`/land-valuation/create`}
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
      <DataReceivedLocalGovernmentModal
        open={isDataReceivedLocalGovernmentOpen}
        onClose={handleCloseDataReceivedLocalGovernmentModal}
      />
    </Box>
  )
}

export default ValuationForCentral