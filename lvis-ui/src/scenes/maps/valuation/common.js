import { Box, styled, Tab } from "@mui/material";
import L from "leaflet";

export const customIcon = L.divIcon({
  className: "custom-icon", // Custom class for styling
  html: '<div style="display:flex; flex-direction:column; align-items:center; font-size: 10px; font-weight: 500; font-family: Poppins; text-shadow:-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; color:#000000E0 "><img src="/red pin.svg" alt="redpin">A1</div>',
  iconSize: [20, 50], // Size of the icon
  iconAnchor: [10, 0], // Anchor point for the marker
});

export const customIcon1 = L.divIcon({
  className: "custom-icon", // Custom class for styling
  html: '<div style="display:flex; flex-direction:column; align-items:center; font-size: 10px; font-weight: 500; font-family: Poppins; text-shadow:-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; color:#000000E0 "><img src="/blue pin.svg" alt="bluepin">A2</div>',
  iconSize: [32, 50], // Size of the icon
  iconAnchor: [17, 10], // Anchor point for the marker
});

export const customIcon2 = L.divIcon({
  className: "custom-icon", // Custom class for styling
  html: '<div style="display:flex; flex-direction:column; align-items:center; font-size: 10px; font-weight: 500; font-family: Poppins; text-shadow:-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; color:#000000E0 "><img src="/gray pin.svg" alt="graypin">A3</div>',
  iconSize: [20, 50], // Size of the icon
  iconAnchor: [17, 10], // Anchor point for the marker
});

export let attachments = [
  { name: "Document A.doc", size: "7.261 MB" },
  { name: "Document B.pdf", size: "7.261 MB" },
  { name: "Document C.xlsx", size: "7.261 MB" },
  { name: "Document D.ppt", size: "7.261 MB" },
  { name: "Document E.zip", size: "7.261 MB" },
  { name: "Document F.jpg", size: "7.261 MB" },
];
export const FileIcon = styled("img")({
  width: "50px",
  height: "50px",
});
export const fileIcons = {
  pdf: "/PDF ico.svg",
  jpg: "/JPG ico.svg",
  jpeg: "/JPG ico.svg",
  doc: "/DOC ico.svg",
  docx: "/DOC ico.svg",
  csv: "/CSV ico.svg",
  xlsx: "/CSV ico.svg",
  zip: "/ZIP ico.svg",
  ppt: "/PPT ico.svg",
  pptx: "/PPT ico.svg",
};

export const FileCard = styled(Box)(() => ({
  border: "1px solid #F0F0F0",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  position: "relative",
  backgroundColor: "#fff",
}));

export const getFileExtension = (fileName) => {
  return fileName.split(".").pop().toLowerCase();
};

export const geoJsonStyle = () => {
  return {
    color: 'blue', 
    weight: 1,     
    dashArray: '5, 5',                               
    fillColor:'#8CBCFFE5', 
    fillOpacity: 1,                        
  };
};

export const geoData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Vientiane Polygon",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [102.6329, 17.9753], // Bottom left
            [102.6333, 17.9753], // Bottom right
            [102.6333, 17.9758], // Top right (lowered)
            [102.6329, 17.9758], // Top left (lowered)
            [102.6329, 17.9753], // Closing the polygon
          ],
        ],
      },
    },
  ],
};

export const CustomTab = styled(Tab)(({ selected }) => ({
  textTransform: "none",
  borderRadius: "6px",
  backgroundColor: selected ? "#FFF" : "#F5F5F5",
  color: selected ? "#1677FF" : "#000000A6",
  minHeight: "28px",
  height: "28px",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontWeight: 400,
  transition: "background-color 0.3s ease",
  width: "118px",
  "&:hover": {
    backgroundColor: selected ? "#FFF" : "#F1F1F1",
  },
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const position = [17.9757, 102.6331];
export const position1= [17.9750, 102.6340]
export const position2= [17.9765, 102.6320]
export const position3= [17.9758, 102.6325]
export const position4= [17.9770, 102.6345]
export const position5= [17.9740, 102.6315]
export const position6= [17.9735, 102.6338]