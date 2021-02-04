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
};

exports.AssHole = {
    /**
     * xor 변환을 실행합니다.
     * 
     * @param {String} str 인코딩할 문자열 
     * @param {String} key 키값
     * @returns {String} 결과값
     */
    xor: function(str, key) {
        let mBytes = new java.lang.String(str).getBytes();
        let kBytes = new java.lang.String(key).getBytes();
        let result = new Array(mBytes.length);
        for(let i = 0; i < mBytes.length; i++) {
            result[i] = String.fromCharCode(mBytes[i] ^ kBytes[i % kBytes.length]);
        }
        return result.join("");
    },

    /**
     * 자칭 AssHole 인코딩을 시도합니다.
     * 
     * @param {String} str 인코딩할 문자열 
     * @param {String} key 키값
     * @returns {String} 결과값
     */
    encrypt: function(str, key) {
        return java.util.Base64.getUrlEncoder().encodeToString(new java.lang.String(this.xor(str, key)).getBytes());
    },

    /**
     * 자칭 AssHole 디코딩을 시도합니다.
     * 
     * @param {String} str 디코딩할 문자열 
     * @param {String} key 키값
     * @returns {String} 결과값
     */
    decrypt: function(str, key) {
        return this.xor(new java.lang.String(java.util.Base64.getUrlDecoder().decode(str)), key);
    }
}