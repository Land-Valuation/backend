/** ---------------------------------------
 * Desc: Search Frame Module
 * Date: 2025.02.13
 * Author: EGIS
 * 
 * REQUIRES: npm install @mui/material
 * 
 * 
 * MainFrame에서 분리작업 진행


 * 
 * 
---------------------------------------- */
// COMMON IMPORTS ---------------------------------------
import { comUtils as ComUtils, comMapUtils as ComMapUtils } from '../../utils/comUtils'
// ------------------------------------------------------


// REACT IMPORTS ---------------------------------------
import React, { useState, useEffect } from "react";

import { Box, Stack, Button, Paper, Fade } from '@mui/material';
import { Tab, Tabs } from '@mui/material';

import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';



import { useTranslation } from 'react-i18next';
// ------------------------------------------------------


// MODULE IMPORTS ---------------------------------------
import Styles from '../styles/customStyles';




const searchFrame = ({ egisHeight }) => {

  // COMMON DEBUGGING -------------------------
  ComUtils.consoleLogRenderOnDev('searchFrame');
  // ------------------------------------------

  // INIT ----------------------------------------------------
 

  return (
    <Box sx={{}}>
      search
    </Box>
  );

};

export default searchFrame;

//-----------
// PRIVATES
//-----------



