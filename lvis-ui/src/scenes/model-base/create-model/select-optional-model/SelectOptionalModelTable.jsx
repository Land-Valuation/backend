import { Box, Radio, Typography } from '@mui/material';
import CustomTable from '../../../../components/customMUI/CustomTable';
import { useState } from 'react';
import FeatureModal from '../../modal/FeatureModal';

const SelectOptionalModelTable = () => {
const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const handleOpenFeatureModal = () => {
    setIsFeatureModalOpen(true);
  };

  const handleCloseFeatureModal = () => {
    setIsFeatureModalOpen(false);
  };

  const handleChecked = (record) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === record.key ? { ...item, checked: true } : { ...item, checked: false }
      )
    );
  };

  const rowStyle = (row) => {
    if (row.checked) {
      return { backgroundColor: '#E6F7FF' };
    }
    return {};
  };

  const [data, setData] = useState([
    {
      checked: true,
      no: 'Model_1',
      features: '000,000,000,0000,000,000,000,0000,00000000,00000',
      adjRSquare: '0.850',
      fStatistics: '150.2',
      key: '1',
    },
    {
      checked: false,
      no: 'Model_2',
      features: '000,000,000,0000,000,000,000,0000,00000000,00000',
      adjRSquare: '0.785',
      fStatistics: '95.7',
      key: '2',
    },
    {
      checked: false,
      no: 'Model_3',
      features: '000,000,000,0000,000,000,000,0000,00000000,00000',
      adjRSquare: '0.920',
      fStatistics: '210.5',
    },
    {
      checked: false,
      no: 'Model_4',
      features: '000,000,000,0000,000,000,000,0000,00000000,00000',
      adjRSquare: '0.650',
      fStatistics: '60.1',
      key: '4',
    },
    {
      checked: false,
      no: 'Model_5',
      features: '000,000,000,0000,000,000,000,0000,00000000,00000',
      adjRSquare: '0.895',
      fStatistics: '180.9',
      key: '5',
    },
  ])

  const columns = [
    {
      title: '',
      dataIndex: 'checked',
      key: 'checked',
      align: 'center',
      render: (value, row) =>
        (
          <Radio
            checked={value}
            sx={{ 
              '& .MuiSvgIcon-root': { fontSize: 20 }, 
              '&.Mui-checked': {
                color: "#1677FF",
              }
            }}
            disableRipple
            onClick={() => handleChecked(row)}
          />
        ),
    },
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (value) => (
        <Typography sx={{ color: '#000000E0', fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>
          {value}
        </Typography>
      ),
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      align: 'left',
      render: (value) => (
        <Typography onClick={handleOpenFeatureModal} sx={{ color: '#1677FF', fontSize: '14px', fontWeight: 400, lineHeight: '22px', cursor: 'pointer' }}>
          {value}
        </Typography>
      ),
    },
    {
      title: 'adj R-Square',
      dataIndex: 'adjRSquare',
      key: 'adjRSquare',
      align: 'right',
      render: (value) => (
        <Typography sx={{ color: '#000000E0', fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>
          {value}
        </Typography>
      ),
    },
    {
      title: 'F-Statistics',
      dataIndex: 'fStatistics',
      key: 'fStatistics',
      align: 'right',
      render: (value) => (
        <Typography sx={{ color: '#000000E0', fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>
          {value}
        </Typography>
      ),
    },
  ];

  return (
    <Box>
      <CustomTable dataSource={data} columns={columns} rowStyle={rowStyle} />
      <FeatureModal open={isFeatureModalOpen} onClose={handleCloseFeatureModal} />
    </Box>
  )
}

export default SelectOptionalModelTable