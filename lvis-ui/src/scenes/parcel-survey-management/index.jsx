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
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetListLandValueZonesByDistrictQuery } from "../../state/landValueZoneApi";
import { useGetParcelDTOsByZoneIdQuery } from "../../state/parcelApi";

const ParcelSurveyManagement = () => {
  const {t} = useTranslation()

  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [itemActive, setItemActive] = useState('');
  const [isOpenSurveyInformationDialog, setIsOpenSurveyInformationDialog] = useState(false);
  const [isRegisterSurveyInformationModal, setIsRegisterSurveyInformationModal] = useState(false);
  const [isHasData, setIsHasData] = useState(false);
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [zonePage] = useState(1);
  const [parcelPage] = useState(1);
  const [zoneHasMore, setZoneHasMore] = useState(true);
  const [parcelHasMore, setParcelHasMore] = useState(true);
  const [zonePageSize, setZonePageSize] = useState(10)
  const [parcelPageSize, setParcelPageSize] = useState(10)
  const [landValueZones, setLandValueZones] = useState([])
  const [parcels, setParcels] = useState([])
  const [zoneId, setZoneId] = useState('');
  const [generalInfo, setGeneralInfo] = useState(null)

  const { data: allProvinceData } = useGetAllProvincesQuery();
  const { data: listLandValueZonesByDistrictData } = useGetListLandValueZonesByDistrictQuery({ distCode: district, page: zonePage, size: zonePageSize }, { skip: !district });
  const { data: listParcelByZoneIdData } = useGetParcelDTOsByZoneIdQuery({ zoneId: zoneId, page: parcelPage, size: parcelPageSize }, { skip: !zoneId });

  useEffect(() => {
    setProvinces(allProvinceData || []);
    setDistricts(allProvinceData?.[0]?.districts || []);
    setProvince(allProvinceData?.[0]?.provinceCode || '');
    setDistrict(allProvinceData?.[0]?.districts?.[0]?.districtcode || '');
  }, [allProvinceData])

  useEffect(() => {
    if (listLandValueZonesByDistrictData && listLandValueZonesByDistrictData?.data.length > 0 && listLandValueZonesByDistrictData?.data.length < listLandValueZonesByDistrictData?.totalElements ) {
      setZoneHasMore(true)
    } else {
      setZoneHasMore(false)
    }
    setLandValueZones(listLandValueZonesByDistrictData?.data ?? [])
    if (!itemActive) {
      setItemActive(listLandValueZonesByDistrictData?.data[0]?.id);
      setZoneId(listLandValueZonesByDistrictData?.data[0]?.id);
    }
  }, [listLandValueZonesByDistrictData]);

  useEffect(() => {
    if (listParcelByZoneIdData && listParcelByZoneIdData?.data.length > 0 && listParcelByZoneIdData?.data.length < listParcelByZoneIdData?.totalElements ) {
      setParcelHasMore(true)
    } else {
      setParcelHasMore(false)
    }
    setParcels(listParcelByZoneIdData?.data ?? [])
  }, [listParcelByZoneIdData]);

  const fetchZoneData = () => {
    setZonePageSize(zonePageSize + 20);
  };

  const fetchParcelData = () => {
    setParcelPageSize(parcelPageSize + 20);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    setZonePageSize(20);
    setZoneHasMore(true);
    setParcelPageSize(20);
    setParcelHasMore(true);
    setItemActive('');
    setZoneId('');
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistricts(provinces.find(item => item.provinceCode === event.target.value)?.districts || []);
    setDistrict(provinces.find(item => item.provinceCode === event.target.value)?.districts[0]?.districtcode || '');
    setZonePageSize(20);
    setZoneHasMore(true);
    setParcelPageSize(20);
    setParcelHasMore(true);
    setItemActive('');
    setZoneId('');
  };

  const handleItemClick = (item) => {
    setZoneId(item.id);
    setItemActive(item.id);
    setParcelPageSize(20);
    setParcelHasMore(true);
  };

  const handleOpenSurveyInformationDialog = (item) => {
    setIsHasData(false);
    setIsOpenSurveyInformationDialog(true);
    const generalInfo = {
      mapNo: item.mapNo,
      parcelNo: item.parcelNo,
      provinceCode: item.province ?? province,
      districtCode: item.district ?? district,
      zoneCode: item.zoneCode,
      provinceName: provinces.find(el => el.provinceCode === province)?.provinceEnglish ?? '',
      districtName: districts.find(el => el.districtcode === district)?.districtEnglish ?? '',
    }
    setGeneralInfo(generalInfo)
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

  const handleCreateRegisterSurveyInformationModal = () => {
    setIsOpenSurveyInformationDialog(false);
    handleOpenRegisterSurveyInformationModal();
  };

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
        minHeight: 'calc(100vh - 250px)',
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
          <div id="landvaluezone" className="landvaluezone" style={{
            maxHeight: 'calc(100vh - 250px)',
            overflowY: 'scroll'
          }}>
            {
              landValueZones?.length > 0 ? 
              <Box sx={{
                '& .infinite-scroll-component': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }
              }}>
                <InfiniteScroll
                  dataLength={landValueZones?.length || 0}
                  next={fetchZoneData}
                  hasMore={zoneHasMore}
                  loader={<h4>Loading...</h4>}
                  scrollThreshold={0.4}
                  scrollableTarget="landvaluezone"
                  // endMessage={
                  //   <p style={{ textAlign: 'center' }}>
                  //     <b>Yay! You have seen it all</b>
                  //   </p>
                  // }
                >
                  {landValueZones?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: itemActive === item.id ? '#E6F4FF' : '#F5F5F5',
                        border: itemActive === item.id ? '1px solid #91CAFF' : '1px solid #F5F5F5',
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
                          {item.zcode}-{item.number}
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
                        itemActive === item.id && parcels?.length > 0 && (
                          <div id="parcel" className="parcel" style={{
                            maxHeight: '300px',
                            overflowY: 'scroll'
                          }}>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              mt: '12px'
                            }}>
                              <InfiniteScroll
                                dataLength={parcels?.length || 0}
                                next={fetchParcelData}
                                hasMore={parcelHasMore}
                                loader={<h4>Loading...</h4>}
                                scrollThreshold={0.4}
                                scrollableTarget="parcel"
                                // endMessage={
                                //   <p style={{ textAlign: 'center' }}>
                                //     <b>Yay! You have seen it all</b>
                                //   </p>
                                // }
                              >
                                {
                                  parcels.map((element, index) => (
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
                                          {element.mapNo} - {element.parcelNo} 
                                        </Typography>
                                      </Box>
                                      <Box onClick={() => handleOpenSurveyInformationDialog(element)}>
                                        <DetailIcon />
                                        {/* <DetailIcon color={element.icon_info ? '#000000E0' : '#00000073' } /> */}
                                      </Box>
                                    </Box>
                                  ))
                                }
                              </InfiniteScroll>
                            </Box>
                          </div>
                        )
                      }
                    </Box>
                  ))}
                </InfiniteScroll>
              </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>{t("noData")}</Box>
            }
          </div>
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
      <SurveyInformation open={isOpenSurveyInformationDialog} onClose={handleCloseSurveyInformationDialog} createHandle={handleCreateRegisterSurveyInformationModal} isHasData={isHasData} generalInfo={generalInfo} />
      <RegisterSurveyInformationModal open={isRegisterSurveyInformationModal} onClose={handleCloseRegisterSurveyInformationModal} generalInfo={generalInfo} />
    </LayoutPageCommon>
  )
}

export default ParcelSurveyManagement