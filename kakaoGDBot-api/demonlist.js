
/**
 * DemonList full form 데몬 pojo
 * 
 * @param {Number} id 데몬리스트 전용 데몬 ID
 * @param {String} name 데몬 이름
 * @param {Number} position 데몬리스트 순위
 * @param {Number} levelId 레벨 ID
 * @param {Number} requirement 최소한으로 요구되는 기록의 퍼센트
 * @param {Array<DemonListPlayer>} creators 데몬 제작자들
 * @param {Array<DemonListRecord>} records 데몬 기록들
 * @param {String} video 데몬 비디오 링크
 */
function DemonListData(id, name, position, levelId, requirement, creators, records, video) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.levelId = levelId;
    this.requirement = requirement;
    this.creators = creators;
    this.records = records;
    this.video = video;

    Object.freeze(this);
}

/**
 * DemonList listed form 레코드 pojo
 * 
 * @param {Number} id 데몬리스트 전용 기록 ID
 * @param {DemonListPlayer} player 기록 등록자
 * @param {Number} progress 기록의 퍼센트
 * @param {String} status 데몬리스트에서 설정한 기록의 상태
 * @param {String} video 기록 비디오 링크
 */
function DemonListRecord(id, player, progress, status, video) {
    this.id = id;
    this.player = player;
    this.progress = progress;
    this.status = status;
    this.video = video;

    Object.freeze(this);
}

/**
 * DemonList minimal form 플레이어 pojo
 * 
 * @param {Number} id 데몬리스트 전용 플레이어 ID
 * @param {String} name 플레이어 이름(Do not sync from in game username)
 * @param {Boolean} banned 플레이어의 밴 여부
 */
function DemonListPlayer(id, name, banned) {
    this.id = id;
    this.name = name;
    this.banned = banned;

    Object.freeze(this);
}

exports.DemonListData = DemonListData;
exports.DemonListRecord = DemonListRecord;
exports.DemonListPlayer = DemonListPlayer;