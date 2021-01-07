const InvalidParamException = require('./exception/InvalidParamException');
const { searchLevel } = require('./fetch/searchLevel');
const GDLevelField = require('./GDLevelField');
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
 * @param {String} name 
 * @param {LevelSearchFilter} query
 * @returns {Object} 검색결과
 */
GDClient.prototype.searchLevelByName = function(name, query) {
    if(!query) query = new LevelSearchFilter(GDLevelField.REGULAR);
    query.setName(name);
    return searchLevel(query, DEFAULT_OPTION);
}

GDClient.prototype.getLevelById = function(id) {

}

module.exports = GDClient;