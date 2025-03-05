/** ---------------------------------------
 * Desc: Main Frame Module
 * Date: 2025.01.13
 * Author: EGIS
 * 
 * REQUIRES: npm install @mui/material
 * 
 * 
 * 현 모듈 mainFrame.jsx 를 포함하는 파일
 *   - /src/scenes/egis0/index.jsx
 * 
 * 구성 변경
 * 현 모듈 위의 상단 네비바는 아래 위치에 있고
 *   - /src/components/Navbar.jsx
 * 이 상단 네비바를 포함하는 파일은
 *   - /src/scenes/layout/index.jsx
 * 
 * 정도 신규 레이아웃에서 위 상단 네비바가 제거되었으므로
 * 상단 네비바를 포함하는 index.jsx 에서 Navbar 를 주석처리
 * 
 * 
 * 현재까지 EGIS에서 정도 파일을 수정한 부분
 * (전체 찾기에서 "[EGIS 수정]" 으로 검색)
 * 1. EGIS 구현영역 삽입 - /src/scenes/egis0/index.jsx
 * 2. 상단 네비바 제외 - /src/scenes/layout/index.jsx
 * 3. 상단 타이틀 크기 조정 - /src/components/Header.jsx
---------------------------------------- */


// COMMON IMPORTS ---------------------------------------
import { comUtils as ComUtils } from '../../utils/comUtils'
// ------------------------------------------------------


// REACT IMPORTS ---------------------------------------
import React, { useState, useEffect } from "react";

import { Box, Button, Paper, Fade } from '@mui/material';
import Grid from '@mui/material/Grid2';
// ------------------------------------------------------


// MODULE IMPORTS ---------------------------------------
import Styles from '../styles/customStyles';

import MapFrame from "../../components/layout/mapFrame";
import SearchFrame from "./searchFrame";


// ------------------------------------------------------

// SearchFilterSelectData API 



const mainFrame = () => {

  // COMMON DEBUGGING -------------------------
  ComUtils.consoleLogRenderOnDev('mainFrame');
  // ------------------------------------------


  // INIT ----------------------------------------------------
  const [egisHeightPx, setEgisHeightPx] = useState(getEgisHeightPx());
  // COMMON
  
  
  // Layout Settings
  useEffect(() => {

    const handleEgisHeightPx = () => {
      const heightPx = getEgisHeightPx();
      setEgisHeightPx(heightPx);
    };

    window.addEventListener('resize', handleEgisHeightPx);

    return () => window.removeEventListener('resize', handleEgisHeightPx);

  }, []);


  

  return (
    <>

      <Grid container rowSpacing={4.5} columnSpacing={1} sx={Styles.mainFrameGrid}>

        {/* Row 1 */}
        {/* Map Area */}
        <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={[Styles.mainFramePanels(egisHeightPx), { position: 'relative' }]}>

          {<MapFrame 

          />}



        </Grid>

        {/* Search Area */}
        <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ height: (egisHeightPx), backgroundColor: "" }}>

          {/* Tab Area */}
          <SearchFrame
            egisHeight={getEgisHeight()}

          />

        </Grid>

      </Grid>

    </>
  );
};

export default mainFrame;


//-----------
// PRIVATES
//-----------

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}


function getEgisHeight() {

  const contentMarginTop = convertRemToPixels(1.5); // 1.5rem is about 24px
  const title = 28;
  const egisWrapperMarginTop = 20;

  let height = window.innerHeight - contentMarginTop - title - egisWrapperMarginTop;

  return height;

}


function getEgisHeightPx() {

  return getEgisHeight().toString() + "px";

}