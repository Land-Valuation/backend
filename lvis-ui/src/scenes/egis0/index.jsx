import React from "react";
import Header from '../../components/Header';
import {Box, useMediaQuery, useTheme} from '@mui/material';
import CrudDemo from './CrudDemo';
import Map from '../../components/map/Map';
import {singlePostData} from '../../data/mockMapData';
import UserService from "../../state/UserService";
import { t } from "i18next";

//** [EGIS 수정]
import MainFrame from "./components/layout/mainFrame";

const Egis0 = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  console.log(UserService.getTokenParsed());
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Land Price Explorer")} subtitle="See real price info managed from EGIS System" />
      {/* ** [EGIS 수정]
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 6"
          gridRow="span 3"
        >
          <Map items={[singlePostData]} />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          borderRadius="5px"
        >
          <CrudDemo/>
        </Box>
      </Box>
      */}
      <MainFrame />
    </Box>
  );
};

export default Egis0;
