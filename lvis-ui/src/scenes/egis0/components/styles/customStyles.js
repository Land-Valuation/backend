
/** ---------------------------------------
 * Desc: Custom Style Object Module
 * Date: 2025.01.13
 * Author: EGIS
 * 
 * REQUIRES: 
---------------------------------------- */

import { lightBlue } from "@mui/material/colors"
import zIndex from "@mui/material/styles/zIndex"

const customStyles = {

  // --------------------
  // Inherent Styles
  // --------------------
  primary: {
    color: ' #cca752',
    fontColor: {
      gray: ' #727272',
      lightgray: ' #a5a4a4',
      black: 'rgb(37, 37, 37)',
      skyblue: ' #81c1ef'
    },
    borderColor: {
      light: ' #ebebeb',
      dark: ' #949494',
      blue: ' #65a3ff',
      lightBlue: ' #e8f1ff'
    },
    outlineColor: ' #ebdcbf',
    seperatorColor: ' #c0c0c0',
    backgroundColor: ' #f6f7f880',
  },

  secondary: {
    color: ' #c7b790',
    outlineColor: ' #8e9192',
    seperatorColor: ' #e7e7e7',
    backgroundColor: ' #b3bbc2',
  },



  // --------------------
  // Common Styles
  // --------------------

  // Block 사이 간격용
  seperator02rem: () => { return { paddingTop: '0.1rem', paddingBottom: '0.1rem' }},
  seperator04rem: () => { return { paddingTop: '0.2rem', paddingBottom: '0.2rem' }},
  seperator08rem: () => { return { paddingTop: '0.4rem', paddingBottom: '0.4rem' }},
  seperator1rem: () => { return { paddingTop: '0.5rem', paddingBottom: '0.5rem' }},

  // GRID2 공통
  comGrid2: (position) => {
    // position: LEFT, RIGHT, CENTER, EQUAL
    let pos = "space-between";
    if (position) {
      if (position.toUpperCase() === "LEFT") pos = "flex-start"
      else if (position.toUpperCase() === "CENTER") pos = "center"
      else if (position.toUpperCase() === "RIGHT") pos = "flex-end"
    }

    return { 
      display: "flex", 
      alignItems: 'center',
      justifyContent: pos
    }
  },

  blockSeperator: () => {

    return {
      width: '100%',
      padding: '0',
      margin: '0',
      borderBottom: '1px solid ' + customStyles.secondary.seperatorColor
    }
  },



  // --------------------
  // Frame Area
  // --------------------

  mainFrameGrid: () => {

    return {
      fontFamily: "Poppins",
      overflow: 'hidden',
      border: '1px solid ' + customStyles.primary.borderColor.light,
      borderRadius: '5px',
      backgroundColor: "#fafafb"
    }
  },

  mainFramePanels: (height) => {

    return {
      height: height,
      fontFamily: "Poppins",
      overflow: 'hidden'
      //backgroundColor: "Yellow"
    }
  },



  // --------------------
  // Map Area
  // --------------------




  // --------------------
  // Statistics Area
  // --------------------
  statisticsTabs: () => {

    return {
      minHeight: '35px'
    }
  },

  statisticsTab: () => {

    return {
      minHeight: '35px',
      padding: '5px 16px',
      fontWeight: 600,
      borderBottom: '2px solid #ebe1ce',
    }
  },

  statisticsTabPanel: () => {

    return {
      padding: '0.5rem'
    }
  },

  statisticsWrapper: (isWrapperOpen) => {

    return {
      position: 'absolute',
      width: '520px',
      left: '120px',
      bottom: isWrapperOpen ? '10px' : '-100px',
      border: '1px solid ' + customStyles.primary.fontColor.skyblue,
      backgroundColor: 'white',
      borderRadius: '5px',
    }
  },

  statisticsLableText: (isMainLeter) => {

    return {
      color: customStyles.primary.fontColor.gray,
      fontWeight: '600',
      paddingTop: '0.2rem',
      paddingBottom: isMainLeter ? '' : '0.8rem',
      verticalAlign: 'top',
      fontSize: isMainLeter ? '1.2rem' : ''
    }
  },

  statisticsTableRow: (isHeader) => {

    return {
      fontWeight: 600,
      padding: '0.4rem 1.2rem',
      color: customStyles.primary.fontColor.gray,
      backgroundColor: isHeader ? '#f2faff': 'white'
    }
  },

  statisticsRatioArrow: (direction) => {

    let color = "gray";
    if (direction) {
      if (direction.toUpperCase() === "RIGHT") color = "gray"
      else if (direction.toUpperCase() === "UP") color = " #0339cc"
      else if (direction.toUpperCase() === "DOWN") color = " #cc2e03"
    }

    return {
      fontWeight: 600,
      paddingRight: '0.5rem',
      color: color,
    }
  },

  statisticsRatioNum: () => {

    return {
      fontWeight: 600,
      color: customStyles.primary.fontColor.gray,
    }
  },

  statisticsSelectBox: () => {

    return {
      '& .MuiInputBase-input': { py: 0.3, px: 0.2, fontSize: '0.8rem' },
    }
  },

  statisticsHideButton: () => {

    return {
      color: customStyles.primary.color,
      position: 'absolute', 
      top: '-0.5rem', right: '0.2rem'
    }
  },

  statisticsShowButton: (isWrapperOpen) => {

    return {
      display: isWrapperOpen ? 'none' : 'block',
      color: ' #e7a747',
      position: 'absolute',
      right: '0.2rem',
      bottom: '0.2rem'
    }
  },




  // --------------------
  // Search Area
  // --------------------

  searchFrameTabs: () => {

    return {
      minHeight: '40px'
    }
  },

  searchFrameTab: (isActive, isEdge) => {

    return {
      minHeight: '40px',
      padding: '5px 16px',
      fontWeight: 600,
      borderBottom: '2px solid #ebe1ce',
      color: isActive ? customStyles.primary.color : customStyles.primary.fontColor.lightgray
    }
  },

  searchFrameTabPanel: () => {

    return {
      padding: '0.5rem'
    }
  },

  searchTitle: () => {

    return {
      fontWeight: "bold", color: customStyles.primary.color
    }
  },



  // --------------------
  // Filter Area
  // --------------------

  filterSearchTypeButton: (isActive) => {

    return {
      padding: '0.1rem',
      fontWeight: '600',
      //fontSize: isActive ? '0.7rem' : '0.6rem',
      color: isActive ? customStyles.primary.color : customStyles.secondary.color
    }
  },

  filterGridContainer: () => {

    return {
      padding: '0.5rem', 
      border: '1px solid ' + customStyles.primary.outlineColor
    }
  },

  filterLable: () => {

    return {
      textAlign: 'left',
      paddingLeft: '0.5rem'
    }
  },

  filterLableText: () => {

    return {
      color: customStyles.primary.fontColor.gray,
      fontWeight: '600',
      paddingTop: '0.8rem'
    }
  },

  filterSelectBox: () => {

    return {
      '& .MuiInputBase-input': { py: 0.3, fontSize: '0.875rem' },
    }
  },

  filterRadioForm: () => {

    return {
      paddingRight: '1rem', 
      marginBottom: '-0.4rem'
    }
  },

  filterRadioButton: () => {

    return {
      color: customStyles.primary.outlineColor,
        "&.Mui-checked": {
            color: customStyles.primary.fontColor.gray,
        }
    }
  },

  filterRadioText: () => {

    return {
      color: customStyles.primary.fontColor.gray,
      fontWeight: '600',
      paddingTop: '0.2rem'
    }
  },

  filterSearchButton: () => {

    return {
      padding: 0,
      overflow: 'hidden',
      fontWeight: '600',
      color: customStyles.primary.color,
      border: '1px solid ' + customStyles.primary.outlineColor,
      borderRadius: '0.5rem'
    }
  },

  filterBlockSeperator: () => {

    return {
      width: '100%',
      padding: '0',
      margin: '0',
      borderBottom: '1px solid ' + customStyles.secondary.seperatorColor
    }
  },

  filterInputText: () => {

    return {
      
    }
  },



  // --------------------
  // Search Result Area
  // --------------------

  searchResultContentTypeButton: () => {

    return {
      paddingBottom: '0',
      fontWeight: 'Bold',
      // borderTop: '1px solid ' + customStyles.primary.seperatorColor,
      // borderLeft: '1px solid ' + customStyles.primary.seperatorColor,
      // borderRight: '1px solid ' + customStyles.primary.seperatorColor,
      marginBottom: '-2px',
      color: customStyles.secondary.outlineColor
    }
  },

  searchResultTableContainerWrapper: (height) => {

    return {
      height: height, 
      overflow: 'auto',
      border: '1px solid ' + customStyles.primary.outlineColor
    }
  },

  searchResultTableContainer: (maxHeight) => {

    return {
      height: maxHeight
    }
  },

  searchResultTableHeader: () => {

    return {
      fontWeight: 'bold',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      color: customStyles.primary.color,
      backgroundColor: customStyles.primary.backgroundColor
    }
  },

  searchResultTableRow: () => {

    return {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem'
    }
  },

  searchResultMapSearchArrow: () => {

    return {
      paddingBottom: '3px',
      color: customStyles.primary.color,
    }
  },

  searchResultMapSearchButton: () => {

    return {
      paddingTop: '0.2rem',
      paddingBottom: '0.1rem',
      fontWeight: 'Bold',
      border: '1px solid ' + customStyles.primary.borderColor.light + ' !important',
      backgroundColor: 'white',
      marginBottom: '-2px',
      color: customStyles.secondary.outlineColor,
    }
  },

  searchResultMapSearchDisplay: () => {

    return {
      textDecoration: 'skyblue underline',
      padding: '0.1rem 0.8rem',
      fontSize: '0.8rem',
      fontWeight: 500,
      //border: '1px solid ' + customStyles.primary.borderColor.light + ' !important',
      borderTop: '3px solid white',
      backgroundColor: '#f5f2f2',
      marginBottom: '-2px',
      color: customStyles.secondary.outlineColor,
    }
  },

}

export default customStyles;

