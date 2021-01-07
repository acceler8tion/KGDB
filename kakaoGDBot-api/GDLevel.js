const GDMusic = require('./GDMusic');
const DemonlistData = require('./DemonlistData');

/**
 * GDLevel 객체
 * 
 * @param {String} name 레벨 이름
 * @param {Number} id 레벨 아이디
 * @param {String} description 레벨 설명
 * @param {Object} author 레벨 저자(업로더)
 * @param {Number} difficulty 레벨 난이도
 * @param {Number} downloads 레벨 다운로드 수
 * @param {Number} likes 레벨 좋아요 수
 * @param {Number} length 레벨 길이
 * @param {Number} stars 레벨 별 갯수
 * @param {Number} orbs 레벨 클리어 시 획득가능한 오브 갯수
 * @param {Number} diamonds 레벨 클리어 시 획득가능한 다이아몬드 갯수
 * @param {Boolean} featured 레벨 피처드 여부
 * @param {Boolean} epic 레벨 에픽 여부
 * @param {String} gameVersion 레벨 업로드당시 게임 버전
 * @param {Number} version 레벨 버전
 * @param {Number} originalID 오리지널 레벨 아이디
 * @param {Boolean} twoPlayer Two-Player 여부
 * @param {Number} coins 코인 갯수
 * @param {Boolean} verifiedCoins 은색 유코 여부
 * @param {Number} starsRequested 레벨 레이팅시 요청한 별 갯수
 * @param {Number} objects 레벨 오브젝트 갯수
 * @param {Boolean} large 레벨 오브젝트 수가 40000개 초과인지 에 대한 여부
 * @param {Number} cp 레벨 제작자가 받은 cp수
 * @param {GDMusic} song 레벨 음원
 * @param {DemonlistData} demonList 레벨이 데몬리스트에 등재되어 있을 시 데몬리스트 데이터 
 * @param {String} uploaded 레벨 업로드 일자
 * @param {String} updated 레벨 마지막 업데이트 일자
 * @param {Number} password 레벨 복사 비밀번호
 * @param {Boolean} ldm 레벨 Low-Detail-Mode 유무
 * @param {String} extraString No comment
 * @param {String} data Gzip으로 압축된 레벨 데이터
 */
function GDLevel(name, id, description, author, difficulty, downloads, likes, length,
        stars, orbs, diamonds, featured, epic, gameVersion, version, originalID, twoPlayer,
        coins, verifiedCoins, starsRequested, objects, large, cp, song, demonList,
        uploaded, updated, password, ldm, extraString, data) {

    this.name = name;
    this.id = id;
    this.description = description;
    this.author = author;
    this.difficulty = difficulty;
    this.downloads = downloads;
    this.likes = likes;
    this.length = length;
    this.stars = stars;
    this.orbs = orbs;
    this.diamonds = diamonds;
    this.featured = featured;
    this.epic = epic;
    this.gameVersion = gameVersion;
    this.version = version;
    this.originalID = originalID;
    this.twoPlayer = twoPlayer;
    this.coins = coins;
    this.verifiedCoins = verifiedCoins;
    this.starsRequested = starsRequested;
    this.objects = objects;
    this.large = large;
    this.cp = cp;
    this.song = song;
    this.demonList = demonList;
    this.uploaded = uploaded;
    this.updated = updated;
    this.password = password;
    this.ldm = ldm;
    this.extraString = extraString;
    this.data = data;
}

GDLevel.prototype.toString = function() {
    return "name="+this.name+
            "\nid="+this.id+
            "\ndescription="+this.description+
            "\nauthor={"+
            "\nname="+this.author.name+
            "\nplayerId="+this.author.playerId+
            "\naccountId="+this.author.accountId+
            "\n}"+
            "\ndifficulty="+this.difficulty+
            "\ndownloads="+this.downloads+
            "\nlikes="+this.likes+
            "\nlength="+this.length+
            "\nstars="+this.stars+
            "\norbs="+this.orbs+
            "\ndiamonds="+this.diamonds+
            "\nfeatured="+this.featured+
            "\nepic="+this.epic+
            "\ngameVersion="+this.gameVersion+
            "\nversion="+this.version+
            "\noriginalID="+this.originalID+
            "\ntwoPlayer="+this.twoPlayer+
            "\ncoins="+this.coins+
            "\nverifiedCoins="+this.verifiedCoins+
            "\nstarsRequested="+this.starsRequested+
            "\nobjects="+this.objects+
            "\nlarge="+this.large+
            "\ncp="+this.cp+
            "\nsong={\n"+
            this.song+
            "\n}"+
            "\ndemonList="+this.demonList+
            "\nuploaded="+this.uploaded+
            "\nupdated="+this.updated+
            "\npassword="+this.password+
            "\nldm="+this.ldm+
            "\nextraString="+this.extraString+
            "\ndata="+(!this.data ? 0 : this.data.length)
}

module.exports = GDLevel;