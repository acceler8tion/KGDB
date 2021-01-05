const InvalidParamException = require('./exception/InvalidParamException');

module.exports=(function(){
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

    GDClient.prototype.searchLevelByName = function(name) {
        
    }

    GDClient.prototype.getLevelById = function(id, preLevel) {

    }
})();