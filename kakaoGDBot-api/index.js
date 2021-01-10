const GDLevel = require('./GDLevel');
const GDMusic = require('./GDMusic');
const GDDifficulty = require('./GDDifficulty');
const GDLength = require('./GDLength');
const GDLevelField = require('./GDLevelField');
const { DemonListData, DemonListRecord, DemonListPlayer } = require('./demonlist');

const { searchLevel } = require('./fetch/searchLevel');
const { getLevel } = require('./fetch/getLevel');

const InvalidParamException = require('./exception/InvalidParamException');

const LevelSearchFilter = require('./util/LevelSearchFilter');

const DEFAULT_OPTION = {
    gameVersion: 21,
    binaryVersion: 35,
    gdw: 0,
    secret: "Wmfd2893gb7"
};

function GDClient() {
    this.isLoggedIn = false;
    this.credential = null;
}

/**
 * GDBot계정 등록
 * 
 * @param {Number} accountID GDBot계정의 AccountID 
 * @param {String} password GDBot계정의 Password
 * @param {Number} playerID GDBot계정의 PlayerID
 * @throws {InvalidParamException} accountID, password, playerID 중 하나라도 누락 될 시 오류.
 */
GDClient.prototype.setCredential = function(accountID, password, playerID) {
    if(!accountID) throw new InvalidParamException("Invalid accountID!");
    if(!password) throw new InvalidParamException("Invalid password!");
    if(!playerID) throw new InvalidParamException("Invalid playerID!");

    this.credential.accountID = accountID;
    this.credential.password = password;
    this.credential.playerID = playerID;
    this.isLoggedIn = true;
}

/**
 * name에 해당하는 레벨을 검색합니다. (with LevelSearchFilter)
 * 
 * @param {String} name 레벨 이름
 * @param {LevelSearchFilter} query 레벨 검색 쿼리(필터)
 * @returns {Object} 검색결과
 */
GDClient.prototype.searchLevelByName = function(name, query) {
    if(!query) query = new LevelSearchFilter(GDLevelField.REGULAR);
    query.setName(name);
    return searchLevel(query, DEFAULT_OPTION);
}

/**
 * id에 해당하는 레벨을 갖고옵니다.
 * 
 * @param {Number} id 레벨 ID
 * @param {String} preLevel merge할 이전레벨 데이터
 * @param {Object} preLevelUser merge할 이전레벨 유저 데이터
 * @param {GDMusic} preLevelMusic merge할 이전레벨 음원 데이터
 * @returns {Object} 요청한 레벨
 */
GDClient.prototype.getLevelById = function(id, preLevel, preLevelUser, preLevelMusic) {
    return getLevel(id, preLevel, preLevelUser, preLevelMusic, DEFAULT_OPTION);
}

exports.GDClient = GDClient;

exports.GDLevel = GDLevel;
exports.GDMusic = GDMusic;
exports.GDDifficulty = GDDifficulty;
exports.GDLength = GDLength;
exports.GDLevelField = GDLevelField;
exports.DemonListData = DemonListData;
exports.DemonListRecord = DemonListRecord;
exports.DemonListPlayer = DemonListPlayer;
exports.LevelSearchFilter = LevelSearchFilter;