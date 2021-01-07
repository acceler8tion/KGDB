const GDLevelField = require('../GDLevelField');

/**
 * 레벨 검색에 쓰일 LevelSearchFilter객체
 * 
 * @param {Number} field 검색 필드 
 */
function LevelSearchFilter(field){
    this.diff = "-";
    this.len = "-";
    this.type = !field ? GDLevelField.REGULAR : field;
    this.str = "";
    this.page = 0;
    this.total = 0;
    this.uncompleted = 0;
    this.onlyCompleted = 0;
    this.featured = 0;
    this.original = 0;
    this.twoPlayer = 0;
    this.coins = 0;
    this.epic = 0;
}

/**
 * 새 LevelSearchFilter를 생성합니다.
 * 
 * @param {Number} 설정할 검색 필드
 * @returns {LevelSearchFilter} 새 필터
 */
LevelSearchFilter.create = function(field) {
    return new LevelSearchFilter(field);
}

LevelSearchFilter.AUTO = -3;
LevelSearchFilter.ANY_OF_DEMON = -2;
LevelSearchFilter.EASY_DEMON = [-2,1];
LevelSearchFilter.MEDIUM_DEMON = [-2,2];
LevelSearchFilter.HARD_DEMON = [-2,3];
LevelSearchFilter.INSANE_DEMON = [-2,4];
LevelSearchFilter.EXTREME_DEMON = [-2,5];
LevelSearchFilter.NA = -1;
LevelSearchFilter.EASY = 1;
LevelSearchFilter.NORMAL = 2;
LevelSearchFilter.HARD = 3;
LevelSearchFilter.HARDER = 4;
LevelSearchFilter.INSANE = 5;

LevelSearchFilter.TINY = 0;
LevelSearchFilter.SHORT = 1;
LevelSearchFilter.MEDIUM = 2;
LevelSearchFilter.LONG = 3;
LevelSearchFilter.XL = 4;

/**
 * 난이도를 설정합니다.
 * 
 * @param {Number | Array<Number>} diff 설정할 난이도 
 * @returns {LevelSearchFilter} 현재 필터
 * @throws Demon난이도를 두개 이상 선택시 오류 방출.
 */
LevelSearchFilter.prototype.setDifficulty = function(diff){
    var diffs = Array.from(arguments);
    if(diffs.length > 1){
        if(diffs.some(v => v instanceof Array)) throw new TypeError("Multi-difficulty is only available with EASY ~ INSANE");
        else this.diff = diffs.join();
    } else {
        if(diffs[0] == LevelSearchFilter.AUTO) this.diff = LevelSearchFilter.AUTO;
        else if(diffs[0] == LevelSearchFilter.NA) this.diff = LevelSearchFilter.NA;
        else {
            var splitted = diffs[0].split("/");
            this.diff = splitted[0];
            this.demonFilter = splitted[1];
        }
    }

    return this;
}

/**
 * 맵길이를 설정합니다.
 * 
 * @param {Number} len 설정할 맵길이 
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.setLength = function(len){
    this.len = Array.from(arguments).join();
    return this;
}

/**
 * 이름을 설정합니다.
 * 
 * @param {String} name 설정할 이름
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.setName = function(name) {
    this.str = encodeURI(name);
    return this;
}

/**
 * 노래를 설정합니다.
 * 
 * @param {String} id 설정할 음원 아이디 
 * @param {Boolean} isCustom 커스텀 BGM 여부
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.setMusic = function(id, isCustom) {
    if(total < 1) throw new RangeError("ID must be at least 1");
    this.song = id;
    if(isCustom === true) this.customSong = 1;
    return this;
}

/**
 * 페이지를 설정합니다.
 * 
 * @param {Number} page 설정할 페이지
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.setPage = function(page) {
    if(page < 0) throw new RangeError("Page must be at least 0");
    this.page = Number(page)|0;
    return this;
}

/**
 * 반환할 데이터 갯수를 설정합니다.
 * 
 * @param {Number} total 설정할 갯수
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.setTotal = function(total) {
    if(total < 0) throw new RangeError("Total must be at least 0");
    this.total = Number(total)|0;
    return this;
}

/**
 * uncompleted필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @param {Array<Number>} completedList 클리어 한 레벨 리스트 
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.toggleUncompleted = function(bool, completedList) {
    if(bool === true) this.onlyCompleted = 0;
    this.uncompleted = +bool;
    this.completedLevels = !completedList ? [] : completedList;
    return this;
}

/**
 * onlyCompleted필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @param {Array<Number>} completedList 클리어 한 레벨 리스트 
 * @returns {LevelSearchFilter} 현재 필터
 */
LevelSearchFilter.prototype.toggleOnlyCompleted = function(bool, completedList) {
    if(bool === true) this.uncompleted = 0;
    this.onlyCompleted = +bool;
    this.completedLevels = !completedList ? [] : completedList;
    return this;
}

/**
 * featured필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @returns {LevelSearchFilter} 현재 필터 
 */
LevelSearchFilter.prototype.toggleFeatured = function(bool) {
    this.featured = +bool;
    return this;
}

/**
 * original필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @returns {LevelSearchFilter} 현재 필터 
 */
LevelSearchFilter.prototype.toggleOriginal = function(bool) {
    this.original = +bool;
    return this;
}

/**
 * twoPlayer필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @returns {LevelSearchFilter} 현재 필터 
 */
LevelSearchFilter.prototype.toggleTwoPlayer = function(bool) {
    this.twoPlayer = +bool;
    return this;
}

/**
 * coins필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @returns {LevelSearchFilter} 현재 필터 
 */
LevelSearchFilter.prototype.toggleCoins = function(bool) {
    this.coins = +bool;
    return this;
}

/**
 * epic필드를 설정합니다.
 * 
 * @param {Boolean} bool ON/OFF 여부
 * @returns {LevelSearchFilter} 현재 필터 
 */
LevelSearchFilter.prototype.toggleEpic = function(bool) {
    this.epic = +bool;
    return this;
}

module.exports = LevelSearchFilter;
