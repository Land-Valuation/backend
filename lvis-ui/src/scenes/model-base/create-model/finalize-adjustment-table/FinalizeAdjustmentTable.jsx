import { Box, Button, Grid2, TextField, Typography } from "@mui/material"
import { CalendarIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import CustomTable from "../../../../components/customMUI/CustomTable";
import { useTranslation } from 'react-i18next';

 const FinalizeAdjustmentTable = () => {
  const { t } = useTranslation(); 
  const [selectedYear, setSelectedYear] = useState(new Date(2024, 0, 1));

  const dataSource = [
    {
      key: 'udb',
      standardPlot: 'UDb',
      UDb: 1,
      N: 1.183,
      UBb: 1.183,
      UEa: 1.183,
      UEb: 1.183,
    },
    {
      key: 'n',
      standardPlot: 'N',
      UDb: 1.183,
      N: 1,
      UBb: 0.947,
      UEa: 0.947,
      UEb: 0.947,
    },
    {
      key: 'ubb',
      standardPlot: 'UBb',
      UDb: 0.947,
      N: 0.947,
      UBb: 1,
      UEa: 0.739,
      UEb: 0.739,
    },
    {
      key: 'uea',
      standardPlot: 'UEa',
      UDb: 0.739,
      N: 0.739,
      UBb: 0.739,
      UEa: 1,
      UEb: 0.632,
    },
    {
      key: 'ueb',
      standardPlot: 'UEb',
      UDb: 0.632,
      N: 0.632,
      UBb: 0.632,
      UEa: 0.632,
      UEb: 1,
    },
  ];

  const columns = [
    {
      title: t('standardPlot'),
      dataIndex: 'standardPlot',
      key: 'standardPlot',
      align: 'left',
      rowSpan: 2, // Cột này sẽ chiếm 2 dòng
      sortable: true,
    },
    {
      title: t('individualPlot'),
      key: 'individualPlot',
      align: 'center',
      colSpan: 5, // Cột này sẽ chiếm 5 cột
    },
    {
      title: t('uDb'),
      dataIndex: 'UDb',
      key: 'UDb',
      align: 'center',
      sortable: true,
    },
    {
      title: t('n'),
      dataIndex: 'N',
      key: 'N',
      align: 'center',
      sortable: true,
    },
    {
      title: t('uBb'),
      dataIndex: 'UBb',
      key: 'UBb',
      align: 'center',
      sortable: true,
    },
    {
      title: t('uEa'),
      dataIndex: 'UEa',
      key: 'UEa',
      align: 'center',
      sortable: true,
    },
    {
      title: t('uEb'),
      dataIndex: 'UEb',
      key: 'UEb',
      align: 'center',
      sortable: true,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', flexWrap: 'wrap' }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '16px',
        border: '1px solid #F0F0F0',
        borderRadius: '8px',
        padding: '16px',
        flexWrap: 'wrap',
        width: '100%',
      }}>
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22px',
          }}
        >
          {t('modelDescription')}
        </Typography>
        <Button
          sx={{
            backgroundColor: "#1677FF",
            color: "#fff",
            textTransform: "none",
            borderRadius: "8px",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            boxShadow: 'none',
            height: '40px',
            '&:hover': {
              backgroundColor: '#4096ff',
              boxShadow: 'none',
            }
          }}
          variant="contained"
        >
          {t('adjustmentTable')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 0.5 }}>
            <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t('title')}
            </Typography>
            <TextField
              fullWidth
              placeholder={t('enterTitle')}
              variant="outlined"
              size="small"
              sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
            />
          </Box>
          <Box sx={{ flexShrink: 0, width: 150 }}>
            <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 0.5 }}>
              <Typography component="span" sx={{ color: 'red' }}>*</Typography> {t('baseYear')}
            </Typography>
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
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 0.5 }}>
            {t('note')}
          </Typography>
          <TextField
            fullWidth
            placeholder={t('enterContent')}
            multiline
            rows={1}
            variant="outlined"
            size="small"
            sx={{ height: '40px', '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important' }}}
          />
        </Box>
      </Box>
      <Grid2 container spacing={3}> {/* Sử dụng Grid container và spacing */}
        <Grid2 item xs={12} sm={6}> {/* Mỗi CustomTable chiếm 12/12 không gian trên màn hình xs và 6/12 trên sm trở lên */}
          <CustomTable dataSource={dataSource} columns={columns} hasCellBorders={true} />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <CustomTable dataSource={dataSource} columns={columns} hasCellBorders={true} />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <CustomTable dataSource={dataSource} columns={columns} hasCellBorders={true} />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <CustomTable dataSource={dataSource} columns={columns} hasCellBorders={true} />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default FinalizeAdjustmentTable