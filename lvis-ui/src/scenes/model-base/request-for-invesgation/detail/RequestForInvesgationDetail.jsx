import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CachedIcon from '@mui/icons-material/Cached';
import ExportIcon from "../../../../assets/icons/model-base/ExportIcon";
import ImportIcon from "../../../../assets/icons/model-base/ImportIcon";
import { IOSSwitch } from "../../../../components/customMUI/CustomIOSSwitch";
import ParcelTable from "./ParcelTable";
import PopConfirm from "../../../../components/customMUI/PopConfirm";


const RequestForInvesgationDetail = () => {
  const breadcrumbData = [
    { name: 'Home', href: '/' },
    { name: 'MODEL-BASED LAND VALUATION', href: '/model-base' },
  ];

  const navigate = useNavigate();
  const [submitCentral, setSubmitCentral] = useState(false)
  
  const onBack = () => {
    navigate(-1);
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
        >
          {config.icon} {status}
        </Box>
      );
    }
    return null;
  };

  const defaultCellStyle = {
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Poppins',
    border: '1px solid #F0F0F0',
  };

  const backgroundGreyCellStyle = {
    backgroundColor: '#FAFAFA',
  };

  return (
    <Box sx={{
      padding: '32px 44px',
      backgroundColor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {breadcrumbData && breadcrumbData.length > 0 && (
        <Box mb="8px" display="flex" alignItems="center">
          {breadcrumbData.map((item, index) => (
            <Fragment key={index}>
              <Link
                to={item.href}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: index === breadcrumbData.length - 1 ? '#000000E0' : '#00000073' }}
                >
                  {item.name}
                </Typography>
              </Link>
              {index < breadcrumbData.length - 1 && (
                <Typography variant="body2" sx={{ mx: 0.5, color: '#00000073' }}>
                  /
                </Typography>
              )}
            </Fragment>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          marginBottom: '32px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '32px',
            cursor: 'pointer',
          }}
          onClick={onBack}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowBackIcon sx={{ color: '#1677FF' }} />
            <Typography
              sx={{
                color: '#1677FF',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '16px',
              }}
            >
              Save and return
            </Typography>
          </Box>
          <Box sx={{ width: '1px', height: '32px', backgroundColor: '#0000001A'}}></Box>
          <Box
            sx={{
              color: "#000000E0",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "28px",
            }}
          >
            Request for investigation of land characteristics of land parcels
          </Box>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <Box>
          <TableContainer sx={{ border: '1px solid #F0F0F0', borderRadius: '8px' }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Status</TableCell>
                  <TableCell sx={{ ...defaultCellStyle }}>{renderStatus('Inprogress')}</TableCell>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Request Date</TableCell>
                  <TableCell sx={{ ...defaultCellStyle }}>09-11-2024</TableCell>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Base Year</TableCell>
                  <TableCell sx={{ ...defaultCellStyle }}>2024</TableCell>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Area</TableCell>
                  <TableCell sx={{ ...defaultCellStyle }}>A1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Features</TableCell>
                  <TableCell colSpan={3} sx={{ ...defaultCellStyle }}>000,000,000,0000,000,000,000,0000</TableCell>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Applied Area Name</TableCell>
                  <TableCell colSpan={3} sx={{ ...defaultCellStyle }}>Thapangthong, Savannakhet</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Model</TableCell>
                  <TableCell colSpan={7} sx={{ ...defaultCellStyle }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <Typography
                        sx={{
                          color: '#1F1F1F',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                        }}
                      >
                        Model name
                      </Typography>
                      <Typography
                        sx={{
                          color: '#1677FF',
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                        }}
                      >
                        Adjustment of Standardization Ratio
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ ...defaultCellStyle, ...backgroundGreyCellStyle }}>Land Characteristics</TableCell>
                  <TableCell colSpan={7} sx={{ ...defaultCellStyle }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      Lorem ipsum dolor sit amet consectetur. Enim est in odio nulla felis morbi at sit eget. Enim aliquam non quis egestas risus aliquet arcu. Nullam dapibus blandit sed sit diam. Rhoncus nec sed hendrerit a nam tellus proin. At tincidunt arcu eget ut nibh. Leo rhoncus mauris tortor tristique tortor fames fermentum vel. Vulputate adipiscing id lacus eu viverra. Et id suspendisse tristique mi enim sit elit. 
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          flexWrap: 'wrap',
        }}>
          <Box sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#1677FF",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: 'none',
                border: '1px solid #1677FF',
                height: '32px',
                '&:hover': {
                  backgroundColor: '#e6f4ff',
                  boxShadow: 'none',
                }
              }}
              variant={"outlined"}
            >
              Accuracy Verification(COD)
            </Button>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#1677FF",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: 'none',
                border: '1px solid #1677FF',
                height: '32px',
                '&:hover': {
                  backgroundColor: '#e6f4ff',
                  boxShadow: 'none',
                }
              }}
              variant={"outlined"}
            >
              Accuracy Verification(COD)
            </Button>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#1677FF",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: 'none',
                border: '1px solid #1677FF',
                height: '32px',
                '&:hover': {
                  backgroundColor: '#e6f4ff',
                  boxShadow: 'none',
                }
              }}
              variant={"outlined"}
              startIcon={<ExportIcon color={'#1677FF'} />}
            >
              Export to Excel
            </Button>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#1677FF",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                boxShadow: 'none',
                border: '1px solid #1677FF',
                height: '32px',
                '&:hover': {
                  backgroundColor: '#e6f4ff',
                  boxShadow: 'none',
                }
              }}
              variant={"outlined"}
              startIcon={<ImportIcon color={'#1677FF'} />}
            >
              Import to Excel
            </Button>
            <Box sx={{ width: '1px', height: '32px', backgroundColor: '#0000001A', margin: '0 8px' }}></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography
                sx={{
                  color: '#000000E0',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '22px',
                }}
              >
                Submit to Central
              </Typography>
              <PopConfirm
                title={'Thông báo'}
                content={'Bạn có chắc chắn xóa không?'}
                onConfirm={() => {}}
                onCancel={() => {}}
              >
                <IOSSwitch checked={submitCentral} onClick= {() => setSubmitCentral(!submitCentral)} />
              </PopConfirm>
            </Box>
          </Box>
          <Box sx={{
            width: '100%'
          }}>
            <ParcelTable />
          </Box>
        </Box>
      </Box>
      
    </Box>
  )
}

export default RequestForInvesgationDetail