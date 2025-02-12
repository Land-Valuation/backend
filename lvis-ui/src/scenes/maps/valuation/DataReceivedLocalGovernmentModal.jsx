import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Tabs,
  Stack,
  Tab,
  Button,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  GeoJSON,
  useMap,
  useMapEvent,
  Rectangle
} from "react-leaflet";
import DownloadIcon from '../../../assets/icons/land-valuation/DownloadIcon';
import { useCallback, useMemo, useState } from 'react';
import { useEventHandlers } from '@react-leaflet/core';
import { POSITION_CLASSES } from '../../../utils/constant';
import DistrictList from './DistrictList';
import ParcelList from './ParcelList';
import { attachments, customIcon, customIcon1, customIcon2, CustomTab, FileCard, FileIcon, fileIcons, geoData, geoJsonStyle, getFileExtension, position } from './common';
import ParcelList2 from './ParcelList2';

const BOUNDS_STYLE = { weight: 1 };

const columns = [
  { field: "id", headerName: "ID", flex: 1, hide: true },
  {
    field: "memberType",
    headerName: "Member Type",
    editable: true,
    flex: 1,
  },
  {
    field: "organization",
    headerName: "Organization",
    editable: true,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    editable: true,
    flex: 1,
  },
  {
    field: "position",
    headerName: "Position",
    editable: true,
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    editable: true,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    editable: true,
    flex: 1,
  },
];

const initialRows = [
  {
    id: 1,
    memberType: "Member",
    organization: "000 Association",
    name: "Somchai Vongxay",
    position: "Professors",
    phone: "+856 20 5555 1234",
    email: "somchai.vongxay@example.com",
  },
  {
    id: 2,
    memberType: "Chairperson",
    organization: "000 Association",
    name: "Chanthavy Inthavong",
    position: "Ph.D., Master",
    phone: "+856 20 5555 1234",
    email: "somchai.vongxay@example.com",
  },
  {
    id: 3,
    memberType: "Member",
    organization: "000 Association",
    name: "Soudalay Phommasone",
    position: "Professors",
    phone: "+856 20 5555 1234",
    email: "somchai.vongxay@example.com",
  },
  {
    id: 4,
    memberType: "Member",
    organization: "000 Association",
    name: "Khamla Phanthavong",
    position: "Ph.D., Master",
    phone: "+856 20 5555 1234",
    email: "somchai.vongxay@example.com",
  },
  {
    id: 5,
    memberType: "Member",
    organization: "000 Association",
    name: "Keo Sihalath",
    position: "Ph.D., Master",
    phone: "+856 20 5555 1234",
    email: "somchai.vongxay@example.com",
  },
];

const DataReceivedLocalGovernmentModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const visibleColumns = columns.filter((column) => column.field !== "id");
  const [rows] = useState(initialRows);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap();
  
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom());
      },
      [parentMap]
    );
    useMapEvent("click", onClick);
  
    const [bounds, setBounds] = useState(parentMap.getBounds());
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds());
      minimap.setView(parentMap.getCenter(), zoom);
    }, [minimap, parentMap, zoom]);
  
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
    useEventHandlers({ instance: parentMap }, handlers);
  
    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
  }
  
  function MinimapControl({ position, zoom }) {
    const parentMap = useMap();
    const mapZoom = zoom || 0;
  
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{
            height: 32,
            width: 32,
            borderRadius: "8px",
            border: "2px solid #FFFFFF",
            boxShadow: "0px 2px 4px 0px #0000002E",
          }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      []
    );
  
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    );
  }

  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ m: 0, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
            sx={{
              color: '#000000E0',
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '24px',
              textAlign: 'center',
            }}
          >
            {t('appliedAreas')}
          </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            padding: '16px 0',
          }}
        >
          <Box
              sx={{
                height: "700px",
                border: "1px solid #D9D9D9",
                borderRadius: "12px",
                display: "flex",
                width:"100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  width: "260px",
                  borderRadius: "12px 0 0 12px",
                }}
              >
                <Typography
                  sx={{
                    padding: "16px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  District
                </Typography>
                <Stack spacing={"8px"} sx={{ margin: "0 16px 16px 16px" }}>
                  <DistrictList />
                </Stack>
              </Box>
              <Box sx={{ width: "100%", padding: "8px 24px 8px 24px", flex: 1 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  indicatorColor="transparent"
                  sx={{
                    borderBottom: "1px solid #F0F0F0",
                    width: "100%",
                    "& .MuiTab-root": {
                      color: "##000000E0",
                      textTransform: "none",
                      fontFamily: "SF Pro Text",
                      fontSize: "14px",
                      fontWeight: 400,
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "#1677FF",
                      fontWeight: 600,
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#1677FF",
                    },
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Land Valuation" />
                </Tabs>
                {value === 0 && (
                  <Box
                    sx={{ height: "600px", overflow: "auto", width: "100%" }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          margin: "16px 0",
                          color: "#000000E0",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        Land Valuation Result
                      </Typography>
                      <Box sx={{ display: "flex", gap: "24px" }}>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          sx={{
                            color: "#1677FF",
                            textTransform: "none",
                            width: "50%",
                            border: "1px solid #1677FF",
                            borderRadius: "8px",
                          }}
                        >
                          Download All Land Valuation Areas (*.shp)
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          sx={{
                            color: "#1677FF",
                            textTransform: "none",
                            width: "50%",
                            border: "1px solid #1677FF",
                            borderRadius: "8px",
                          }}
                        >
                          Download All Land Valuation Tables (*.xlsx)
                        </Button>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        margin: "24px 0 12px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#00000073",
                      }}
                    >
                      Attachments:
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px",
                      }}
                    >
                      {attachments.map((file) => {
                        const fileExtension = getFileExtension(file.name);
                        const iconSrc = fileIcons[fileExtension];
                        return (
                          <FileCard
                            key={file.name}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <FileIcon
                              src={iconSrc}
                              alt={`${fileExtension} icon`}
                            />
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  textOverflow: "ellipsis",
                                  maxWidth: "210px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                }}
                              >
                                {file.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#888" }}
                              >
                                {file.size}
                              </Typography>
                            </Box>
                            <IconButton>
                              <DownloadIcon sx={{ color: "#00000073" }} />
                            </IconButton>
                          </FileCard>
                        );
                      })}
                    </Box>
                    <Typography
                      sx={{
                        margin: "32px 0 8px 0",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "22px",
                        color: "#000000E0",
                      }}
                    >
                      Committee Members
                    </Typography>
                    <Typography
                      sx={{
                        margin: "8px 0 2px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#00000073",
                      }}
                    >
                      Description:
                    </Typography>
                    <Typography
                      sx={{
                        margin: "8px 0 2px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#1F1F1F",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur. Enim est in odio
                      nulla felis morbi at sit eget. Enim aliquam non quis
                      egestas risus aliquet arcu. Nullam dapibus blandit sed sit
                      diam. Rhoncus nec sed hendrerit a nam tellus proin.
                    </Typography>
                    <Typography
                      sx={{
                        margin: "12px 0 2px 0",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#00000073",
                      }}
                    >
                      Committee Duration:
                    </Typography>
                    <Typography sx={{ marginBottom: "16px" }}>
                      01-09-2024 to 09-11-2024
                    </Typography>
                    <Box
                      mt="20px"
                      height="360px"
                      display="grid"
                      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                      justifyContent="space-between"
                      rowGap="20px"
                      columnGap="1.33%"
                      sx={{
                        "& > div": { gridColumn: "span 12" },
                        width: "100%",
                        "& .MuiDataGrid-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiDataGrid-cell": {
                          borderBottom: "none",
                        },
                        "& .MuiDataGrid-container--top [role=row]": {
                          borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                        },
                        "& .MuiDataGrid-footerContainer": {
                          borderTop: "none",
                        },
                      }}
                    >
                      <DataGrid
                        rows={rows}
                        columns={visibleColumns}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        disableColumnSorting
                        disableColumnFilter
                        disableColumnMenu
                        sx={{
                          width: "100%",
                          "& .MuiDataGrid-columnHeaders": {
                            color: "#000000E0",
                          },
                          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader":
                            {
                              background: "#FAFAFA",
                            },
                          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle":
                            {
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              fontWeight: 500,
                            },
                        }}
                      />
                    </Box>
                  </Box>
                )}
                {value === 1 && (
                  <Box
                    sx={{
                      height: "600px",
                      overflow: "auto",
                      width: "100%",
                      display: "flex",
                      gap: "24px",
                      marginTop: "16px",
                    }}
                  >
                    <Box sx={{ width: "240px" }}>
                      <Tabs
                        value={value1}
                        onChange={handleChange1}
                        textColor="inherit"
                        indicatorColor="transparent"
                        sx={{
                          backgroundColor: "#F5F5F5",
                          borderRadius: "6px",
                          padding: "2px",
                          "&.MuiTabs-root": {
                            minHeight: "32px",
                          },
                          alignItems: "center",
                          gap: "2px",
                          marginBottom: "12px",
                        }}
                      >
                        <CustomTab label="Zone" />
                        <CustomTab label="Survey" />
                      </Tabs>
                      {value1 === 0 && (
                        <Box
                          sx={{
                            height: "550px",
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <ParcelList />
                        </Box>
                      )}
                      {value1 === 1 && (
                        <Box
                          sx={{
                            height: "550px",
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <ParcelList2 />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ width: "calc(100% - 240px)" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "24px" }}>
                          <Box sx={{ display: "flex", gap: "8px" }}>
                            <img src="/red pin.svg" alt="surveyed" />
                            <Typography>Surveyed Parcel</Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: "8px" }}>
                            <img src="/gray pin.svg" alt="surveyed" />
                            <Typography>Not surveyed</Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Checkbox
                            defaultChecked
                            sx={{
                              "&.Mui-checked": {
                                color: "#1677FF",
                              },
                            }}
                          />
                          Label
                        </Box>
                      </Box>
                      <Box>
                        <MapContainer
                          center={position}
                          zoom={19}
                          style={{
                            height: "560px",
                            width: "100%",
                            borderRadius: "8px",
                          }}
                          zoomControl={false}
                          key="map1"
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <GeoJSON data={geoData} style={geoJsonStyle}/>
                          <ZoomControl />
                          <MinimapControl position="topright" zoom={15} />
                          <Marker position={position} icon={customIcon1}>
                            <Popup closeButton={false}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                }}
                              >
                                <Box sx={{ textAlign: "left" }}>
                                  <Typography
                                    sx={{
                                      margin: "0 !important",
                                      fontFamily: "SF Pro Text",
                                      fontSize: "14px",
                                      fontWeight: 400,
                                      color: "#00000073",
                                    }}
                                  >
                                    Vientiane / Phonhong
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: "left" }}>
                                  <span style={{ fontWeight: 600 }}>A1</span>
                                  (1,100.21 m<sup>2</sup>)
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "6px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        color: "#000000A6",
                                        margin: "0 !important",
                                      }}
                                    >
                                      Main Street:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#000000E0",
                                        margin: "0 !important",
                                      }}
                                    >
                                      6,500,000
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        color: "#000000A6",
                                        margin: "0 !important",
                                      }}
                                    >
                                      Connecting Roads:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#000000E0",
                                        margin: "0 !important",
                                      }}
                                    >
                                      4,800,000
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        color: "#000000A6",
                                        margin: "0 !important",
                                      }}
                                    >
                                      Junction Street:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#000000E0",
                                        margin: "0 !important",
                                      }}
                                    >
                                      3,200,000
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        color: "#000000A6",
                                        maxWidth: "120px",
                                        textAlign: "left",
                                        margin: "0 !important",
                                      }}
                                    >
                                      Streets as they used to be:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#000000E0",
                                        margin: "0 !important",
                                      }}
                                    >
                                      1,600,000
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Popup>
                          </Marker>
                          <Marker position={position} icon={customIcon}></Marker>
                          <Marker position={position} icon={customIcon}></Marker>
                          <Marker position={position} icon={customIcon}>
                          </Marker>
                          <Marker position={position} icon={customIcon2}>
                          </Marker>
                          <Marker position={position} icon={customIcon2}>
                          </Marker>
                          <Marker position={position} icon={customIcon2}>
                          </Marker>
                        </MapContainer>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

DataReceivedLocalGovernmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DataReceivedLocalGovernmentModal;