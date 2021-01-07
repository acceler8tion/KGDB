module.exports = {
    TINY: "TINY",
    SHORT: "SHORT",
    MEDIUM: "MEDIUM",
    LONG: "LONG",
    XL: "XL",

    /**
     * 레벨의 절대 길이를 반환합니다.
     * 
     * @param {String} l 래벨의 난이도
     * @returns {String}} 레벨의 절대 난이도
     */
    getAbsoluteLength: function (l){
        return this[l];
    }
};