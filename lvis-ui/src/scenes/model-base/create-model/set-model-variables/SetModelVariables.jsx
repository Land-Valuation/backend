import { Box, Button, Chip, Radio, Typography } from "@mui/material"
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import CustomTable from "../../../../components/customMUI/CustomTable";
import { useTranslation } from 'react-i18next';

const SetModelVariables = () => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const data = [
    {
      id: '1',
      variable: 'adj_length_1',
      count: 100,
      baselineVariable: false,
    },
    {
      id: '2',
      variable: 'adj_length_1',
      count: 200,
      baselineVariable: false,
    },
    {
      id: '3',
      variable: 'adj_length_3',
      count: 300,
      baselineVariable: true,
    },
    {
      id: '4',
      variable: 'adj_length_4',
      count: 400,
      baselineVariable: false,
    },
    {
      id: '5',
      variable: 'adj_length_5',
      count: 500,
      baselineVariable: false,
    },
  ];

  const data1 = [
    {
      id: '1',
      variable: 'landuse_Ef',
      count: 100,
      baselineVariable: false,
    },
    {
      id: '2',
      variable: 'landuse_N',
      count: 200,
      baselineVariable: false,
    },
    {
      id: '3',
      variable: 'landuse_NE',
      count: 300,
      baselineVariable: false,
    },
    {
      id: '4',
      variable: 'landuse_Aa',
      count: 400,
      baselineVariable: false,
    },
    {
      id: '5',
      variable: 'landuse_UBb',
      count: 500,
      baselineVariable: true,
      strikethrough: true,
    },
    {
      id: '6',
      variable: 'landuse_UDb',
      strikethrough: true,
    },
    {
      id: '7',
      variable: 'landuse_UEa',
      strikethrough: true,
    },
    {
      id: '8',
      variable: 'landuse_UEb',
      strikethrough: true,
    },
    {
      id: '9',
      variable: 'landuse_UEi',
      strikethrough: true,
    },
    {
      id: '10',
      variable: 'landuse_UF',
      strikethrough: true,
    },
  ];
  
  const columns = [
    {
      title: t('variable'),
      dataIndex: 'variable',
      key: 'variable',
    },
    {
      title: t('count'),
      dataIndex: 'count',
      key: 'count',
      align: 'left',
    },
    {
      title: t('baselineVariable'),
      dataIndex: 'baselineVariable',
      key: 'baselineVariable',
      align: 'center',
      render: (value) => (
        <Radio
          checked={value}
          sx={{ 
            '& .MuiSvgIcon-root': { fontSize: 20 }, 
            '&.Mui-checked': {
              color: "#1677FF",
            }
          }}
          disableRipple
        />
      ),
    },
  ];

  const columnLanused = [
    {
      title: t('variable'),
      dataIndex: 'variable',
      key: 'variable',
      render: (value, row) => (
        <Typography sx={{ textDecoration: row.strikethrough ? 'line-through' : 'none', color: row.strikethrough ? '#00000073' : '#000000E0' }}>
          {value}
        </Typography>
      ),
    },
    {
      title: t('count'),
      dataIndex: 'count',
      key: 'count',
      align: 'left',
      render: (value, row) => (
        <Typography sx={{ color: row.strikethrough ? '#00000073' : '#000000E0' }}>
          {row.strikethrough ? 0 : value}
        </Typography>
      ),
    },
    {
      title: t('baselineVariable'),
      dataIndex: 'baselineVariable',
      key: 'baselineVariable',
      align: 'center',
      render: (value, row) =>
        row.strikethrough ? null : (
          <Radio
            checked={value}
            sx={{ 
              '& .MuiSvgIcon-root': { fontSize: 20 }, 
              '&.Mui-checked': {
                color: "#1677FF",
              }
            }}
            disableRipple
          />
        ),
    },
  ];
  
  const rowStyle = (row) => {
    if (row.variable === 'adj_length_3') {
      return { backgroundColor: '#E6F7FF' };
    }
    if (row.variable === 'adj_length_5') {
      return { backgroundColor: '#FFFBE6' };
    }
    return {};
  };

  const handleDelete = (itemToDelete) => () => {
    setSelectedItems((list) => list.filter((item) => item.key !== itemToDelete.key));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button
          sx={{
            color: "#000000E0",
            textTransform: "none",
            borderRadius: "6px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            boxShadow: 'none',
            border: '1px solid #D9D9D9',
            '&:hover': {
              boxShadow: 'none',
            },
          }}
          variant="outlined"
          startIcon={<ReplayRoundedIcon sx={{ color: '#00000073', transform: 'scaleX(-1)' }} />}
        >
          {t('reload')}
        </Button>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '16px',
          }}
        >
          {t('selectedItems', { count: 3 })}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            gap: '12px',
          }}
        >
          {
            selectedItems.map(item => (
              <Chip
                key={item.key}
                label={item.label}
                onDelete={handleDelete(item)}
                size="small"
                deleteIcon={<CloseIcon sx={{ color: '#00000073', width: '16px', height: '16px' }} />}
              />
            ))
          }
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '24px', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <Box sx={{
            border: '1px solid #F0F0F0',
            borderRadius: '6px',
            backgroundColor: '#fff',
          }}>
            <Box sx={{ padding: '8px 12px' }}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '22px',
                }}
              >
                {t('roadFrontageLength')}
              </Typography>
            </Box>
            <Box sx={{
              padding: '12px',
              backgroundColor: '#F5F5F5',
            }}>
              <Box sx={{ backgroundColor: '#FFF'}}>
                <CustomTable dataSource={data} columns={columns} rowStyle={rowStyle} />
              </Box>
            </Box>
          </Box>
          <Box sx={{
            border: '1px solid #F0F0F0',
            borderRadius: '6px',
            backgroundColor: '#fff',
          }}>
            <Box sx={{ padding: '8px 12px' }}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '22px',
                }}
              >
                {t('roadFrontageLength')}
              </Typography>
            </Box>
            <Box sx={{
              padding: '12px',
              backgroundColor: '#F5F5F5',
            }}>
              <Box sx={{ backgroundColor: '#FFF'}}>
                <CustomTable dataSource={data} columns={columns} rowStyle={rowStyle} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1}}>
          <Box sx={{
            border: '1px solid #F0F0F0',
            borderRadius: '6px',
            backgroundColor: '#fff',
          }}>
            <Box sx={{ padding: '8px 12px' }}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '22px',
                }}
              >
                {t('landUseTitle')}
              </Typography>
            </Box>
            <Box sx={{
              padding: '12px',
              backgroundColor: '#F5F5F5',
            }}>
              <Box sx={{ backgroundColor: '#FFF'}}>
                <CustomTable dataSource={data1} columns={columnLanused} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SetModelVariables