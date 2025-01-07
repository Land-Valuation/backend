import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CustomTable from "../../../components/customMUI/CustomTable";
import { IOSSwitch } from "../../../components/customMUI/CustomIOSSwitch";

const ListModel = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - i)
  const [yearSelected, setYearSelected] = useState(currentYear)

  const data = [
    {
      status: 'Draft',
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
      status: 'Confirmed',
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
      status: 'Draft',
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
      status: 'Draft',
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
      status: 'Draft',
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
      render: (status) => (
        <Box
          sx={{
            backgroundColor: status === 'Confirmed' ? '#F6FFED' : '#FFFBE6',
            color: status === 'Confirmed' ? '#52C41A' : '#FAAD14',
            border: status === 'Confirmed' ? '1px solid #B7EB8F' : '1px solid #FFE58F',
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
          {status === 'Confirmed' ? <CheckCircleOutlineIcon style={{ color: '#52C41A', fontSize: '14px' }} /> : <ErrorOutlineIcon style={{ color: '#FAAD14', fontSize: '14px' }} />} {status}
        </Box>
      ),
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
        <Box>
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
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
          {features}
        </div>
      ),
    },
    {
      title: 'adj R-Square',
      dataIndex: 'adjRSquare',
      key: 'adjRSquare',
      align: 'right',
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
          Base Year
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
          List models
        </Typography>
        <CustomTable dataSource={data} columns={columns} />
      </Box>
    </Box>
  )
}

export default ListModel