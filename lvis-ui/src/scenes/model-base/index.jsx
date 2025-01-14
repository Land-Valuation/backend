import { Button } from "@mui/material";
import LayoutPageCommon from "../../components/LayoutPageCommon";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import ListModel from "./list-model";
import { useNavigate } from "react-router-dom";
import RequestForInvesgation from "./request-for-invesgation";
import { useState } from "react";

const ModelBase = () => {
  const navigate = useNavigate();

  const [isLocal] = useState(true)

  const breadcrumbData = [
    { name: 'Home', href: '/' },
    { name: 'MODEL-BASED LAND VALUATION', href: '/model-base' },
  ];

  const createNewModel = () => {
    navigate('/model-base/create-new-model');
  }
  
  return (
    <LayoutPageCommon
      breadcrumbData={breadcrumbData} 
      title="MODEL-BASED LAND VALUATION"
      actions={ 
        !isLocal ?
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
              boxShadow: 'none'
            }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={createNewModel}
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
        </> : ''
      }
    >
      { isLocal ? <RequestForInvesgation /> : <ListModel /> }
    </LayoutPageCommon>
  )
}

export default ModelBase