import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorIcon from '@mui/icons-material/Error';
import CustomTable from "../../../components/customMUI/CustomTable";
import { IOSSwitch } from "../../../components/customMUI/CustomIOSSwitch";
import AppliedAreasModal from "../modal/AppliedAreasModal";
import FeatureModal from "../modal/FeatureModal";
import CachedIcon from '@mui/icons-material/Cached';
import { useNavigate } from "react-router-dom";

const RequestForInvesgation = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => {
    return {
      year: currentYear - i,
      isWarning: Math.random() < 0.5 ? false : true
    }
  })
  const [yearSelected, setYearSelected] = useState(currentYear)

  const [isAppliedAreasModalOpen, setIsAppliedAreasModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const handleOpenAppliedAreasModal = () => {
    setIsAppliedAreasModalOpen(true);
  };

  const handleCloseAppliedAreasModal = () => {
    setIsAppliedAreasModalOpen(false);
  };

  const handleOpenFeatureModal = () => {
    setIsFeatureModalOpen(true);
  };

  const handleCloseFeatureModal = () => {
    setIsFeatureModalOpen(false);
  };

  const goDetailModel = () => {
    navigate('/model-base/detail');
  }

  const renderStatus = (status) => {
    const statusConfigs = {
      Requested: {
        color: '#FAAD14',
        borderColor: '#FFE58F',
        icon: <ErrorOutlineIcon style={{ color: '#FAAD14', fontSize: '14px' }} />,
      },
      Confirmed: {
        color: '#52C41A',
        borderColor: '#B7EB8F',
        icon: <CheckCircleOutlineIcon style={{ color: '#52C41A', fontSize: '14px' }} />,
      },
      Inprogress: {
        color: '#1677FF',
        borderColor: '#91CAFF',
        icon: <CachedIcon style={{ color: '#1677FF', fontSize: '14px' }} />,
      },
    };
  
    const config = statusConfigs[status];
  
    if (config) {
      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            color: config.color,
            border: `1px solid ${config.borderColor}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: 'Poppins',
            cursor: 'pointer',
          }}
          onClick={goDetailModel}
        >
          {config.icon} {status}
        </Box>
      );
    }
    return null;
  };

  const data = [
    {
      status: 'Requested',
      issuedToLocal: false,
      appliedArea: 'N/A',
      title: 'Model A',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: 'Row data',
      updated: '09-11-2024',
    },
    {
      status: 'Confirmed',
      issuedToLocal: true,
      appliedArea: '5/5',
      title: 'Model B',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: 'Row data',
      updated: '09-11-2024',
    },
    {
      status: 'Inprogress',
      issuedToLocal: false,
      appliedArea: '3/6',
      title: 'Model C',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: 'Row data',
      updated: '09-11-2024',
    },
    {
      status: 'Confirmed',
      issuedToLocal: false,
      appliedArea: 'N/A',
      title: 'Model D',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: 'Row data',
      updated: '09-11-2024',
    },
    {
      status: 'Confirmed',
      issuedToLocal: false,
      appliedArea: 'N/A',
      title: 'Model E',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: 'Row data',
      updated: '09-11-2024',
    },
    {
      status: 'Requested',
      issuedToLocal: false,
      appliedArea: 'N/A',
      title: 'Model F',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: 'Row data',
      updated: '09-11-2024',
    },
  ];

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return renderStatus(status)
      }
    },
    {
      title: 'Issued to Local',
      dataIndex: 'issuedToLocal',
      key: 'issuedToLocal',
      render: (issuedToLocal) => (<IOSSwitch checked={issuedToLocal} />),
      align: 'center',
    },
    {
      title: 'Applied Area',
      dataIndex: 'appliedArea',
      key: 'appliedArea',
      render: (appliedArea) => (
        <Box onClick={handleOpenAppliedAreasModal} style={{ cursor: 'pointer' }}>
          {appliedArea}
        </Box>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px', cursor: 'pointer' }} onClick={handleOpenFeatureModal}>
          {features}
        </div>
      ),
    },
    {
      title: 'adj R-Square',
      dataIndex: 'adjRSquare',
      key: 'adjRSquare',
      align: 'right',
      sortable: true,
    },
    {
      title: 'F-Statistics',
      dataIndex: 'fStatistics',
      key: 'fStatistics',
      align: 'right',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
    },
  ];

  const rowStyle = (row) => {
    if (row.status === 'Requested') {
      return { backgroundColor: '#FFFBE6 ' };
    }
    if (row.status === 'Confirmed') { 
      return { backgroundColor: '#F0F9EB' };
    }
    if (row.status === 'Inprogress') { 
      return { backgroundColor: '#E6F7FF' };
    }
    return {};
  };
  
  const selectYear = (year) => {
    setYearSelected(year.year);
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        gap: '24px',
        padding: '32px 0'
      }}
    >
      <Box>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '16px',
            marginBottom: '12px',
          }}
        >
          Base Year
        </Typography>
        {years && years.length > 0 && years.map((year) => (
          <Box
            key={year.year}
            onClick={() => selectYear(year)}
            sx={{
              padding: '8px 20px',
              borderRadius: '8px',
              backgroundColor: year.year === yearSelected ? '#E6F4FF' : 'transparent',
              color: year.year === yearSelected ? '#1677FF' : '#000000E0',
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: year.year === yearSelected ? 600 : 400,
              lineHeight: '20px',
              cursor: 'pointer',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {year.year} { year.isWarning && <ErrorIcon sx={{ color: '#FAAD14', fontSize: '14px' }} />} 
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          flex: '1 1 0%'
        }}
      >
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '16px',
            marginBottom: '12px',
          }}
        >
          Request for investigation of land characteristics of land parcels
        </Typography>
        <CustomTable dataSource={data} columns={columns} rowStyle={rowStyle} />
      </Box>

      <AppliedAreasModal open={isAppliedAreasModalOpen} onClose={handleCloseAppliedAreasModal} />
      <FeatureModal open={isFeatureModalOpen} onClose={handleCloseFeatureModal} />
    </Box>
  )
}

export default RequestForInvesgation