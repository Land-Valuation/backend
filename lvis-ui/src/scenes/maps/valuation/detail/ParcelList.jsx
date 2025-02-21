import { Box, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

const parcels = [
  {
    name: "A1",
    area: "1,100.21",
    mainStreet: 6500000,
    connectingRoad: 4800000,
    junctionStreet: 3200000,
    streetAsTheyUsedToBe: 1600000,
    mapSheet: 1,
    parcelNo: 1,
    surveyedPrice: 6200000,
    roadType: 1,
  },
  {
    name: "A2",
    area: "1,100.21",
    mainStreet: 6500000,
    connectingRoad: 4800000,
    junctionStreet: 3200000,
    streetAsTheyUsedToBe: 1600000,
    mapSheet: 2,
    parcelNo: 2,
    surveyedPrice: 6200000,
    roadType: 2,
  },
  {
    name: "A3",
    area: "1,100.21",
    mainStreet: "N/A",
    connectingRoad: "N/A",
    junctionStreet: "N/A",
    streetAsTheyUsedToBe: "N/A",
    mapSheet: "N/A",
    parcelNo: "N/A",
    surveyedPrice: "N/A",
    roadType: "N/A",
  },
  {
    name: "B12",
    area: "1,100.21",
    mainStreet: 6500000,
    connectingRoad: 4800000,
    junctionStreet: 3200000,
    streetAsTheyUsedToBe: 1600000,
    mapSheet: 7,
    parcelNo: 8,
    surveyedPrice: 6200000,
    roadType: 9,
  },
  {
    name: "C8",
    area: "1,100.21",
    mainStreet: "N/A",
    connectingRoad: "N/A",
    junctionStreet: "N/A",
    streetAsTheyUsedToBe: "N/A",
    mapSheet: 10,
    parcelNo: 151,
    surveyedPrice: 6200000,
    roadType: 4,
  },
];

const ParcelList = () => {
  const { t } = useTranslation();

  return (
    <Box>
      {parcels.map((parcel) => (
        <Box
          key={parcel.name}
          sx={{
            width: "240px",
            height: "152px",
            borderRadius: "6px",
            backgroundColor: "#F8F8F8",
            border: "1px solid #F0F0F0",
            marginBottom: "8px",
            "&:hover": {
              border: "1px solid #9FCEFF",
              backgroundColor: "#E6F4FF",
              "& .parcel-name": {
                color: "white",
                backgroundColor: "#1677FF",
                borderRight: "1px solid #9FCEFF",
                borderBottom: "1px solid #9FCEFF",
              },
            },
          }}
        >
          <Box
            className="parcel-name"
            sx={{
              color: "#000000E0",
              backgroundColor: "white",
              borderRadius: "6px 0 6px 0",
              padding: "1px 4px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              width: "fit-content",
              borderRight: "1px solid #F0F0F0",
              borderBottom: "1px solid #F0F0F0",
            }}
          >
            {parcel.name}
          </Box>
          <Box
            sx={{
              margin: "4px 16px 16px 16px",
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
                }}
              >
                {t("Main Street")}:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#000000E0",
                }}
              >
                {parcel.mainStreet.toLocaleString()}
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
                }}
              >
                {t("Connecting Roads")}:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#000000E0",
                }}
              >
                {parcel.connectingRoad.toLocaleString()}
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
                }}
              >
                {t("Junction Street")}:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#000000E0",
                }}
              >
                {parcel.junctionStreet.toLocaleString()}
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
                }}
              >
                {t("Streets as they used to be")}:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#000000E0",
                }}
              >
                {parcel.streetAsTheyUsedToBe.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ParcelList;
