module.exports = {
    NA: "NA",
    AUTO: "AUTO",
    EASY: "EASY",
    NORMAL: "NORMAL",
    HARD: "HARD",
    HARDER: "HARDER",
    INSANE: "INSANE",
    EASY_DEMON: "EASY_DEMON",
    MEDIUM_DEMON: "MEDIUM_DEMON",
    HARD_DEMON: "HARD_DEMON",
    INSANE_DEMON: "INSANE_DEMON",
    EXTREME_DEMON: "EXTREME_DEMON",

    /**
     * 레벨의 절대 난이도를 반환합니다.
     * 
     * @param {String} levelDiff 레벨 난이도
     * @param {String} demonDiff 데몬 난이도
     * @param {String} isAuto Auto ON/OFF 여부
     * @param {String} isDemon Demon ON/OFF 여부
     * @returns {Number} 레벨의 절대 난이도
     */
    getAbsoluteDifficulty: function(levelDiff, demonDiff, isAuto, isDemon){
        let d;
        if(isAuto == "1") return this.AUTO;
        else if(isDemon == "1"){
            switch(demonDiff){
                case "3":
                    d = this.EASY_DEMON; break;
                case "4":
                    d = this.MEDIUM_DEMON; break;
                case "5":
                    d = this.INSANE_DEMON; break;
                case "6":
                    d = this.EXTREME_DEMON; break;
                default:
                    d = this.HARD_DEMON;
            }
            return d;
        } else {
            switch(levelDiff){
                case "10":
                    d = this.EASY; break;
                case "20":
                    d = this.NORMAL; break;
                case "30":
                    d = this.HARD; break;
                case "40":
                    d = this.HARDER; break;
                case "50":
                    d = this.INSANE; break;
                default:
                    d = this.NA;
            }
            return d;
        }
    }
}