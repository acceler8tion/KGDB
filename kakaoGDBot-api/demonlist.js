
/**
 * DemonList full form 데몬 pojo
 * 
 * @param {Number} id 
 * @param {String} name 
 * @param {Number} position 
 * @param {Number} requirement 
 * @param {Array<DemonListPlayer>} creators 
 * @param {Array<DemonListRecord>} records 
 * @param {String} video 
 */
function DemonListData(id, name, position, requirement, creators, records, video) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.requirement = requirement;
    this.creators = creators;
    this.records = records;
    this.video = video;

    Object.freeze(this);
}

/**
 * DemonList listed form 레코드 pojo
 * 
 * @param {Number} id 
 * @param {DemonListPlayer} player 
 * @param {Number} progress 
 * @param {String} status 
 * @param {String} video 
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
 * @param {Number} id 
 * @param {String} name 
 * @param {Boolean} banned 
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