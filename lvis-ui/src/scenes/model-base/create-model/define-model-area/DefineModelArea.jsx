import {
  Box,
  Button,
  Grid2,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  a11yProps,
  StyledButton,
  StyledButtonGroup,
  StyledTab,
  StyledTabs,
} from "../common";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import MapIcon from "@mui/icons-material/Map";
import DefineModelTable from "./DefineModelTable";
import DefineModelMap from "./DefineModelMap";
import TableIcon from "../../../../assets/icons/model-base/TableIcon";
import { useTranslation } from "react-i18next";
import { useGetAllProvincesQuery } from "../../../../state/provinceApi";
import { useGetListLandValueZonesByDistrictQuery } from "../../../../state/landValueZoneApi";
import { useGetParcelDTOsByZoneIdQuery } from "../../../../state/parcelApi";
import { useSelector, useDispatch } from "react-redux";

const DefineModelArea = ({ activeStep, onSelectionChange, selectedRows }) => {
  const { t } = useTranslation();

  const [activeButton, setActiveButton] = useState("village");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [tab, setTab] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [zonePage, setZonePage] = useState(0);
  const [zonePageSize, setZonePageSize] = useState(10);
  const [landValueZones, setLandValueZones] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const draftData = useSelector((state) => state.draft.data);
  const { data: allProvinceData } = useGetAllProvincesQuery();
  const { data: listLandValueZonesByDistrictData } =
    useGetListLandValueZonesByDistrictQuery(
      { distCode: district, page: zonePage + 1, size: zonePageSize },
      { skip: !district }
    );
  const { data: listParcelByZoneIdData } = useGetParcelDTOsByZoneIdQuery(
    { zoneId: zoneId },
    { skip: !zoneId }
  );

  useEffect(() => {
    if (!draftData[activeStep]?.selectedZoneIds) {
      onSelectionChange([]);
    }
  }, [district, province, draftData, activeStep]);

  useEffect(() => {
    setProvinces(allProvinceData || []);
    setDistricts(allProvinceData?.[0]?.districts || []);
    setProvince(allProvinceData?.[0]?.provinceCode || "");
    setDistrict(allProvinceData?.[0]?.districts?.[0]?.districtcode || "");
  }, [allProvinceData]);

  useEffect(() => {
    setLandValueZones([]);
    if (listLandValueZonesByDistrictData?.data) {
      setLandValueZones(listLandValueZonesByDistrictData.data);
    } else {
      setLandValueZones([]);
    }
  }, [listLandValueZonesByDistrictData, district]);

  useEffect(() => {
    setParcels(listParcelByZoneIdData?.data ?? []);
  }, [listParcelByZoneIdData]);

  const handlePaginationModelChange = (newPaginationModel) => {
    setZonePage(newPaginationModel.page);
    setZonePageSize(newPaginationModel.pageSize);
  };

  const handleDistrictChange = (event) => {
    console.log("change dist");
    setDistrict(event.target.value);
    setLandValueZones([]);
    setZonePageSize(10);
    setZoneId("");
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistricts(
      provinces.find((item) => item.provinceCode === event.target.value)
        ?.districts || []
    );
    setDistrict(
      provinces.find((item) => item.provinceCode === event.target.value)
        ?.districts[0]?.districtcode || ""
    );
    setLandValueZones([]);
    setZonePageSize(20);
    setZoneId("");
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleReloadButtonClick = () => {
    onSelectionChange([]);
  };
  // console.log(landValueZones[0].zcode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <StyledButtonGroup
          variant="outlined"
          size="medium"
          aria-label="contained button group"
        >
          <StyledButton
            active={activeButton === "village" ? "true" : "false"}
            onClick={() => handleButtonClick("village")}
          >
            {t("byVillageBoundary")}
          </StyledButton>
          <StyledButton
            active={activeButton === "assessment" ? "true" : "false"}
            onClick={() => handleButtonClick("assessment")}
          >
            {t("byAssessmentArea")}
          </StyledButton>
        </StyledButtonGroup>
        <Select
          labelId="province-label"
          id="province-select"
          value={province}
          onChange={handleProvinceChange}
          displayEmpty
          size="small"
          sx={{
            minWidth: "128px",
            borderRadius: "6px",
            "& fieldset": { borderColor: "rgba(0, 0, 0, 0.23) !important" },
          }}
        >
          <MenuItem sx={{ display: "none" }} disabled value="">
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
          sx={{
            minWidth: "128px",
            borderRadius: "6px",
            "& fieldset": { borderColor: "rgba(0, 0, 0, 0.23) !important" },
          }}
        >
          <MenuItem sx={{ display: "none" }} disabled value="">
            <Box>{t("district")}</Box>
          </MenuItem>
          {(districts ?? []).map((item) => (
            <MenuItem key={item.districtcode} value={item.districtcode}>
              {item.districtEnglish}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button
            sx={{
              color: "#000000E0",
              textTransform: "none",
              borderRadius: "6px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              boxShadow: "none",
              border: "1px solid #D9D9D9",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            variant="outlined"
            startIcon={
              <ReplayRoundedIcon
                sx={{ color: "#00000073", transform: "scaleX(-1)" }}
              />
            }
            onClick={handleReloadButtonClick}
          >
            {t("reload")}
          </Button>
          <Typography
            sx={{
              color: "#000000E0",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            {t("selectedItems", {
              count: draftData[activeStep]?.selectedZoneIds?.length || 0,
            })}{" "}
            {draftData[activeStep]?.selectedZoneIds?.length > 1
              ? "items"
              : "item"}
          </Typography>
        </Box>
        <Box>
          <Grid2 container alignItems="center" spacing={1}>
            <Grid2 item="true">{t("selectFrom")}</Grid2>
            <Grid2 item="true">
              <StyledTabs
                value={tab}
                onChange={handleTabChange}
                aria-label="select from options"
              >
                <StyledTab
                  icon={
                    <TableIcon color={tab === 0 ? "#1677FF" : "#000000A6"} />
                  }
                  label={t("table")}
                  {...a11yProps(0)}
                />
                <StyledTab
                  icon={<MapIcon />}
                  label={t("map")}
                  {...a11yProps(1)}
                />
              </StyledTabs>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Box>
        {tab === 0 ? (
          <DefineModelTable
            province={province}
            district={district}
            selectedRows={selectedRows}
            activeStep={activeStep}
            onSelectionChange={onSelectionChange}
            data={landValueZones}
            paginationModel={{ page: zonePage, pageSize: zonePageSize }}
            onPaginationModelChange={handlePaginationModelChange}
            totalRows={listLandValueZonesByDistrictData?.totalElements || 0}
          />
        ) : (
          <DefineModelMap />
        )}
      </Box>
    </Box>
  );
};

export default DefineModelArea;
