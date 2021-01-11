/**
 * 
 * @param {String} content 코멘트 내용
 * @param {Number} id 코멘트 아이디
 * @param {Number} likes 코멘트 좋아요 수
 * @param {String} uploaded 코멘트 업로드 일자
 * @param {Number} levelID 해당 코멘트가 올라온 레벨 ID
 * @param {Object} author 코멘트 저자
 * @param {Number} percent 프로그레스
 * @param {String} role 코멘트 저자의 직업
 * @param {Object} iconInfo 코멘트 저자의 아이콘 정보
 */
function GDComment(content, id, likes, date, levelID, author,
        percent, role, iconInfo) {

    this.content = content;
    this.id = id;
    this.likes = likes;
    this.date = date;
    this.levelID = levelID;
    this.author = author;
    this.percent = percent;
    this.role = role;
    this.iconInfo = iconInfo;

    Object.freeze(this);
}

GDComment.prototype.toString = function() {
    return "content="+this.content+
            "\nid="+this.id+
            "\nlikes="+this.likes+
            "\ndate="+this.date+
            "\nlevelID="+this.levelID+
            "\nauthor={"+
            "\nname="+this.author.name+
            "\nplayerID="+this.author.playerID+
            "\naccountID="+this.author.accountID+
            "\n}"+
            "\npercent="+this.percent+
            "\nrole="+this.role+
            "\niconInfo={"+
            "\nform="+this.iconInfo.form+
            "\nicon="+this.iconInfo.icon+
            "\ncol1="+this.iconInfo.col1+
            "\ncol2="+this.iconInfo.col2+
            "\nglow="+this.iconInfo.glow+
            "\n}";
}

module.exports = GDComment;