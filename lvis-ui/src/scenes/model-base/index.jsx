import { Box, Button } from "@mui/material";
import LayoutPageCommon from "../../components/LayoutPageCommon";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import ListModel from "./list-model";
import { useNavigate } from "react-router-dom";
import RequestForInvesgation from "./request-for-invesgation";
import { useEffect, useState } from "react";
import UserService from "../../state/UserService";
import { MODEL_BASE_MODE, USER_ROLES } from "../../utils/constant";
import { useTranslation } from 'react-i18next';

const ModelBase = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState(MODEL_BASE_MODE.UNAUTHORIZED)

  const roles = UserService.getTokenParsed().realm_access.roles;

  const determineModelBaseMode = (roles) => {
    if (roles && roles.length > 0) {
      if (roles.some(role => [USER_ROLES.ROLE_LOCAL_MANAGER, USER_ROLES.ROLE_LOCAL_USER].includes(role))) {
        return MODEL_BASE_MODE.LOCAL;
      }
      if (roles.some(role => [USER_ROLES.ROLE_CENTRAL_MANAGER, USER_ROLES.ROLE_CENTRAL_USER].includes(role))) {
        return MODEL_BASE_MODE.CENTRAL;
      }
    }
    return MODEL_BASE_MODE.UNAUTHORIZED;
  };

  useEffect(() => {
    const mode = determineModelBaseMode(roles);
    if (mode) {
      setViewMode(mode);
    }
  }, [roles])
  

  const breadcrumbData = [
    { name: t('home'), href: '/' },
    { name: t('modelBasedLandValuation'), href: '/model-base' },
  ];

  const createNewModel = () => {
    navigate('/model-base/create-new-model');
  }
  
  return (
    <LayoutPageCommon
      breadcrumbData={breadcrumbData}
      title={t('modelBasedLandValuationTitle')}
      actions={ 
        viewMode === MODEL_BASE_MODE.CENTRAL ?
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
            {t('newModel')}
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
      { viewMode === MODEL_BASE_MODE.LOCAL && <RequestForInvesgation /> }
      { viewMode === MODEL_BASE_MODE.CENTRAL && <ListModel /> }
      { viewMode === MODEL_BASE_MODE.UNAUTHORIZED && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>{t('noData')}</Box> }
    </LayoutPageCommon>
  )
}

export default ModelBase