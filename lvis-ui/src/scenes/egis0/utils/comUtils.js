/** ---------------------------------------
 * Desc: Common Util Funcitons
 * Date: 2025.01.13
 * Author: EGIS
 * 
 * REQUIRES: -
---------------------------------------- */

export const comUtils = {

    //---------- ENVIRONMENT ----------

    // Localhost Check
    isLocalhost: function(){
        return window.location.host.indexOf("localhost") > -1 ? true : false;
    },


    // Mobile Check
    isMobile: function(){
        return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i).test(navigator.userAgent);
    },

    



    //---------- DEBUG CHECK ----------
    
    // Rendering Check
    consoleLogRender: function() {
        console.log("consoleLogRender: Rendered.");
    },


    consoleLogRenderOnDev: function(funcName) {
        if (this.isLocalhost())
            console.log(funcName + ":: consoleLogRender: Rendered.");
    },



    //---------- VALUE AND FORMAT ----------

    getComCode: function(codeCase) {
        let code = "";
        let upperCodeCase = codeCase.toUpperCase();
        if (upperCodeCase.indexOf("NO") > -1 && upperCodeCase.indexOf("DATA") > -1) code = "NO_DATA";
        else if(upperCodeCase.indexOf("ALL") > -1 && upperCodeCase.indexOf("DATA") > -1) code = "ALL_DATA";
        return code;
    },


    isNumber: function() {
        return !isNaN(parseFloat(val)) && isFinite(val);
    },


    isNullEmpty: function(val) {
        return typeof val === "undefined" || val === null || val.toString().trim() === "" || val.toString() === "null";
    },


    replaceAll: function(val, targetStr, alt) {
        if (this.isNullEmpty(val))
            return val;

        while (val.indexOf(targetStr) > -1)
            val = val.replace(targetStr, alt);

        return val;
    },


    // 소수점 연산에 대하여 소수점 이하 약 14자리부터 생기는 나머지를 처리하기 위한 함수
    // e.i. 34.1 - 34 = 0.1 이 아닌 0.10000000000000142  이므로.
    //      roundPointRemains(34.1 - 34, 10000) 을 하면 0.1000 이 된다(0의 개수만큼 소수점 자리가 생긴다.).
    // e.i. 37.9 - 34 = 3.9 가 아닌 3.8999999999999986
    //      roundPointRemains(34.1 - 34, 10000) 을 하면 3.9000 이 된다.
    roundPointRemains: function (num, remained) {
        return Math.round(num * remained) / remained;
    },



    // roundPointAt(35.1234, 2) ==> 35.12
    // roundPointAt(35.6789, 2) ==> 35.68
    roundPointAt: function (num, remainsCount) {
        var powered = Math.pow(10, remainsCount);
        return Math.round(num * powered) / powered;
    },


    // 1234 -> 1,234
    putSymbolEvery3rdLength: function (str, seperator) {
        return str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + seperator);
    },


    // 소수점 자리수 생성
    // Ex) createDecimalPartsStr(10.123, 2) => 10.12
    createDecimalPartsStr: function (num, decimalPartsLength) {
        return this.roundPointAt(num, decimalPartsLength + 1).toFixed(decimalPartsLength);
    },
};


export const comMapUtils = {

    getLayerByName: function (map, name) {

        const mapLayers = map.getLayers().getArray();
        return mapLayers.find(layer => layer.get('name') === name);
    },
      
      
    // Clear Interaction
    clearMapInteraction: function (map, layerName) {
      
        const drawLayer = this.getLayerByName(map, layerName);
        if (drawLayer.draw) {
            map.removeInteraction(drawLayer.draw);
            drawLayer.draw = null;
        }
      
        drawLayer.getSource().clear();
      
      },

}

