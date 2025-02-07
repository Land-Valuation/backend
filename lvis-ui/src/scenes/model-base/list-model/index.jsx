import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CustomTable from "../../../components/customMUI/CustomTable";
import { IOSSwitch } from "../../../components/customMUI/CustomIOSSwitch";
import AppliedAreasModal from "../modal/AppliedAreasModal";
import FeatureModal from "../modal/FeatureModal";
import { useTranslation } from 'react-i18next';

const ListModel = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - i)
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

  const data = [
    {
      status: t('draft'),
      issuedToLocal: false,
      appliedArea: t('notApplicable'),
      title: 'Model A',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: t('rowData'),
      updated: '09-11-2024',
    },
    {
      status: t('confirmed'),
      issuedToLocal: true,
      appliedArea: '5/5',
      title: 'Model B',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: t('rowData'),
      updated: '09-11-2024',
    },
    {
      status: t('confirmed'),
      issuedToLocal: false,
      appliedArea: '3/6',
      title: 'Model C',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: t('rowData'),
      updated: '09-11-2024',
    },
    {
      status: t('draft'),
      issuedToLocal: false,
      appliedArea: t('notApplicable'),
      title: 'Model D',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: t('rowData'),
      updated: '09-11-2024',
    },
    {
      status: t('draft'),
      issuedToLocal: false,
      appliedArea: t('notApplicable'),
      title: 'Model E',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: t('rowData'),
      updated: '09-11-2024',
    },
    {
      status: t('draft'),
      issuedToLocal: false,
      appliedArea: t('notApplicable'),
      title: 'Model F',
      features: '000,000,000,000,000,000,000,000,000,...',
      adjRSquare: 0.001,
      fStatistics: 0.001,
      region: t('rowData'),
      updated: '09-11-2024',
    },
  ];

  const columns = [
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Box
          sx={{
            backgroundColor: status === t('confirmed') ? '#F6FFED' : '#FFFBE6',
            color: status === t('confirmed') ? '#52C41A' : '#FAAD14',
            border: status === t('confirmed') ? '1px solid #B7EB8F' : '1px solid #FFE58F',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: 'Poppins',
          }}
        >
          {status === t('confirmed') ? <CheckCircleOutlineIcon style={{ color: '#52C41A', fontSize: '14px' }} /> : <ErrorOutlineIcon style={{ color: '#FAAD14', fontSize: '14px' }} />} {status}
        </Box>
      ),
    },
    {
      title: t('issuedToLocal'),
      dataIndex: 'issuedToLocal',
      key: 'issuedToLocal',
      render: (issuedToLocal) => (<IOSSwitch checked={issuedToLocal} />),
      align: 'center',
    },
    {
      title: t('appliedArea'),
      dataIndex: 'appliedArea',
      key: 'appliedArea',
      render: (appliedArea) => (
        <Box onClick={handleOpenAppliedAreasModal} style={{ cursor: 'pointer' }}>
          {appliedArea}
        </Box>
      ),
    },
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('features'),
      dataIndex: 'features',
      key: 'features',
      render: (features) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px', cursor: 'pointer' }} onClick={handleOpenFeatureModal}>
          {features}
        </div>
      ),
    },
    {
      title: t('adjRSquare'),
      dataIndex: 'adjRSquare',
      key: 'adjRSquare',
      align: 'right',
    },
    {
      title: t('fStatistics'),
      dataIndex: 'fStatistics',
      key: 'fStatistics',
      align: 'right',
    },
    {
      title: t('region'),
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: t('updated'),
      dataIndex: 'updated',
      key: 'updated',
    },
  ];
  
  const selectYear = (year) => {
    setYearSelected(year);
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
          {t('baseYear')}
        </Typography>
        {years && years.length > 0 && years.map((year) => (
          <Box
            key={year}
            onClick={() => selectYear(year)}
            sx={{
              padding: '8px 20px',
              borderRadius: '8px',
              backgroundColor: year === yearSelected ? '#E6F4FF' : 'transparent',
              color: year === yearSelected ? '#1677FF' : '#000000E0',
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: year === yearSelected ? 600 : 400,
              lineHeight: '20px',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            {year}
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
          {t('listModels')}
        </Typography>
        <CustomTable dataSource={data} columns={columns} />
      </Box>

      <AppliedAreasModal open={isAppliedAreasModalOpen} onClose={handleCloseAppliedAreasModal} />
      <FeatureModal open={isFeatureModalOpen} onClose={handleCloseFeatureModal} />
    </Box>
  )
}

export default ListModel