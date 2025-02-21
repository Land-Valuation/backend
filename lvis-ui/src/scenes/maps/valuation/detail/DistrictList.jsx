import { Box, Typography } from "@mui/material";
import DoneIcon from "../../../../assets/icons/land-valuation/DoneIcon";
import PendingIcon from "../../../../assets/icons/land-valuation/PendingIcon";
import { useTranslation } from "react-i18next";

const DistrictList = () => {
  const { t } = useTranslation();
  const districts = [
    { name: "Phonhong", status: true },
    { name: "Viengkham", status: false },
    { name: "Thoulakhom", status: true },
    { name: "Keo-Oudom", status: false },
    { name: "Feuang", status: false },
    { name: "Vangvieng", status: false },
    { name: "Xanakham", status: false },
    { name: "Hinheup", status: false },
    { name: "Mad", status: false },
    { name: "Met", status: false },
    { name: "Kasi", status: false },
  ];

  return (
    <div>
      {districts.map((district) => (
        <Box
          key={district.name}
          sx={{
            display: "flex",
            borderRadius: "8px",
            marginBottom: "8px",
            background: "#FFF",
            justifyContent: "space-between",
            padding: "8px 12px",
            border: "1px solid white",
            cursor: 'pointer',
            "&:hover": {
              border: "1px solid #91CAFF",
              background: "#E6F4FF",
              color: "#1677FF",
            },
          }}
        >
          <Typography>{district.name}</Typography>
          <Box
            sx={{
              backgroundColor: district.status ? "#F6FFED" : "#00000005",
              border: district.status ? "1px solid #B7EB8F" : "1px solid #D9D9D9",
              color: district.status ? "#52C41A" : "black",
              borderRadius: "4px",
              padding: "0 8px",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              whiteSpace: "nowrap",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            {district.status ? (
              <DoneIcon sx={{ marginRight: "4px", width: "12px" }} />
            ) : (
              <PendingIcon sx={{ marginRight: "4px", width: "12px" }} />
            )}
            {district.status ? t("Done") : t("Pending")}
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default DistrictList;