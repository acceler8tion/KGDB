exports.Base64 = {
    /**
     * Base64 인코딩을 시도합니다.
     * 
     * @param {String} str 인코딩할 문자열
     * @returns {String} 인코딩한 문자열
     */
    encode: function(str) {
        java.util.Base64.getUrlEncoder().encodeToString(new java.lang.String(str).getBytes());
    },

    /**
     * Base64 디코딩을 시도합니다.
     * 
     * @param {String} str 디코딩할 문자열
     * @returns {String} 디코딩한 문자열
     */
    decode: function(str) {
        return new java.lang.String(java.util.Base64.getUrlDecoder().decode(str));
    }
}