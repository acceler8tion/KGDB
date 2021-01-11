module.exports = {
    USER: "User",
    MODERATOR: "Moderator",
    ELDER_MODERATOR: "Elder Moderator",

    /**
     * 유저의 role을 반환합니다.
     * 
     * @param {String} r value
     * @returns {String}} 유저의 role
     */
    getRole: function (r){
        let role;
        switch(r) {
            case "0":
                role = this.USER;
                break;
            case "1":
                role = this.MODERATOR;
                break;
            case "2":
                role = this.ELDER_MODERATOR;
                break;
            default:
                role = this.USER;
        }
        return role;
    }
};