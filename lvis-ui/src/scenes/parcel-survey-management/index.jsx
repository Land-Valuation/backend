import { Box, Button, MenuItem, Select, Typography } from "@mui/material"
import LayoutPageCommon from "../../components/LayoutPageCommon"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ValuationMap from "../../components/map/ValuationMap";
import { useEffect, useState } from "react";
import PLaceIcon from "../../assets/icons/model-base/PLaceIcon";
import DetailIcon from "../../assets/icons/model-base/DetailIcon";
import SurveyInformation from "./modal/SurveyInformation";
import RegisterSurveyInformationModal from "./modal/RegisterSurveyInformationModal";
import { useGetAllProvincesQuery } from "../../state/provinceApi";
import { useTranslation } from "react-i18next";

const ParcelSurveyManagement = () => {
  const {t} = useTranslation()

  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [itemActive, setItemActive] = useState('A1');
  const [isOpenSurveyInformationDialog, setIsOpenSurveyInformationDialog] = useState(false);
  const [isRegisterSurveyInformationModal, setIsRegisterSurveyInformationModal] = useState(false);
  const [isHasData, setIsHasData] = useState(false);
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])

  const { data: allProvinceData } = useGetAllProvincesQuery();

  useEffect(() => {
    setProvinces(allProvinceData || []);
    setDistricts(allProvinceData?.[0]?.districts || []);
    setProvince(allProvinceData?.[0]?.provinceCode || '');
    setDistrict(allProvinceData?.[0]?.districts?.[0]?.districtcode || '');
  }, [allProvinceData])

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistricts(provinces.find(item => item.provinceCode === event.target.value)?.districts);
  };

  const handleItemClick = (item) => {
    setItemActive(item.label);
  };

  const handleOpenSurveyInformationDialog = (isHasData) => {
    setIsHasData(isHasData);
    setIsOpenSurveyInformationDialog(true);
  };

  const handleCloseSurveyInformationDialog = () => {
    setIsOpenSurveyInformationDialog(false);
  };

  const handleOpenRegisterSurveyInformationModal = () => {
    setIsRegisterSurveyInformationModal(true);
  };

  const handleCloseRegisterSurveyInformationModal = () => {
    setIsRegisterSurveyInformationModal(false);
  };

  const handleCreateRegisterSurveyInformationModal = (event) => {
    console.log(event);
    setIsOpenSurveyInformationDialog(false);
    handleOpenRegisterSurveyInformationModal();
  };

  const itemsData = [
    { label: 'A1', date: '04-12-2020' },
    { label: 'A2', date: '04-12-2020' },
    { label: 'A3', date: '04-12-2020' },
    { label: 'A4', date: '04-12-2020' },
    { label: 'A5', date: '04-12-2020' },
    { label: 'A6', date: '04-12-2020' },
    { label: 'B1', date: '04-12-2020' },
    { label: 'B2', date: '04-12-2020' },
    { label: 'B3', date: '04-12-2020' },
  ];

  const itemDataActive = [
    {
      label: "A1-1",
      icon_info: true
    },
    {
      label: "A1-8",
      icon_info: false
    },
    {
      label: "A1-12",
      icon_info: true
    },
    {
      label: "A1-24",
      icon_info: false
    }
  ]

  return (
    <LayoutPageCommon
      title={t("Parcel Survey Management")}
      actions={ 
        <>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#00000073",
              textTransform: "none",
              borderRadius: "6px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 400,
              minWidth: '32px',
              minHeight: '32px',
              padding: 0,
              boxShadow: 'none',
              border: '1px solid #0000001A',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
            variant="contained"
          >
            <MoreVertIcon />
          </Button>
        </>
      }
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', height: '100%', 
        borderRadius: '8px', 
        overflow: 'hidden',
        border: '1px solid #F0F0F0',
        margin: '32px 0',
      }}>
        <Box sx={{
          width: '300px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <Box sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}>
            <Select
              labelId="province-label"
              id="province-select"
              value={province}
              onChange={handleProvinceChange}
              displayEmpty
              size="small"
              sx={{ minWidth: '128px', borderRadius: '6px', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
            >
              <MenuItem sx={{ display: 'none' }} disabled value="">
                <Box>{t("province")}</Box>
              </MenuItem>
              {(provinces ?? []).map((item) => (
                <MenuItem key={item.provinceCode} value={item.provinceCode}>
                  {item.provinceEnglish}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="district-label"
              id="district-select"
              value={district}
              onChange={handleDistrictChange}
              size="small"
              displayEmpty
              sx={{ minWidth: '128px', borderRadius: '6px', '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23) !important'} }}
            >
              <MenuItem sx={{ display: 'none' }} disabled value="">
                <Box>{t("district")}</Box>
              </MenuItem>
              {(districts ?? []).map((item) => (
                <MenuItem key={item.districtcode} value={item.districtcode}>
                  {item.districtEnglish}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {itemsData.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: itemActive === item.label ? '#E6F4FF' : '#F5F5F5',
                  border: itemActive === item.label ? '1px solid #91CAFF' : '1px solid #F5F5F5',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                }}
                onClick={() => handleItemClick(item)}
              >
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'space-between',
                }}>
                  <Typography
                    sx={{
                      color: '#000000E0',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '22px',
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#909399',
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                    }}
                  >
                    {item.date}
                  </Typography>
                </Box>

                {
                  itemActive === item.label && (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      mt: '12px'
                    }}>
                      {
                        itemDataActive.map((element, index) => (
                          <Box 
                            key={index}
                            sx={{
                              width: '100%',
                              backgroundColor: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '16px',
                              padding: '12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleOpenSurveyInformationDialog(element.icon_info)}
                          >
                            <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                              <PLaceIcon />
                              <Typography
                                sx={{
                                  color: '#000000E0',
                                  fontFamily: 'Poppins',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  lineHeight: '22px',
                                }}
                              >
                                {element.label}
                              </Typography>
                            </Box>
                            <Box><DetailIcon color={element.icon_info ? '#000000E0' : '#00000073' } /></Box>
                          </Box>
                        ))
                      }
                    </Box>
                  )
                }
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            border: '1px solid #F0F0F0',
            '& > div': {
              height: '100% !important',
            }
          }}
        >
          <ValuationMap />
        </Box>
      </Box>
      <SurveyInformation open={isOpenSurveyInformationDialog} onClose={handleCloseSurveyInformationDialog} createHandle={handleCreateRegisterSurveyInformationModal} isHasData={isHasData} />
      <RegisterSurveyInformationModal open={isRegisterSurveyInformationModal} onClose={handleCloseRegisterSurveyInformationModal} />
    </LayoutPageCommon>
  )
}

export default ParcelSurveyManagement