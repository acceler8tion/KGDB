/**
 * GDUser 객체
 * 
 * @param {String} name - 플레이어의 이름
 * @param {Number} playerID - 플레이어의 Player ID
 * @param {Number} stars - 플레이어의 별 갯수
 * @param {Number} demons - 플레이어의 데몬 갯수
 * @param {Number} cp - 플레이어의 크리에이터 포인트(CP) 갯수
 * @param {Number} icon - 플레이어의 아이콘(Only for listed form)..?
 * @param {Number} color1 - 플레이어의 1번째 컬러
 * @param {Number} color2 - 플레이어의 2번쨰 컬러
 * @param {Number} secretCoins - 플레이어의 시크릿 코인 갯수
 * @param {String} iconType - 플레이어의 아이콘 타입(Only for listed form)..?
 * @param {Boolean} glowOutlineFL - 플레이어의 글로우 라인 여부(Only for listed form)
 * @param {Number} accountID - 플레이어의 Account ID
 * @param {Number} userCoins - 플레이어의 유저 코인 갯수
 * @param {Number} privateMessageState - 플레이어의 개인 메시지 수신 범위
 * @param {Number} friendRequestState - 플레이어의 친구 요청 허용 여부
 * @param {String} youtube - 플레이어의 유튜브 링크
 * @param {Number} iconCube - 플레이어의 큐브 아이콘
 * @param {Number} iconShip - 플레이어의 비행 아이콘
 * @param {Number} iconBall - 플레이어의 볼 아이콘
 * @param {Number} iconWave - 플레이어의 웨이브 아이콘
 * @param {Number} iconRobot - 플레이어의 로봇 아이콘
 * @param {Boolean} glowOutline - 플레이어의 글로우 라인 여부
 * @param {Number} unsyncedGlobalRank - 플레이어의 글로벌 랭킹(unsynced)
 * @param {Number} iconSpider - 플레이어의 거미 아이콘 
 * @param {String} twitter - 플레이어의 트위터 링크
 * @param {String} twitch - 플레이어의 트위치 링크
 * @param {Number} diamonds - 플레이어의 다이아몬드 갯수
 * @param {Number} deathEffect - 플레이어의 데스 이팩트
 * @param {String} role - 플레이어의 지위
 * @param {Number} commentHistoryState - 플레이어의 코멘트 히스토리 공개 범위
 */
function GDUser(name, playerID, stars, demons, cp, icon, color1, color2, 
        secretCoins, iconType, glowOutlineFL, accountID, userCoins, privateMessageState, friendRequestState, 
        youtube, iconCube, iconShip, iconBall, iconUfo, iconWave, iconRobot, glowOutline, 
        unsyncedGlobalRank, iconSpider, twitter, twitch, diamonds, deathEffect, role, commentHistoryState) {

    this.name = name;
    this.playerID = playerID;
    this.stars = stars;
    this.demons = demons;
    this.cp = cp;
    this.icon = icon;
    this.color1 = color1;
    this.color2 = color2;
    this.secretCoins = secretCoins;
    this.iconType = iconType;
    this.glowOutlineFL = glowOutlineFL;
    this.accountID = accountID;
    this.userCoins = userCoins;
    this.privateMessageState = privateMessageState;
    this.friendRequestState = friendRequestState;
    this.youtube = youtube;
    this.iconCube= iconCube;
    this.iconShip = iconShip;
    this.iconBall = iconBall;
    this.iconUfo = iconUfo;
    this.iconWave = iconWave;
    this.iconRobot = iconRobot;
    this.glowOutline = glowOutline;
    this.unsyncedGlobalRank = unsyncedGlobalRank;
    this.iconSpider = iconSpider;
    this.twitter = twitter;
    this.twitch = twitch;
    this.diamonds = diamonds;
    this.deathEffect = deathEffect;
    this.role = role;
    this.commentHistoryState = commentHistoryState;
}

GDUser.prototype.toString = function() {
    return "name="+this.name+
            "\nplayerID="+this.playerID+
            "\nstars="+this.stars+
            "\ndemons="+this.demons+
            "\ncp="+this.cp+
            "\nicon="+this.icon+
            "\ncolor1="+this.color1+
            "\ncolor2="+this.color2+
            "\nsecretCoins="+this.secretCoins+
            "\niconType="+this.iconSpider+
            "\nglowOutlineFL="+this.glowOutlineFL+
            "\naccountID="+this.accountID+
            "\nuserCoins="+this.userCoins+
            "\nprivateMessageState="+this.privateMessageState+
            "\nfriendRequestState="+this.friendRequestState+
            "\nyoutube="+this.youtube+
            "\niconCube="+this.iconCube+
            "\niconShip="+this.iconShip+
            "\niconBall="+this.iconBall+
            "\niconUfo="+this.iconUfo+
            "\niconWave="+this.iconWave+
            "\niconRobot="+this.iconRobot+
            "\nglowOutline="+this.glowOutline+
            "\nunsyncedGlobalRank="+this.unsyncedGlobalRank+
            "\niconSpider="+this.iconSpider+
            "\ntwitter="+this.twitter+
            "\ntwitch="+this.twitch+
            "\ndiamonds="+this.diamonds+
            "\ndeathEffect="+this.deathEffect+
            "\nrole="+this.role+
            "\ncommentHistoryState="+this.commentHistoryState
}

module.exports = GDUser;