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
import { useGetListLandValueZonesQuery } from "../../state/landValueZoneApi";
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
  const [zonePage, setZonePage] = useState(1);
  const [parcelPage, setParcelPage] = useState(1);
  const [zoneHasMore, setZoneHasMore] = useState(true);
  const [parcelHasMore, setParcelHasMore] = useState(true);
  const pageSize = 10;
  const [landValueZones, setLandValueZones] = useState([])
  const [parcels, setParcels] = useState([])
  const [zoneId, setZoneId] = useState('');

  const { data: allProvinceData } = useGetAllProvincesQuery();
  const { data: listLandValueZoneData } = useGetListLandValueZonesQuery({ page: zonePage, size: pageSize });
  const { data: listParcelByZoneIdData } = useGetParcelDTOsByZoneIdQuery({ zoneId: zoneId, page: zonePage, size: pageSize }, { skip: !zoneId });

  useEffect(() => {
    setProvinces(allProvinceData || []);
    setDistricts(allProvinceData?.[0]?.districts || []);
    setProvince(allProvinceData?.[0]?.provinceCode || '');
    setDistrict(allProvinceData?.[0]?.districts?.[0]?.districtcode || '');
  }, [allProvinceData])

  useEffect(() => {
    if (listLandValueZoneData && listLandValueZoneData?.data.length > 0 && listLandValueZoneData?.data.length < listLandValueZoneData?.totalElements ) {
      setZoneHasMore(true)
      setLandValueZones(listLandValueZoneData?.data ?? [])
      if (!itemActive) {
        setItemActive(listLandValueZoneData?.data[0]?.id);
      }
    } else {
      setZoneHasMore(false)
    }
  }, [itemActive, listLandValueZoneData]);

  useEffect(() => {
    if (listParcelByZoneIdData && listParcelByZoneIdData?.data.length > 0 && listParcelByZoneIdData?.data.length < listParcelByZoneIdData?.totalElements ) {
      setParcelHasMore(true)
      setParcels(listParcelByZoneIdData?.data ?? [])
    } else {
      setParcelHasMore(false)
    }
  }, [listParcelByZoneIdData]);

  const fetchZoneData = () => {
    setZonePage(zonePage + 1);
  };

  const fetchParcelData = () => {
    setParcelPage(parcelPage + 1);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistricts(provinces.find(item => item.provinceCode === event.target.value)?.districts);
  };

  const handleItemClick = (item) => {
    setZoneId(item.id);
    setItemActive(item.id);
    setParcelPage(1);
    setParcelHasMore(true);
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
                                        {element.mapNo} 
                                      </Typography>
                                    </Box>
                                    <Box onClick={() => handleOpenSurveyInformationDialog(element.icon_info)}>
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
            </Box>
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
      <SurveyInformation open={isOpenSurveyInformationDialog} onClose={handleCloseSurveyInformationDialog} createHandle={handleCreateRegisterSurveyInformationModal} isHasData={isHasData} />
      <RegisterSurveyInformationModal open={isRegisterSurveyInformationModal} onClose={handleCloseRegisterSurveyInformationModal} />
    </LayoutPageCommon>
  )
}

export default ParcelSurveyManagement