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
        let len;
        switch(l) {
            case "0":
                len = this.TINY;
                break;
            case "1":
                len = this.SHORT;
                break;
            case "2":
                len = this.MEDIUM;
                break;
            case "3":
                len = this.LONG;
                break;
            case "4":
                len = this.XL;
                break;
            default:
                len = this.TINY;
        }
        return len;
    }
};