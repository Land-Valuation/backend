import { Button } from "@mui/material";
import LayoutPageCommon from "../../components/LayoutPageCommon";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import ListModel from "./list-model";

const ModelBase = () => {
  const breadcrumbData = [
    { name: 'Home', href: '/' },
    { name: 'MODEL-BASED LAND VALUATION', href: '/products' },
  ];
  return (
    <LayoutPageCommon
      breadcrumbData={breadcrumbData} 
      title="MODEL-BASED LAND VALUATION"
      actions={ 
        <>
          <Button
            sx={{
              backgroundColor: "#1677FF",
              color: "#fff",
              textTransform: "none",
              borderRadius: "6px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Model
          </Button>
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
            }}
            variant="contained"
          >
            <MoreVertIcon />
          </Button>
        </>
      }
    >
      <ListModel />
    </LayoutPageCommon>
  )
}

export default ModelBase